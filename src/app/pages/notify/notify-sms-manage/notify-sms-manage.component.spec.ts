import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySmsManageComponent } from './notify-sms-manage.component';

describe('NotifySmsManageComponent', () => {
  let component: NotifySmsManageComponent;
  let fixture: ComponentFixture<NotifySmsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifySmsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySmsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
