import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {Observable,of} from 'rxjs';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {MatCardHarness} from '@angular/material/card/testing';

import {HarnessLoader, parallel} from '@angular/cdk/testing';

import { addMatchers, asyncData, click } from '../../../testing';

import {  asyncError } from '../../../testing/async-observable-helpers';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PlanetsComponent } from './planets.component';

//Importing Services
import { PlanetsService} from '../planets.service';
import { TestPlanetService } from '../test-planet.service';

//Importing Interfaces
import { Planets} from '../planets';


let planetsComponent: PlanetsComponent;
let fixture: ComponentFixture<PlanetsComponent>;
let planetService:PlanetsService;


describe('PlanetsComponent', () => {

 beforeEach(waitForAsync(() => {
    addMatchers();
    
    const planetServiceSpy = jasmine.createSpyObj('PlanetsService', ['getList']);
    TestBed
        .configureTestingModule({
          declarations: [ PlanetsComponent ],
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
          providers: [ PlanetsService ]
          
        }).compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(PlanetsComponent);
          planetsComponent = fixture.componentInstance;
            let expectedPlanets: Planets[]=[];
          planetServiceSpy.getList.and.returnValue(asyncData(expectedPlanets));
        });

        planetService = TestBed.inject(PlanetsService);
  }));
  
  it('should compile', () => {
    expect(planetsComponent).toBeTruthy();
  });
});


/** Add TestBed providers, compile, and create PlanetComponents */
function compileAndCreate() {
  beforeEach(waitForAsync(() => {

    TestBed
        .configureTestingModule({
           declarations: [ PlanetsComponent ],
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
          providers: [
      {provide: PlanetsService, useClass: TestPlanetService},]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(PlanetsComponent);
          planetsComponent = fixture.componentInstance;
          planetService = TestBed.inject(PlanetsService);

          });
        
  }));
}




/**
 * The  tests for PlanetsComponent.
 */
function tests() {

  it('should NOT have planets before ngOnInit', () => {
    planetsComponent.planetList.subscribe(list=>{
      expect(list.length).toBe(0, 'should not have planets before ngOnInit');
    });
  
  });

  describe('after get list', () => {
     // Trigger component so it gets planets and binds to them
    beforeEach(waitForAsync(() => {
      
      fixture.detectChanges(); // runs ngOnInit -> getList
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to planetList
    }));


    it('should HAVE planets', async() => {
    
      planetsComponent.ngOnInit();
   
      planetsComponent.planetList.subscribe(list=>{
        console.log(list);
      expect(list.length).toBeGreaterThan(0, 'should  have planets');
    });   
    });


  it("should DISPLAY title as 'Potential Hideout Destinations'", async () => {
     const compiled = fixture.debugElement.nativeElement.childNodes;
     const cards=compiled[0].childNodes;
     let content=cards[0].childNodes;
     let title=(content[0].textContent);
     expect(title).toBe('Potential Hideout Destinations','should display title as Potential Hideout Destinations' )

  });


  it('should DISPLAY Planets', async () => {
  
      planetsComponent.ngOnInit();
      planetsComponent.planetList.subscribe(list=>{
        console.log(list);
          const compiled = fixture.debugElement.nativeElement.childNodes;
          const cardList=document.getElementsByClassName('example-card');
          console.log(cardList); 
          expect(cardList.length).toBe(2,'should display Planets ' )  
         
      });
  });
  });


}

describe('PlanetsComponent Before and After Getting Planets List  ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [PlanetsComponent], schemas: [NO_ERRORS_SCHEMA]});
  });

  compileAndCreate();

  tests();
});