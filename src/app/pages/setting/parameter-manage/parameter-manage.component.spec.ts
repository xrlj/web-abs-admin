import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterManageComponent } from './parameter-manage.component';

describe('ParameterManageComponent', () => {
  let component: ParameterManageComponent;
  let fixture: ComponentFixture<ParameterManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
