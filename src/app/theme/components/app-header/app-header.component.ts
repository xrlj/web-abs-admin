import { Component, OnInit } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Utils} from '../../../helpers/utils';
import { Router } from '@angular/router';
import {ApiPath} from '../../../api-path';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router, private api: Api, private utils: Utils) {}

  appName: string;

  ngOnInit() {
    this.appName = '运营总后台';
  }

  /**
   * 退出登录。
   */
  logout(): void {
    this.api.get(ApiPath.logout).ok(data => {
        if (data) {
          localStorage.clear();
          this.router.navigateByUrl('/login'); // 退出成功
        } else {
          alert('退出失败');
        }
    }).fail(error => {
      alert('退出失败');
    });
  }
}
