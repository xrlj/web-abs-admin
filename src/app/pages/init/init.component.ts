import {Component, OnInit} from '@angular/core';
import {Api} from '../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';
import {AppPath} from '../../app-path';
import {UIHelper} from '../../helpers/ui-helper';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {

  constructor(private router: Router, private api: Api, private uiHelper: UIHelper) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.uiHelper.verifyLoginAndJumpToLogin();
    this.api.get(ApiPath.usercentral.getUserMenus)
      .ok(data => {
        console.log(data);
        localStorage.setItem(Constants.localStorageKey.menus, JSON.stringify(data));
        this.router.navigateByUrl(AppPath.pages);
      })
      .fail(error => {
        this.uiHelper.msgTipError('初始化失败！');
      });
  }

}
