import {Component, OnInit} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../../api-path';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {UserStatusEnum} from '../../../helpers/enum/user-status-enum';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router, private api: Api, public utils: Utils, private uiHelper: UIHelper, private defaultBusService: DefaultBusService) { }

  appName: string;

  jwtKvEnum: typeof  JwtKvEnum = JwtKvEnum;

  ngOnInit() {
    this.appName = '运营总后台';
  }

  /**
   * 退出登录。
   */
  logout(): void {
    this.uiHelper.modalConfirm('确定退出登录？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.api.get(ApiPath.logout).ok(data => {
          if (data) {
            localStorage.clear();
            this.router.navigateByUrl(AppPath.login); // 退出成功
          } else {
            this.uiHelper.msgTipError('退出失败');
          }
        }).fail(error => {
          this.uiHelper.msgTipError('退出失败');
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });
      });
  }
}
