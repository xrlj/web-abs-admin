import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySmsRecordComponent } from './notify-sms-record.component';

describe('NotifySmsRecordComponent', () => {
  let component: NotifySmsRecordComponent;
  let fixture: ComponentFixture<NotifySmsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifySmsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySmsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
