import { TestBed } from '@angular/core/testing';

import { EtpManageService } from './etp-manage.service';

describe('EtpManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtpManageService = TestBed.get(EtpManageService);
    expect(service).toBeTruthy();
  });
});
