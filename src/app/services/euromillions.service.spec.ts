/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EuromillionsService } from './euromillions.service';

describe('EuromillionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EuromillionsService]
    });
  });

  it('should ...', inject([EuromillionsService], (service: EuromillionsService) => {
    expect(service).toBeTruthy();
  }));
});
