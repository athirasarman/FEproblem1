import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';
import {Token} from './token';
import {FindFalconRequest} from './find-falcon-request';

import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FindingfalconeService {
	private tokenUrl="https://findfalcone.herokuapp.com/token";//url to fetch token
  private findFalconUrl="https://findfalcone.herokuapp.com/find";//url to search falcon
  Token: Token[]=[];
  findFalconeRequest: FindFalconRequest[]=[];

  constructor(
  	private http:HttpClient
  	) { }

    httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json' , 'Content-Type':'application/json'})
  };
  
  findingFalconToken():Observable<Token>
  {
      return  this.http.post<Token>(this.tokenUrl,null,this.httpOptions)
       .pipe(
         retry(1),
         tap(_ => this.log("Token fetched")  ),
         catchError(this.handleError<Token>('findingFalconToken'))
         );
  }

 
  findFalcon(FindFalconRequest:FindFalconRequest):Observable<FindFalconRequest[]>
  {
      return  this.http.post<FindFalconRequest[]>(this.findFalconUrl,FindFalconRequest,this.httpOptions)
       .pipe(
         retry(1),
         map((data: any) => {
             return data;
           }),
         tap(_ => this.log("Searching Done")  ),
         catchError(this.handleError<any>('findFalcon',[]))
         );
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
