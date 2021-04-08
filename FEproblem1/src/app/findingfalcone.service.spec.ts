import { TestBed } from '@angular/core/testing';

import { FindingfalconeService } from './findingfalcone.service';

describe('FindingfalconeService', () => {
  let service: FindingfalconeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindingfalconeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
