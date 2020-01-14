import {Component, OnInit} from '@angular/core';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-appInfo-resp';
import {AppManageService} from './app-manage.service';
import {AppCheckStatusEnum} from '../../../helpers/enum/app-check-status-enum';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {UIHelper} from '../../../helpers/ui-helper';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-manage',
  templateUrl: './app-manage.component.html',
  styleUrls: ['./app-manage.component.less']
})
export class AppManageComponent implements OnInit {

  appCheckStatusEnum: typeof  AppCheckStatusEnum = AppCheckStatusEnum; // 审核状态枚举

  appName: string; // 应用名称

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
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;
  userSelectedValue = null;
  userListOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;

  constructor(private fb: FormBuilder, private appManageService: AppManageService,
              private uiHelper: UIHelper, private httpClient: HttpClient) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      appName: [null, [Validators.required]],
      appType: ['0', [Validators.required]],
      owner: ['', [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.search();
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
      appName: this.appName
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
  }

  editApp(id: string): void {
  }

  /*============== 新增、编辑 start ===============*/
  addModalShow(): void {
    this.isShowAddOrEditModal = true;
  }

  /**
   * 新增或编辑提交数据。
   */
  handleOk(): void {
  }

  /**
   * 取消新增或编辑。
   */
  handleCancel(): void {
    this.isShowAddOrEditModal = false;
    this.isModalOkLoading = false;
    this.modalType = 1;
    this.addOrEditForm.reset();
    this.addOrEditForm.patchValue({appType: '0'});
  }

  /**
   * 搜索选择用户。
   */
  searchUser(value: string): void {
    this.httpClient
      .jsonp<{ result: Array<[string, string]> }>(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`, 'callback')
      .subscribe(data => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.result.forEach(item => {
          listOfOption.push({
            value: item[0],
            text: item[0]
          });
        });
        this.userListOfOption = listOfOption;
      });
  }
  /*============== 新增、编辑 end ===============*/

}
