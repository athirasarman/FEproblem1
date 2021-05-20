import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import { asyncData, asyncError } from '../../testing/async-observable-helpers';

import {Vehicles} from './vehicles';

import { VehiclesService } from './vehicles.service';

describe('VehiclesService(with spies)', () => {
  let vehicleService: VehiclesService;
  let httpClientSpy: {get: jasmine.Spy};
  let HttpClient:HttpClient;
  let httpTestingController:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
    	   imports:[ HttpClientTestingModule],
           // Provide the service-under-test
         providers: [ VehiclesService ]
    });

    vehicleService = TestBed.inject(VehiclesService);


    //TODO: spy on other methods too
    httpClientSpy=jasmine.createSpyObj('HttpClient',['get']);
    vehicleService= new VehiclesService(httpClientSpy as any);

  });
  
  it('should be created', () => {
    expect(vehicleService).toBeTruthy();
  });
 
  it('should return expected vehicles (HttpClient called once)',()=>{
    const expectedVehicles: Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];
    httpClientSpy.get.and.returnValue(asyncData(expectedVehicles));

    vehicleService.getVehicles().subscribe(
      vehicles=>expect(vehicles).toEqual(expectedVehicles, 'expected vehicles'),
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

      vehicleService.getVehicles().subscribe(
      vehicles => fail('expected an error, not vehicles'),
      error  => {
        console.log(error);
        expect(error.message).toContain('server returned code 404 with body "404 Not Found"');}
    );
  })

});

describe('VehiclesService(with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let vehicleService: VehiclesService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ VehiclesService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    vehicleService = TestBed.inject(VehiclesService);
  });

   afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  /// VehiclesService method tests begin ///
  describe('#getVehicles', () => {
    let expectedVehicles: Vehicles[];

    beforeEach(() => {
      vehicleService = TestBed.inject(VehiclesService);
      expectedVehicles = [
         {name:"Space pod",total_no:2, max_distance:200,speed:2},
         {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
         ] as Vehicles[];
    });

    it('should return expected vehicles (called once)', () => {
      vehicleService.getVehicles().subscribe(
        vehicles => expect(vehicles).toEqual(expectedVehicles, 'should return expected vehicles'),
        fail
      );

      // VehiclesService should have made one request to GET vehicles from expected URL
      const req = httpTestingController.expectOne(vehicleService.vehiclesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock vehicles
      req.flush(expectedVehicles);
    });

    it('should be OK returning no vehicles', () => {
      vehicleService.getVehicles().subscribe(
        vehicles => expect(vehicles.length).toEqual(0, 'should have empty heroes array'),
        fail
      );

      const req = httpTestingController.expectOne(vehicleService.vehiclesUrl);
      req.flush([]); // Respond with no vehicles
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      vehicleService.getVehicles().subscribe(
        vehicles => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(vehicleService.vehiclesUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected vehicles (called multiple times)', () => {
      vehicleService.getVehicles().subscribe();
      vehicleService.getVehicles().subscribe();
      vehicleService.getVehicles().subscribe(
        vehicles => expect(vehicles).toEqual(expectedVehicles, 'should return expected vehicles'),
        fail
      );

      const requests = httpTestingController.match(vehicleService.vehiclesUrl);
      expect(requests.length).toEqual(3, 'calls to getVehicles()');

      // Respond to each request with different mock vehicles results
      requests[0].flush([]);
      requests[1].flush([ {name:"Space Rocket",total_no:1,max_distance:300,speed:4}]);
      requests[2].flush(expectedVehicles);
    });
  });

});

