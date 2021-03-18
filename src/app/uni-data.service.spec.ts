import { TestBed } from '@angular/core/testing';

import { UniDataService } from './uni-data.service';

describe('UniDataService', () => {
  let service: UniDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
