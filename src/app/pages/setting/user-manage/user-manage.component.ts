import { Component, OnInit } from '@angular/core';
import {VUserReq} from '../../../helpers/vo/req/v-user-req';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {

  // 查询
  username: string;
  sexSelected: number;

  userInfo: VUserReq;

  constructor() { }

  ngOnInit() {
  }

  search(): void {}

  addModalShow(): void {}

}
