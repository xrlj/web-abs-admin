import { Component, OnInit } from '@angular/core';
import {Api} from '../../helpers/http/api';
import {Utils} from '../../helpers/utils';
import { Router } from '@angular/router';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {

  constructor(private router: Router, private api: Api, private utils: Utils) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.api.get(ApiPath.usercentral.getUserMenus)
      .ok(data => {
        console.log(data);
        localStorage.setItem(Constants.localStorageKey.menus, data);
        this.router.navigateByUrl('/pages');
      })
      .fail(error => {
        alert(error.msg);
      });
  }

}
