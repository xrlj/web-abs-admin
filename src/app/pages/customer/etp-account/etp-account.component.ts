import { Component, OnInit } from '@angular/core';
import {VCustomerEtpResp} from '../../../helpers/vo/resp/v-customer-etp-resp';
import {VCustomerEtpReq} from '../../../helpers/vo/req/v-customer-etp-req';
import {VCustomerAccountResp} from '../../../helpers/vo/resp/v-customer-account-resp';
import {VCustomerAccountReq} from '../../../helpers/vo/req/v-customer-account-req';
import {UIHelper} from '../../../helpers/ui-helper';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-etp-account',
  templateUrl: './etp-account.component.html',
  styleUrls: ['./etp-account.component.less']
})
export class EtpAccountComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['保理商', '核心企业', '成员公司', '供应商', '资金方'];

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VCustomerAccountResp[] = [];
  listOfAllData: VCustomerAccountResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 列表搜索条件
  vCustomerAccountReq: VCustomerAccountReq = {pageIndex: this.pageIndex, pageSize: this.pageSize};

  constructor(private fb: FormBuilder, public uiHelper: UIHelper) {
  }

  ngOnInit() {
  }

  search(reset: boolean = false): void {
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VCustomerAccountResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
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
   * 新增保理商
   */
  addModalShow() {
  }

  /**
   * 查看详情。
   * @param id 账号id
   */
  details(id: any) {
  }
}
