import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Token} from './token';
import {FindFalconRequest} from './find-falcon-request';
import {Result} from './result';


import { Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class FindingfalconeService {
  readonly tokenUrl="https://findfalcone.herokuapp.com/token";//url to fetch token
  readonly findFalconUrl="https://findfalcone.herokuapp.com/find";//url to search falcon
  Token: Token[]=[];
  findFalconeRequest: FindFalconRequest[]=[];
  result:Result={} as Result;

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
        // retry(1),
         tap(_ => this.log("Token fetched")  ),
         catchError(this.handleError<Token>('findingFalconToken'))
         )as Observable<Token>;
  }

 
  findFalcon(FindFalconRequest:FindFalconRequest,timeTaken:number):Observable<Result>
  {
      return  this.http.post<Result>(this.findFalconUrl,FindFalconRequest,this.httpOptions)
       .pipe(
         map((data: any) => {
             this.result.searchResult=data;
             this.result.timeTaken=timeTaken;
             return data;
           }),
         tap(_ => this.log("Searching Done")  ),
         catchError(this.handleError<Result>('findFalcon'))
         )as Observable<Result>;
       
  }

  setErrorResult(data:any):Result
  {
    this.result.timeTaken=0;
    this.result.searchResult={
      planet_name:"",
      status:"error",
      error:data.statusText
    };
  
    console.log("set result:");
    console.log(this.result);
    return this.result;
  }

  getResult():Result{
    return this.result;
  }

/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
        const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

        this.setErrorResult(error);
         throw new Error(`${operation} failed: ${message}`);

    };
  }


   /** Log a FindingfalconeService message with the MessageService */
  private log(message: string) {
   // this.messageService.add(`HeroService: ${message}`);
   console.log(message);

  }

  
}