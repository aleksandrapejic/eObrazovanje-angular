import { TestBed, inject } from '@angular/core/testing';

import { DokumentDataService } from './dokument.data.service';

describe('DokumentDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DokumentDataService]
    });
  });

  it('should be created', inject([DokumentDataService], (service: DokumentDataService) => {
    expect(service).toBeTruthy();
  }));
});
