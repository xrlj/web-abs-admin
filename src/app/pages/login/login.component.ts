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
  constructor(private router: Router, private fb: FormBuilder, private apiRequest: ApiRequest) {}

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

    this.apiRequest.handle(new class implements Callback {
      fail(status: number, msg: any) {
        alert(status);
        alert(msg);
      }

      finally(): void {
      }

      ok(): any {
      }

      start(): void {
      }
    }).get('/');
  }
}
