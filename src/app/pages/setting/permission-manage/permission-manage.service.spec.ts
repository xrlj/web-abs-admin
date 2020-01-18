import { TestBed } from '@angular/core/testing';

import { PermissionManageService } from './permission-manage.service';

describe('PermissionManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionManageService = TestBed.get(PermissionManageService);
    expect(service).toBeTruthy();
  });
});
