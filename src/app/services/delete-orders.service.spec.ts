import { TestBed } from '@angular/core/testing';

import { DeleteOrdersService } from './delete-orders.service';

describe('DeleteOrdersService', () => {
  let service: DeleteOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
