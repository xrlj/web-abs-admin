import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../helpers/common.service';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-appInfo-resp';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less']
})
export class RoleManageComponent implements OnInit {

  constructor(private commonService: CommonService, private utils: Utils) { }

  // 搜索条件
  appSelected: string;
  appDataList: VAppInfoResp[];
  roleName: string | null;

  // 表格
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: Data[] = [];
  listOfAllData: Data[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  ngOnInit() {
    this.getAppList();

    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        disabled: i % 2 === 0
      });
    }
  }

  /**
   * 获取应用列表。
   */
  getAppList() {
    this.commonService.getAllAppList(0).ok((data) => {
      this.appDataList = data;
      if (this.appDataList.length > 0) {
        this.appSelected = this.appDataList[0].appId;
      }
    }).fail((error) => {
      console.log(`获取应用列表失败:${error.code}`);
      this.appSelected = this.utils.getJwtTokenClaim(JwtKvEnum.ClientId);
    });
  }

  search() {

  }

  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }

}
