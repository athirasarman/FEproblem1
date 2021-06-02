import { Injectable } from '@angular/core';
import { PlanetsService } from './planets.service';
import { Observable,of } from 'rxjs';
import { asyncData } from '../../testing';

import { map } from 'rxjs/operators';
export { PlanetsService } from './planets.service';

//Importing Interfaces
import {Planets} from './planets';

@Injectable()
/**
 * FakePlanetsService pretends to make real http requests.
 * implements only as much of PlanetsService as is actually consumed by the app
 */
  
export class TestPlanetService extends PlanetsService {

  constructor() { 
    // This is a fake testing service that won't be making HTTP
    // requests so we can pass in `null` as the HTTP client.
    super(null!);
  }
    planets: Planets[]=[
    {name:"Donlon",distance:100},
    {name:"Enchai",distance:200}
    ];
    lastResult!: Observable<any>; // result from last method call

getPlanets(): Observable<Planets[]> {
  return this.lastResult = asyncData(this.planets);
}

getList():Observable<Planets[]>{
   return this.lastResult = asyncData(this.planets);
}
  
}
