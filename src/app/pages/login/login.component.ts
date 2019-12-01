import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ApiRequest} from '../../helpers/http/api-request';
import {VLoginResp} from '../../helpers/vo/resp/v-login-resp';
import {VLoginReq} from '../../helpers/vo/req/v-login-req';
import {Utils} from '../../helpers/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private apiRequest: ApiRequest, private utils: Utils) {}

  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // this.router.navigateByUrl('/pages');

    /*this.apiRequest.get<VLoginResp, VLoginResp>(ApiPath.login).callback<VLoginResp>()
      .start().ok(a: VLoginResp);*/

    console.log(this.utils.base64decoder('YWRtaW4=')); // 解码
    console.log(this.utils.base64encoder('admin')); // 编码

    /*const body: VLoginReq = {
      username: 'admin',
      password: 'admin1232',
      clientid: '0a9cbbbb4f130988',
      clientDeviceType: 'OTHERS'
    };
    this.apiRequest.callback(new class implements Callback {
      fail(status: number, msg: string): void {
        alert(status);
        alert(msg);
      }

      finally(): void {
      }

      ok(data: any): void {
        console.log('>>>----:' + data.access_token);
      }

      start(): any {
      }
    }).post<VLoginResp>('/serviceauth/auth/login', body);*/
  }
}
