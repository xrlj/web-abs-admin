import { Component, OnInit } from '@angular/core';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-app-info-resp';
import { FormGroup } from '@angular/forms';
import {VAppInfoReq} from '../../../helpers/vo/req/v-app-info-req';

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

  constructor() { }

  ngOnInit() {
  }

  /*========== 列表 start ===========*/
  search(reset: boolean = false): void {
  }

  del(): void {
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
  /*========== 列表 end ===========*/

  /*============ 新增、编辑 start =============*/
  addOrEditModalShow(modalType: number): void {
    this.isShowAddOrEditModal = true;
    this.modalType = modalType;
  }

  editApp(id: string): void {
    this.addOrEditModalShow(2);
  }

  handleOk(): void {
    if (this.addOrEditForm.valid) { // 前端通过所有输入校验
      const value = this.addOrEditForm.value;
      if (this.modalType === 1) { // 新增
      } else { // 编辑
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
    this.addOrEditForm.reset();
  }
  /*============ 新增、编辑 end =============*/

}
