import { TestBed, inject } from '@angular/core/testing';

import { IspitDataService } from './ispit.data.service';

describe('Ispit.DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IspitDataService]
    });
  });

  it('should be created', inject([IspitDataService], (service: IspitDataService) => {
    expect(service).toBeTruthy();
  }));
});
