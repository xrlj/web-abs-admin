import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysLogLoginComponent } from './sys-log-login.component';

describe('SysLogLoginComponent', () => {
  let component: SysLogLoginComponent;
  let fixture: ComponentFixture<SysLogLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysLogLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysLogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
