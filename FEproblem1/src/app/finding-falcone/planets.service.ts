import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';

import {Planets} from './planets';



@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetsUrl = 'https://findfalcone.herokuapp.com/planets';  // URL to web api to fetch planets
   Planets: Planets[]=[];	

  constructor(private http: HttpClient) 
  { }


/** GET planets from the server */
 getPlanets(): Observable<Planets[]> {
    return this.http.get<Planets[]>(this.planetsUrl)
      .pipe(
      	retry(1),
        tap(_ => this.log('fetched planets')	),
        catchError(this.handleError<Planets[]>('getPlanets', []))
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


   /** Log a PlanetService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
   console.log(message);
  }


}
