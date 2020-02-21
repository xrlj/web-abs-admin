import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpAccountComponent } from './etp-account.component';

describe('EtpAccountComponent', () => {
  let component: EtpAccountComponent;
  let fixture: ComponentFixture<EtpAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
