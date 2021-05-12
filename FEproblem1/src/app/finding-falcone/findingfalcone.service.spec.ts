import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { Token} from './token';
import { FindFalconRequest} from './find-falcon-request';
import { Result} from './result';
import { HttpClientTestingModule} from '@angular/common/http/testing';


import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';

import { FindingfalconeService } from './findingfalcone.service';

describe('FindingfalconeService', () => {
  let service: FindingfalconeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule]
    });
    
    
    service = TestBed.inject(FindingfalconeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
