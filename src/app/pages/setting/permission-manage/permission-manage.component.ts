import {Component, OnInit} from '@angular/core';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-app-info-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {PermissionManageService} from './permission-manage.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-permission-manage',
  templateUrl: './permission-manage.component.html',
  styleUrls: ['./permission-manage.component.less']
})
export class PermissionManageComponent implements OnInit {

  permissionName: string;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  loading = false; // 表格加载对话框
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;

  // 详情
  permissionDetails: any;

  // 分配角色
  isShowSetRoleModal = false;
  isSetRoleModalOkLoading = false;
  roleName: string;

  constructor(private fb: FormBuilder, private utils: Utils,
              private permissionManageService: PermissionManageService, private uiHelper: UIHelper,
              private defaultBusService: DefaultBusService) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      permissionName: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.search(true);
  }

  /*========== 列表 start ===========*/
  search(reset: boolean = false): void {
    const body: any = {
      pageIndex: reset ? 1 : this.pageIndex,
      pageSize: this.pageSize,
      permissionName: this.permissionName
    };
    this.loading = true;
    this.permissionManageService.getPermissionListPage(body)
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
   * 删除权限。
   */
  del(): void {
    const checkIds: string[] = []; // 待删除角色
    for (const key in this.mapOfCheckedId) {
      if (this.mapOfCheckedId[key]) {
        checkIds.push(key);
      }
    }
    if (checkIds.length === 0) {
      this.uiHelper.msgTipWarning('请选择权限!');
      return;
    }
    this.uiHelper.modalDel('确定删除权限?')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.permissionManageService.delPermission(checkIds)
          .ok(data => {
            this.defaultBusService.showLoading(false);
            this.mapOfCheckedId = {};
            setTimeout(() => {
              this.search();
            }, 100);
          }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });
      });
  }

  /**
   * 为权限分配角色(所在企业下角色)
   */
  setPermissionRoles(id: string): void {}

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
  /*========== 列表 end ===========*/

  /*============ 新增、编辑 start =============*/
  /**
   * 显示新增、编辑对话框。
   * @param modalType 1=新增；2-编辑
   */
  addOrEditModalShow(modalType: number): void {
    this.isShowAddOrEditModal = true;
    this.modalType = modalType;
  }

  /**
   * 编辑
   */
  edit(id: string): void {
    this.defaultBusService.showLoading(true);
    this.permissionManageService.getPermissionById(id)
      .ok(data => {
        this.permissionDetails = data;
        this.addOrEditForm.patchValue({permissionName: this.permissionDetails.permissionName, description: this.permissionDetails.description});
        this.addOrEditModalShow(2);
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.defaultBusService.showLoading(false);
    });
  }

  /**
   * 提交新增或者编辑数据。
   */
  handleOk(): void {
    if (this.addOrEditForm.valid) { // 前端通过所有输入校验
      const value = this.addOrEditForm.value;
      if (this.modalType === 1) { // 新增
        this.isModalOkLoading = true;
        this.permissionManageService.addPermission(value)
          .ok(data => {
            if (data) {
              this.handleCancel();
              setTimeout(() => {
                this.search();
              }, 100);
            }
          }).fail(error => {
            this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.isModalOkLoading = false;
        });
      } else { // 编辑
        this.isModalOkLoading = true;
        value.id = this.permissionDetails.id;
        this.permissionManageService.updatePermission(value)
          .ok(data => {
            if (data) {
              this.handleCancel();
              setTimeout(() => {
                this.search();
              }, 100);
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
    this.permissionDetails = null;
    this.addOrEditForm.reset();
  }
  /*============ 新增、编辑 end =============*/

  /*=========== 分配角色 start ==============*/
  /**
   * 确定分配角色。
   */
  handleSetRoleModalOk(): void {
  }

  /**
   * 取消分配角色
   */
  handleSetRoleModalCancel(): void {
  }
  /*=========== 分配角色 end ==============*/

}
