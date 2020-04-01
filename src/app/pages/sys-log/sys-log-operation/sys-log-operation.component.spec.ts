import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysLogOperationComponent } from './sys-log-operation.component';

describe('SysLogOperationComponent', () => {
  let component: SysLogOperationComponent;
  let fixture: ComponentFixture<SysLogOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysLogOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysLogOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
