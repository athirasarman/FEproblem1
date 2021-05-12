import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';

import {Vehicles} from './vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

   private vehiclesUrl = 'https://findfalcone.herokuapp.com/vehicles';  // URL to web api to fetch vehicles
   Vehicles: Vehicles[]=[];	

  constructor(private http: HttpClient) { }

  /** GET Vehicles from the server */
 getVehicles(): Observable<Vehicles[]> {
    return this.http.get<Vehicles[]>(this.vehiclesUrl)
      .pipe(
      	retry(1),
        tap(_ => this.log('fetched vehicles')	),
        catchError(this.handleError<Vehicles[]>('getVehicles', []))
      ) ;

  }


/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


   /** Log a VehicleService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
   console.log(message);
  }




}
