import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { asyncData, asyncError } from '../../testing/async-observable-helpers';


import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PlanetsService } from './planets.service';

import {Planets} from './planets';

describe('PlanetsService (with spies)', () => {
  let planetService: PlanetsService;
  let httpClientSpy: {get: jasmine.Spy};
  let HttpClient:HttpClient;
  let httpTestingController:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports:[ HttpClientTestingModule]
    });
      
    planetService = TestBed.inject(PlanetsService);


    //TODO: spy on other methods too
    httpClientSpy=jasmine.createSpyObj('HttpClient',['get']);
    planetService= new PlanetsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(planetService).toBeTruthy();
  });


  it('should return expected planets (HttpClient called once)',()=>{
    const expectedPlanets: Planets[]=[
    {name:"Donlon",distance:100},
    {name:"Enchai",distance:200}
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedPlanets));

    planetService.getPlanets().subscribe(
      planets=>expect(planets).toEqual(expectedPlanets, 'expected planets'),
      fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1,'one call');
  });

   it('should return an error when the server returns a 404',()=>{
    const errorResponse=new HttpErrorResponse({
      error: '404 Not Found',
      status: 404,
      statusText: 'page not found'      
    })
     httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      planetService.getPlanets().subscribe(
      planets => fail('expected an error, not planets'),
      error  => {
        expect(error.message).toContain('server returned code 404 with body "404 Not Found"');}
    );
  })
  
});

describe('PlanetsService(with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let planetService: PlanetsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ PlanetsService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    planetService = TestBed.inject(PlanetsService);
  });

   afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  /// PlanetsService method tests begin ///
  describe('#getPlanets', () => {
    let expectedPlanets: Planets[];

    beforeEach(() => {
      planetService = TestBed.inject(PlanetsService);
      expectedPlanets = [
        {name:"Donlon",distance:100},
        {name:"Enchai",distance:200}
        ] as Planets[];
    });

    it('should return expected planets (called once)', () => {
      planetService.getPlanets().subscribe(
        planets => expect(planets).toEqual(expectedPlanets, 'should return expected planets'),
        fail
      );

      // PlanetsService should have made one request to GET planets from expected URL
      const req = httpTestingController.expectOne(planetService.planetsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock planets
      req.flush(expectedPlanets);
    });

    it('should be OK returning no planets', () => {
      planetService.getPlanets().subscribe(
        planets => expect(planets.length).toEqual(0, 'should have empty planets array'),
        fail
      );

      const req = httpTestingController.expectOne(planetService.planetsUrl);
      req.flush([]); // Respond with no planets
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      planetService.getPlanets().subscribe(
        planets => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(planetService.planetsUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected planets (called multiple times)', () => {
      planetService.getPlanets().subscribe();
      planetService.getPlanets().subscribe();
      planetService.getPlanets().subscribe(
        planets => expect(planets).toEqual(expectedPlanets, 'should return expected planets'),
        fail
      );

      const requests = httpTestingController.match(planetService.planetsUrl);
      expect(requests.length).toEqual(3, 'calls to getPlanets()');

      // Respond to each request with different mock vehicles results
      requests[0].flush([]);
      requests[1].flush([{name:"Enchai",distance:200}]);
      requests[2].flush(expectedPlanets);
    });
  });

});
