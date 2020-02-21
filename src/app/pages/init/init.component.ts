import {Component, OnInit} from '@angular/core';
import {Api} from '../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';
import {AppPath} from '../../app-path';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {

  constructor(private router: Router, private api: Api) { }

  status = false;

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.status = false;
    this.api.get(ApiPath.usercentral.userApi.getUserMenus)
      .ok(data => {
        // debugger;
        localStorage.setItem(Constants.localStorageKey.menus, JSON.stringify(data));
        this.router.navigateByUrl(AppPath.pages);
      })
      .fail(error => {
        this.status = true;
      });
  }

}
