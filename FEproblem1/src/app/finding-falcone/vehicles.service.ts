import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';

import {Vehicles} from './vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

   readonly vehiclesUrl = 'https://findfalcone.herokuapp.com/vehicles';  // URL to web api to fetch vehicles
   Vehicles: Observable<Vehicles[]>=of([]);

  constructor(private http: HttpClient) { }

  /**
   * Returns a list of vehicles.
   * Function  fetch vehicles from server
   */
 getVehicles(): Observable<Vehicles[]> {
 
     this.Vehicles=  this.http.get<Vehicles[]>(this.vehiclesUrl)
      .pipe(
        tap(vehicles => {
          this.log(`fetched vehicles`);}),
        catchError(this.handleError('getVehicles'))
      ) as Observable<Vehicles[]>;
     return this.Vehicles;
  }

/**
   * Returns a list of vehicles.
   * Function to get list after fetching from server
   */
getList():Observable<Vehicles[]>{
  return this.Vehicles;
}

   /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };

  }


   /** Log a VehicleService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
   console.log(message);
  }




}
