import { TestBed, inject } from '@angular/core/testing';

import { PredispitneObavezeDataService } from './predispitne-obaveze.data.service';

describe('PredispitneObavezeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredispitneObavezeDataService]
    });
  });

  it('should be created', inject([PredispitneObavezeDataService], (service: PredispitneObavezeDataService) => {
    expect(service).toBeTruthy();
  }));
});
