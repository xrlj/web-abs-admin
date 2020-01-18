import {Component, OnInit} from '@angular/core';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-app-info-resp';
import {AppManageService} from './app-manage.service';
import {AppCheckStatusEnum} from '../../../helpers/enum/app-check-status-enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UIHelper} from '../../../helpers/ui-helper';
import {UserManageService} from '../user-manage/user-manage.service';
import {VUserSearchReq} from '../../../helpers/vo/req/v-user-search-req';
import {VAppInfoReq} from '../../../helpers/vo/req/v-app-info-req';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-app-manage',
  templateUrl: './app-manage.component.html',
  styleUrls: ['./app-manage.component.less']
})
export class AppManageComponent implements OnInit {

  constructor(private fb: FormBuilder, private appManageService: AppManageService,
              private uiHelper: UIHelper, private userManageService: UserManageService,
              private defaultBusService: DefaultBusService) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      appName: [null, [Validators.required]],
      appType: ['0', [Validators.required]],
      owner: [null, null],
      description: [null, [Validators.required]]
    });
  }

  appCheckStatusEnum: typeof  AppCheckStatusEnum = AppCheckStatusEnum; // 审核状态枚举

  /*列表查询条件*/
  appName: string; // 应用名称
  appType: number; // 应用类型

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VAppInfoResp[] = [];
  listOfAllData: VAppInfoResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  // 新增编辑对话框
  vAppInfoResp: VAppInfoResp; // 编辑详情
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;
  userSelectedValue = null;
  userListOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;

  ngOnInit() {
    this.search(true);
  }

  /*=========== 列表 start ============*/
  /**
   * 列表查询。
   * @param reset true，从第一页开始；否则当前页
   */
  search(reset: boolean = false): void {
    const body: any = {
      pageIndex: reset ? 1 : this.pageIndex,
      pageSize: this.pageSize,
      appName: this.appName,
      appType: this.appType
    };
    this.loading = true;
    this.appManageService.getAllPage(body)
      .ok(data => {
        this.listOfAllData = data.list;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.loading = false;
    });
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VAppInfoResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
  /*=========== 列表 end ============*/

  delApp(...ids: string[]): void {
    let checkIds: string[] = []; // 待删除角色
    if (ids && ids.length > 0) {
      checkIds = ids;
    }
    for (const key in this.mapOfCheckedId) {
      if (this.mapOfCheckedId[key]) {
        checkIds.push(key);
      }
    }
    if (checkIds.length === 0) {
      this.uiHelper.msgTipWarning('请选择用户!');
      return;
    }
    this.uiHelper.modalDel('确定删除应用?')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.appManageService.delAppInfo(checkIds)
          .ok(data => {
            if (data) {
              this.defaultBusService.showLoading(false);
              this.mapOfCheckedId = {};
              setTimeout(() => {
                this.search();
              }, 100);
            } else {
              this.uiHelper.msgTipError('删除应用失败');
            }
          }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });
      });
  }

  /*============== 新增、编辑 start ===============*/
  addModalShow(): void {
    this.isShowAddOrEditModal = true;
    this.modalType = 1;
  }

  editApp(appId: string): void {
    this.modalType = 2;
    this.isShowAddOrEditModal = true;
    this.appManageService.getAppInfoByAppId(appId)
      .ok(data => {
        this.vAppInfoResp = data;
        this.addOrEditForm.patchValue({
          appName: this.vAppInfoResp.appName,
          appType: String(this.vAppInfoResp.appTypeValue),
          description: this.vAppInfoResp.description
        });
      }).fail(error => {
        console.log(error.msg);
    });
  }

  /**
   * 新增或编辑提交数据。
   */
  handleOk(): void {
    if (this.addOrEditForm.valid) { // 前端通过所有输入校验
      const value = this.addOrEditForm.value;
      const vAppInfoReq: VAppInfoReq = {
        id: this.modalType === 2 ? this.vAppInfoResp.id : null,
        appName: value.appName,
        appType: value.appType,
        description: value.description,
        userId: value.appType === '1' ? this.userSelectedValue : null
      };
      this.isModalOkLoading = true;
      if (this.modalType === 1) { // 新增
        this.appManageService.registerAppInfo(vAppInfoReq)
          .ok(data => {
            console.log(data);
            this.handleCancel();
            setTimeout(() => {
              this.search();
            }, 100);
          }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.isModalOkLoading = false;
        });
      } else { // 编辑
        this.appManageService.update(vAppInfoReq)
          .ok(data => {
            if (data) {
              this.handleCancel();
              setTimeout(() => {
                this.search();
              }, 100);
            } else {
              this.uiHelper.msgTipError('更新失败');
            }
          }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.isModalOkLoading = false;
        });
      }
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  /**
   * 取消新增或编辑。
   */
  handleCancel(): void {
    this.isShowAddOrEditModal = false;
    this.isModalOkLoading = false;
    this.modalType = 1;
    this.vAppInfoResp = null;
    this.userListOfOption = [];
    this.addOrEditForm.reset();
    this.addOrEditForm.patchValue({appType: '0'});
  }

  /**
   * 搜索选择用户。
   */
  searchUser(value: string): void {
    const vUserSearchReq: VUserSearchReq = {pageIndex: 1, pageSize: 50, isRootUser: true, username: value};
    this.userManageService.getUserList(vUserSearchReq)
      .ok(data => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.list.forEach(value1 => {
          listOfOption.push({
            value: value1.userId,
            text: value1.username
          });
        });
        this.userListOfOption = listOfOption;
      });
  }

  /**
   * 选择应用类型事件。
   */
  appTypeSelectEvent(value: string): void {
    if (value === '0') { // 内部系统
      this.addOrEditForm.get('owner').clearValidators(); // 对该formControl移除校验
      this.addOrEditForm.get('owner').clearAsyncValidators();
      this.addOrEditForm.patchValue({owner: null});
    } else {
      this.addOrEditForm.patchValue({owner: null});
      if (this.modalType === 1) { // 新增的时候
        this.addOrEditForm.get('owner').setValidators(Validators.required); // 对该formControl添加校验
      }
    }
  }
  /*============== 新增、编辑 end ===============*/

}
