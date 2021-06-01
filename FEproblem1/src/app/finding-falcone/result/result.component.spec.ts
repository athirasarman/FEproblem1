import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ResultComponent } from './result.component';
//Importing Services
import { FindingfalconeService } from '../findingfalcone.service';

//Importing Interfaces
import { Result} from '../result';


let resultComponent: ResultComponent;
let fixture: ComponentFixture<ResultComponent>;
let httpClientSpy=jasmine.createSpyObj('HttpClient',['get']);
let findingfalconeService= new FindingfalconeService(httpClientSpy as any);

describe('ResultComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    resultComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(resultComponent).toBeTruthy();
  });
});

/** Add TestBed providers, compile, and create Result Component */
function compileAndCreate() {
  let expectedResult:any;
  beforeEach(waitForAsync(() => {
    const findingfalconeServiceSpy = jasmine.createSpyObj('FindingfalconeService', ['getResult']);

    TestBed
        .configureTestingModule({
           declarations: [ ResultComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        HttpClientTestingModule
      ],
          providers: [FindingfalconeService]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ResultComponent);
          resultComponent = fixture.componentInstance;
          findingfalconeService = TestBed.inject(FindingfalconeService);

          // getResult spy returns search result
         expectedResult=  findingfalconeService.getResult();
         findingfalconeServiceSpy.getResult.and.returnValue(expectedResult);        
        });
  }));
}


/**
 * The tests for ResultComponent.
 */
function tests() {

  it('should NOT have result before ngOnInit', () => {
  
    //  expect(list.length).toBe(0, 'should not have planets before ngOnInit');
    expect(resultComponent.result.searchResult).toBeUndefined('should not have result before ngOnInit');
  
  });

  describe('after get result', () => {
     // Trigger component so it gets planets and binds to them
    beforeEach(waitForAsync(() => {
      
      fixture.detectChanges(); // runs ngOnInit -> getList
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to result
    }));


    it('should HAVE result', async() => {
       const expectedResult: Result={
         searchResult:{
           planet_name:"Donlon",
           status:"success",
           error:""
         },
         timeTaken:225
       };
   findingfalconeService.result=expectedResult;
      resultComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
     expect(resultComponent.result).toBe(expectedResult,'should have result') ;
    });


  it("should DISPLAY title as 'Finding Falcone'",() => {
        const compiled=fixture.debugElement.nativeElement.childNodes;
        const page=compiled[0].childNodes;
        const title=page[0].textContent;
        expect(title).toBe('Finding Falcone','should display title as Finding Falcone' )

  });


  it('should DISPLAY Success Card on Finding Falcone',() => {
      const expectedResult: Result={
         searchResult:{
           planet_name:"Donlon",
           status:"success",
           error:""
         },
         timeTaken:225
       };
   findingfalconeService.result=expectedResult;
      resultComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
      const compiled=fixture.debugElement.nativeElement.childNodes;
      const page=compiled[0].childNodes;
      const grid=page[0].childNodes;
      const tiles=grid[1].childNodes;
      const card=tiles[0].childNodes;
      const title=card[0].querySelector('h1');
      const content=card[0].querySelector('mat-card-content').childNodes;
      const details=content[0].childNodes;
      const message=details[0].textContent;
      const planet=details[1].textContent;
      const timeTaken=details[2].textContent;
     // const message=content;
      console.log("card:");
        console.log(title.textContent);
        expect(title.textContent).toBe(' Success ','should display title as Success' );
        expect(message).toBe('Congratulations on Finding Falcone. King Shan is mighty pleased.');
        expect(planet).toBe(" Planet: Donlon ");
        expect(timeTaken).toBe(" Time taken:225 hours ");


      });

it('should DISPLAY Failed Card on not Finding Falcone',() => {
      const expectedResult: Result={
         searchResult:{
           planet_name:"",
           status:"false",
           error:""
         },
         timeTaken:225
       };
   findingfalconeService.result=expectedResult;
      resultComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
      const compiled=fixture.debugElement.nativeElement.childNodes;
      const page=compiled[0].childNodes;
      const grid=page[0].childNodes;
      const tiles=grid[1].childNodes;
      const card=tiles[0].childNodes;
      const title=card[1].querySelector('h1');
      const content=card[1].querySelector('mat-card-content').childNodes;
      const details=content[0].childNodes;
      const message=details[0].textContent;
        console.log(title.textContent);
        expect(title.textContent).toBe(' Failed ','should display title as Failed' );
        expect(message).toBe('Better Luck Next Time!!!');


      });



  it('should DISPLAY Error Card when caught in an Error',() => {
      const expectedResult: Result={
         searchResult:{
           planet_name:"",
           status:"error",
           error:"Token not initialized. Please get a new token with the /token API."
         },
         timeTaken:225
       };
   findingfalconeService.result=expectedResult;
      resultComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
      const compiled=fixture.debugElement.nativeElement.childNodes;
      const page=compiled[0].childNodes;
      const grid=page[0].childNodes;
      const tiles=grid[1].childNodes;
      const card=tiles[0].childNodes;
      const title=card[2].querySelector('h1');
      const content=card[2].querySelector('mat-card-content').childNodes;
      const details=content[0].childNodes;
      const message=details[0].textContent;
        console.log(title.textContent);
        expect(title.textContent).toBe(' Error ','should display title as Error' );
        expect(message).toBe(' Token not initialized. Please get a new token with the /token API.');  
      });

  });


}



describe('ResultComponent Before and After Getting Result  ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [ResultComponent], schemas: [NO_ERRORS_SCHEMA]});
  });

  compileAndCreate();

  tests();
});
