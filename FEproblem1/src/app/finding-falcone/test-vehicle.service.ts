import { Injectable } from '@angular/core';
import { VehiclesService } from './vehicles.service';
import { Observable,of } from 'rxjs';
import { asyncData } from '../../testing';

import { map } from 'rxjs/operators';
export { VehiclesService } from './vehicles.service';

//Importing Interfaces
import { Vehicles } from './vehicles';

@Injectable()
/**
 * FakeVehiclesService pretends to make real http requests.
 * implements only as much of VehiclesService as is actually consumed by the app
 */
export class TestVehicleService extends VehiclesService{

  constructor() { 
    // This is a fake testing service that won't be making HTTP
    // requests so we can pass in `null` as the HTTP client.
    super(null!);
  }
    vehicles: Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];
    lastResult!: Observable<any>; // result from last method call

getVehicles(): Observable<Vehicles[]> {
   return this.lastResult = asyncData(this.vehicles);
}

getList():Observable<Vehicles[]>{
   return this.lastResult = asyncData(this.vehicles);
}

}
