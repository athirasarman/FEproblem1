import { Injectable } from '@angular/core';
import { FindingfalconeService } from './findingfalcone.service';
import { Observable,of } from 'rxjs';
import { asyncData } from '../../testing';

import { map } from 'rxjs/operators';
export { PlanetsService } from './planets.service';

//Importing Interfaces
import {Token} from './token';
import {FindFalconRequest} from './find-falcon-request';
import {Result} from './result';

@Injectable()
/**
 * FakeVehiclesService pretends to make real http requests.
 * implements only as much of VehiclesService as is actually consumed by the app
 */
export class TestFindingFalconeService extends FindingfalconeService{

  constructor() { 
    // This is a fake testing service that won't be making HTTP
    // requests so we can pass in `null` as the HTTP client.
    super(null!); }

 successResult:Result={ 
        searchResult:{
          planet_name:"Donlon",
          status:"success",
          error:""
        },
        timeTaken:225};
  errorResult:Result={
          searchResult:{
          planet_name:"",
          status:"",
          error:""
        },
        timeTaken:225
      };
      falseResult:Result={
          searchResult:{
          planet_name:"",
          status:"",
          error:""
        },
        timeTaken:225
      };
      token:Token={
        token:"exulvFtyYDWOsrqMOGqUxSWhNcAmhVxK"
      };
      findFalconRequest={
        token:"exulvFtyYDWOsrqMOGqUxSWhNcAmhVxK",
        planet_names:["Donlon","Enchai","Jebing","Sapir"],
        vehicle_names:["Space Pod","Space Pod","Space Rocket","Space Shuttle"]
      };
   lastResult!: Observable<any>; // result from last method call

   findingFalconToken():Observable<Token>{
       return this.lastResult = asyncData(this.token);
   }

   findFalcon(findFalconRequest:FindFalconRequest,timeTaken:number):Observable<Result>{
       return this.lastResult=asyncData(this.successResult);
   }

   getResult():Result{
     return this.successResult;
   }


}
