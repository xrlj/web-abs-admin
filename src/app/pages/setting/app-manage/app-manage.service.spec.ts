import { TestBed } from '@angular/core/testing';

import { AppManageService } from './app-manage.service';

describe('AppManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppManageService = TestBed.get(AppManageService);
    expect(service).toBeTruthy();
  });
});
