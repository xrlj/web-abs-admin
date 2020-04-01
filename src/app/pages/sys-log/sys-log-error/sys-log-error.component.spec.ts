import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysLogErrorComponent } from './sys-log-error.component';

describe('SysLogErrorComponent', () => {
  let component: SysLogErrorComponent;
  let fixture: ComponentFixture<SysLogErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysLogErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysLogErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
