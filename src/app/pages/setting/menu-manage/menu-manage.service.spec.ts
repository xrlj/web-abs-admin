import { TestBed } from '@angular/core/testing';

import { MenuManageService } from './menu-manage.service';

describe('MenuManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuManageService = TestBed.get(MenuManageService);
    expect(service).toBeTruthy();
  });
});
