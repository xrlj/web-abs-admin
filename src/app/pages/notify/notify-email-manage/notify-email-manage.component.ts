import {Component, OnInit} from '@angular/core';
import {VEmailReq} from '../../../helpers/vo/req/v-email-req';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UEditorConfig} from '../../../helpers/ueditor-config';

@Component({
  selector: 'app-notify-email-manage',
  templateUrl: './notify-email-manage.component.html',
  styleUrls: ['./notify-email-manage.component.less']
})
export class NotifyEmailManageComponent implements OnInit {

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

  // 搜索条件
  vEmailReq: VEmailReq = {pageIndex: this.pageIndex, pageSize: this.pageSize};

  /*新增、编辑对话*/
  isShowModal = false;
  isModalOkLoading = false;
  modalType = 1; // 1-新增；2-编辑
  ueditorContent: string;
  addOrEditForm: FormGroup;

  /*邮件配置对话框*/
  isShowEmailServerModal = false;
  isEmailServerModalOkLoading = false;
  emailServerModalType = 1; // 1-新增；2-编辑
  addOrEditEmailServerForm: FormGroup;

  ueditorConfig = new UEditorConfig();

  constructor(private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      templateName: [null, [Validators.required]],
      templateSubject: [null, [Validators.required]],
      templateContent: [null, [Validators.required]]
    });

    this.addOrEditEmailServerForm = this.fb.group({
      serverUrl: [null, [Validators.required]],
      serverPort: [null, [Validators.required]],
      emailAccount: [null, [Validators.required]],
      emailPwd: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  search(b?: boolean) {

  }

  add() {
    this.isShowModal = true;
  }

  addEmailServer() {
    this.isShowEmailServerModal = true;
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
    this.ueditorContent = '';
  }

  handleEmailServerCancel() {
    this.reInitEmailServerModal();
  }

  handleEmailServerOk() {

  }

  reInitEmailServerModal() {
    this.isShowEmailServerModal = false;
    this.isEmailServerModalOkLoading = false;
    this.addOrEditEmailServerForm.reset();
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
