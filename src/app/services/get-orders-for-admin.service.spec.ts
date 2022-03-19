import { TestBed } from '@angular/core/testing';

import { GetOrdersForAdminService } from './get-orders-for-admin.service';

describe('GetOrdersForAdminService', () => {
  let service: GetOrdersForAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrdersForAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
