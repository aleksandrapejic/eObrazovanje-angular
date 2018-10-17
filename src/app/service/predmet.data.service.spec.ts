import { TestBed, inject } from '@angular/core/testing';

import { PredmetDataService } from './predmet.data.service';

describe('PredmetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredmetDataService]
    });
  });

  it('should be created', inject([PredmetDataService], (service: PredmetDataService) => {
    expect(service).toBeTruthy();
  }));
});
