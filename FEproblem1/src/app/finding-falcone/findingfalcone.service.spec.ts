import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { Token} from './token';
import { FindFalconRequest} from './find-falcon-request';
import { Result} from './result';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { asyncData, asyncError } from '../../testing/async-observable-helpers';

import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';

import { FindingfalconeService } from './findingfalcone.service';

describe('FindingfalconeService', () => {
  let falconService: FindingfalconeService;
  let httpClientSpy: {get: jasmine.Spy};
  let HttpClient:HttpClient;
  let httpTestingController:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports:[ HttpClientTestingModule]
    });
      
    falconService = TestBed.inject(FindingfalconeService);


    //TODO: spy on other methods too
    httpClientSpy=jasmine.createSpyObj('HttpClient',['post']);
    falconService= new FindingfalconeService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(falconService).toBeTruthy();
  });

});

describe('FindingfalconeService(with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let falconService: FindingfalconeService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ FindingfalconeService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    falconService = TestBed.inject(FindingfalconeService);
  });

   afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  /// FindingfalconeService method tests begin ///
  describe('#fetchToken', () => {
    let expectedToken: Token;

    beforeEach(() => {
      falconService = TestBed.inject(FindingfalconeService);
      expectedToken = {token:"exulvFtyYDWOsrqMOGqUxSWhNcAmhVxK"} as Token;
    });

    it('should return expected token', () => {
      falconService.findingFalconToken().subscribe(
        token => expect(token).toEqual(expectedToken, 'should return expected token'),
        fail
      );

      // FindingfalconeService should have made one request to GET token from expected URL
      const req = httpTestingController.expectOne(falconService.tokenUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock token
      req.flush(expectedToken);
    });

    it('should be OK returning no token', () => {
      falconService.findingFalconToken().subscribe(
        token => {console.log(token);
          expect(token).toBeNull;},
        fail
      );

      const req = httpTestingController.expectOne(falconService.tokenUrl);
      req.flush({}); // Respond with no token
    });

     it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      falconService.findingFalconToken().subscribe(
        token =>{ 
         expect(token).toEqual(expectedToken, 'should return expected token');
         fail('expected to fail');},
        error =>{ console.error(error);
          expect(error.message).toContain(msg);
        }
      );

      const req = httpTestingController.expectOne(falconService.tokenUrl);
      
      // respond with a 404 and the error message in the body

      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

       it('should turn network error into user-facing error', () => {
      const emsg = 'simulated network error';

      falconService.findingFalconToken().subscribe(
        token => fail('expected to fail'),
        error => expect(error.message).toContain(emsg)
      );

      const req = httpTestingController.expectOne(falconService.tokenUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: emsg,
        // The rest of this is optional and not used.
        // Just showing that you could provide this too.
        filename: 'findingfalcone.service.ts',
        lineno: 42,
        colno: 21
      });

      // Respond with mock error
      req.error(errorEvent);
    });

  });

});
