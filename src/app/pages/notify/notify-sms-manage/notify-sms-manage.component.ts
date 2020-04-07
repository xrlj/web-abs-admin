import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-notify-sms-manage',
  templateUrl: './notify-sms-manage.component.html',
  styleUrls: ['./notify-sms-manage.component.less']
})
export class NotifySmsManageComponent implements OnInit {

  platformType: any; // 平台类型

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

  flatFormTypeRadioValue = 'A';

  constructor(private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      smsCode: [null, [Validators.required]],
      remark: [null, null],
      aliAccessKeyId: [null, [Validators.required]],
      aliAccessKeySecret: [null, [Validators.required]],
      txAppId: [null, [Validators.required]],
      txAppKey: [null, [Validators.required]],
      smsSignName: [null, [Validators.required]],
      smsTemplate: [null, [Validators.required]]
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

  handleCancel() {
    this.reInitModal();
  }

  handleOk() {

  }

  reInitModal() {
    this.isShowModal = false;
    this.isModalOkLoading = false;
    this.addOrEditForm.reset();
  }

  selectFlatFormType($event: any) {
    console.log($event);
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

}
