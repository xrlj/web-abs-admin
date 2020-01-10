import { Component, OnInit } from '@angular/core';
import {VUserResp} from '../../../helpers/vo/resp/v-user-resp';

@Component({
  selector: 'app-app-manage',
  templateUrl: './app-manage.component.html',
  styleUrls: ['./app-manage.component.less']
})
export class AppManageComponent implements OnInit {

  appName: string; // 应用名称

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VUserResp[] = [];
  listOfAllData: VUserResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  constructor() { }

  ngOnInit() {
  }

  /*=========== 列表 start ============*/
  /**
   * 列表查询。
   * @param reset true，从第一页开始；否则当前页
   */
  search(reset: boolean = false): void {
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VUserResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.userId]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.userId]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.userId]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.userId] = value));
    this.refreshStatus();
  }
  /*=========== 列表 end ============*/

  delApp(): void {
  }

  /*============== 新增、编辑 start ===============*/
  addModalShow(): void {
  }
  /*============== 新增、编辑 end ===============*/

}
