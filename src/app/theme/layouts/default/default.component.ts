import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../helpers/constants';
import { Router } from '@angular/router';
import {Utils} from '../../../helpers/utils';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit {
  // 控制目录的展开/折叠
  collapsed = false;

  isSpinning = false;

  constructor(private router: Router, private utils: Utils) {}

  ngOnInit() {
    this.verifyLogin();
  }

  private verifyLogin(): void {
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    if (!authToken || this.utils.jwtTokenIsExpired(authToken)) { // 未登录或者已失效
      this.router.navigateByUrl('/login');
    }
  }

  onToggleCollapsed(evt) {
    console.log('执行了 onToggleCollapsed');
    this.collapsed = !this.collapsed;
  }

  showSpinning(isSpinning: boolean) {
    this.isSpinning = isSpinning;
  }
}
