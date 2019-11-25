import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ApiRequest} from '../../helpers/http/api-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private apis: ApiRequest) {}

  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    // @ts-ignore
    // tslint:disable-next-line:new-parens
    this.apis.go(new class implements Callback {
      doing(): any {
      }

      error(): void {
      }

      finally(): void {
      }

      pre(): void {
      }
    }).get('url');
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.router.navigateByUrl('/pages');
  }
}
