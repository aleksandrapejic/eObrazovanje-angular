import { TestBed, inject } from '@angular/core/testing';

import { UplataDataService } from './uplata.data.service';

describe('UplataDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UplataDataService]
    });
  });

  it('should be created', inject([UplataDataService], (service: UplataDataService) => {
    expect(service).toBeTruthy();
  }));
});
