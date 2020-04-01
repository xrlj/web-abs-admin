import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameter-manage',
  templateUrl: './parameter-manage.component.html',
  styleUrls: ['./parameter-manage.component.less']
})
export class ParameterManageComponent implements OnInit {

  code: string; // 搜索条件，编码

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  /*新增、编辑对话*/
  isShowModal = false;
  isModalOkLoading = false;
  modalType = 1; // 1-新增；2-编辑
  addOrEditForm: FormGroup;

  constructor( private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      code: [null, [Validators.required]],
      value: [null, [Validators.required]],
      remark: [null, null]
    });
  }

  ngOnInit() {
  }

  search(b: boolean = false) {

  }

  add() {
    this.isShowModal = true;
  }

  del() {

  }

  reInitModal() {
    this.isShowModal = false;
    this.isModalOkLoading = false;
    this.addOrEditForm.reset();
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: any[]): void {
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

  handleCancel() {
    this.reInitModal();
  }

  handleOk() {

  }
}
