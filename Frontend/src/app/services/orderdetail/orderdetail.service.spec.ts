/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderdetailService } from './orderdetail.service';

describe('Service: Orderdetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderdetailService]
    });
  });

  it('should ...', inject([OrderdetailService], (service: OrderdetailService) => {
    expect(service).toBeTruthy();
  }));
});
