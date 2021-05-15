import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';

import {Planets} from './planets';



@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  readonly planetsUrl = 'https://findfalcone.herokuapp.com/planets';  // URL to web api to fetch planets
   Planets: Planets[]=[];	

  constructor(private http: HttpClient) 
  { }


/** GET planets from the server */
 getPlanets(): Observable<Planets[]> {
      return this.http.get<Planets[]>(this.planetsUrl)
      .pipe(
        tap(planets => this.log(`fetched planets`)),
        catchError(this.handleError('getPlanets'))
      ) as Observable<Planets[]>;

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

   /** Log a PlanetService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
   console.log(message);
  }


}
