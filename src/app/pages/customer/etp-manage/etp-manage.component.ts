import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UIHelper} from '../../../helpers/ui-helper';
import {Utils} from '../../../helpers/utils';
import {UserStatusEnum} from '../../../helpers/enum/user-status-enum';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {VCustomerEtpResp} from '../../../helpers/vo/resp/v-customer-etp-resp';
import {VCustomerEtpReq} from '../../../helpers/vo/req/v-customer-etp-req';
import {VUserResp} from '../../../helpers/vo/resp/v-user-resp';

@Component({
  selector: 'app-etp-manage',
  templateUrl: './etp-manage.component.html',
  styleUrls: ['./etp-manage.component.less']
})
export class EtpManageComponent implements OnInit {

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VCustomerEtpResp[] = [];
  listOfAllData: VCustomerEtpResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 列表搜索条件
  etpSearchVo: VCustomerEtpReq = {pageIndex: this.pageIndex, pageSize: this.pageSize};

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;
  vCustomerEtpResp: VCustomerEtpResp; // 用户详情

  constructor(private fb: FormBuilder,
              private uiHelper: UIHelper, private utils: Utils,
              private defaultBusService: DefaultBusService) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      fullName: [null, [Validators.required]],
      oriCode: [null, null],
      shortName: [null, null],
      etpPhone: [null, [Validators.required]],
      fax: [null, null],
      linkName: [null, [Validators.required]],
      linkMobile: [null, [Validators.required]],
      linkPhone: [null, null]
    });
  }

  ngOnInit() {
    this.search();
  }

  search(reset: boolean = false): void {
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VCustomerEtpResp[]): void {
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

  /**
   * 新增保理商
   */
  addModalShow(modalType: number) {
    this.modalType = modalType;
    this.isShowAddOrEditModal = true;
  }

  /**
   * 编辑
   * @param id 企业id
   */
  editEtp(id: any) {
  }

  /**
   * 新增或编辑对话框取消。
   * @param modalType 1-新增；2-编辑
   */
  handleCancel(modalType: number) {
    this.reInit();
  }

  /**
   * 新增或编辑确定。
   */
  handleOk(modalType: number) {
  }

  /**
   * 重新初始化新增编辑对话框。
   */
  reInit() {
    this.modalType = 1;
    this.isShowAddOrEditModal = false;
  }
}
