import { TestBed, inject } from '@angular/core/testing';

import { PredispitneObavezeSablonDataService } from './predispitne-obaveze-sablon.data.service';

describe('PredispitneObavezeSablonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredispitneObavezeSablonDataService]
    });
  });

  it('should be created', inject([PredispitneObavezeSablonDataService], (service: PredispitneObavezeSablonDataService) => {
    expect(service).toBeTruthy();
  }));
});
