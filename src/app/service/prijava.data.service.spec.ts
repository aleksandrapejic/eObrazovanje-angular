import { TestBed, inject } from '@angular/core/testing';

import { PrijavaDataService } from './prijava.data.service';

describe('PrijavaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrijavaDataService]
    });
  });

  it('should be created', inject([PrijavaDataService], (service: PrijavaDataService) => {
    expect(service).toBeTruthy();
  }));
});
