import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyEmailRecordComponent } from './notify-email-record.component';

describe('NotifyEmailRecordComponent', () => {
  let component: NotifyEmailRecordComponent;
  let fixture: ComponentFixture<NotifyEmailRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyEmailRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyEmailRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
