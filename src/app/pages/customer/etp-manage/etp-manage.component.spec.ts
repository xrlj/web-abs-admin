import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpManageComponent } from './etp-manage.component';

describe('EtpManageComponent', () => {
  let component: EtpManageComponent;
  let fixture: ComponentFixture<EtpManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
