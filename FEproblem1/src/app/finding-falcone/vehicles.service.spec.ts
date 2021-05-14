import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import { asyncData, asyncError } from '../../testing/async-observable-helpers';

import {Vehicles} from './vehicles';

import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let vehicleService: VehiclesService;
  let httpClientSpy: {get: jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
    	   imports:[ HttpClientTestingModule]
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
    const expectedVehicles: Vehicles[]=[{name:"Space pod",total_no:2, max_distance:200,speed:2},{name:"Space Rocket",total_no:1,max_distance:300,speed:4}];
    httpClientSpy.get.and.returnValue(asyncData(expectedVehicles));

    vehicleService.getVehicles().subscribe(
      vehicles=>expect(vehicles).toEqual(expectedVehicles, 'expected vehicles'),
      fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1,'one call');
  });

});
