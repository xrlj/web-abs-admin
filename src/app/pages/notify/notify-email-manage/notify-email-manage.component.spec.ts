import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyEmailManageComponent } from './notify-email-manage.component';

describe('NotifyEmailManageComponent', () => {
  let component: NotifyEmailManageComponent;
  let fixture: ComponentFixture<NotifyEmailManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyEmailManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyEmailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
