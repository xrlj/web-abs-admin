import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../helpers/common.service';
import {VAppInfoResp} from '../../../helpers/vo/resp/v-appInfo-resp';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';

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

  ngOnInit() {
    this.getAppList();
  }

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

}
