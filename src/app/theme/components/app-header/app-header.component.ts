import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Utils} from '../../../helpers/utils';
import { Router } from '@angular/router';
import {ApiPath} from '../../../api-path';
import {AppBaseComponent} from '../../../app-base.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent extends AppBaseComponent implements OnInit {
  constructor(private router: Router, private api: Api, private utils: Utils) {
    super();
  }

  appName: string;

  // @Output() loading = new EventEmitter<boolean>();

  ngOnInit() {
    this.appName = '运营总后台';
  }

  /**
   * 退出登录。
   */
  logout(): void {
    this.showLoading(true);
    this.api.get(ApiPath.logout).ok(data => {
      if (data) {
        localStorage.clear();
        this.showLoading(false);
        this.router.navigateByUrl('/login'); // 退出成功
      } else {
        alert('退出失败');
      }
    }).fail(error => {
      this.showLoading(false);
      alert('退出失败');
    });
  }
}
