import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionManageComponent } from './permission-manage.component';

describe('PermissionManageComponent', () => {
  let component: PermissionManageComponent;
  let fixture: ComponentFixture<PermissionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
