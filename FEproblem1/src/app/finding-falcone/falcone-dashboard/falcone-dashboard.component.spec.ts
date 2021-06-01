import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule} from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {Observable,of} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from "@angular/router/testing";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {MatCardHarness} from '@angular/material/card/testing';

import {HarnessLoader, parallel} from '@angular/cdk/testing';

import { addMatchers, asyncData, click } from '../../../testing';

import {  asyncError } from '../../../testing/async-observable-helpers'

import { FalconeDashboardComponent } from './falcone-dashboard.component';
//Importing Services
import { PlanetsService} from '../planets.service';
import { VehiclesService} from '../vehicles.service';

//Importing Interfaces
import { Planets} from '../planets';
import { Vehicles} from '../vehicles';

let falconeDashboardComponent: FalconeDashboardComponent;
let fixture: ComponentFixture<FalconeDashboardComponent>;
let planetService:PlanetsService;
let vehiclesService:VehiclesService;

describe('FalconeDashboardComponent', () => {

  beforeEach(waitForAsync(() => {
     addMatchers();
    TestBed.configureTestingModule({
      declarations: [FalconeDashboardComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalconeDashboardComponent);
    falconeDashboardComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(falconeDashboardComponent).toBeTruthy();
  });
});



/** Add TestBed providers, compile, and create FalconeDashboardComponent */
function compileAndCreate() {
    let expectedPlanets: Planets[]=[
    {name:"Donlon",distance:100},
    {name:"Enchai",distance:200}
    ];
  let expectedVehicles:Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];;
  beforeEach(waitForAsync(() => {
    const planetServiceSpy = jasmine.createSpyObj('PlanetsService', ['getList']);
    const vehicleServiceSpy = jasmine.createSpyObj('VehiclesService', ['getList']);
    TestBed
        .configureTestingModule({
           declarations: [ FalconeDashboardComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ],
          providers: [PlanetsService, VehiclesService]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(FalconeDashboardComponent);
          falconeDashboardComponent = fixture.componentInstance;
          planetService = TestBed.inject(PlanetsService);
          vehiclesService=TestBed.inject(VehiclesService);

          // getList spy returns observable of test vehicles
          planetService.getPlanets().subscribe(data=>{
           expectedPlanets=data;
           planetServiceSpy.getList.and.returnValue(asyncData(expectedPlanets));
          });
          vehiclesService.getVehicles().subscribe(data=>{
           expectedVehicles=data;
           planetServiceSpy.getList.and.returnValue(asyncData(expectedVehicles));
          });
        
        });
  }));
}


/**
 * The  tests for PlanetsComponent.
 */
function tests() {

  it('should NOT have planets before ngOnInit', () => {
    falconeDashboardComponent.planetList.subscribe(list=>{
      expect(list.length).toBe(0, 'should not have planets before ngOnInit');
    });
  
  });

   it('should NOT have vehicles before ngOnInit', () => {
    falconeDashboardComponent.vehiclesList.subscribe(list=>{
      expect(list.length).toBe(0, 'should not have vehicles before ngOnInit');
    });
  
  });

  describe('after get list', () => {
     // Trigger component so it gets Planets and Vehicles and binds to them
    beforeEach(waitForAsync(() => {
      
      fixture.detectChanges(); // runs ngOnInit -> getList
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to Planets and Vehicles
    }));


    it('should HAVE planets', async() => {
       const expectedPlanets: Planets[]=[
    {name:"Donlon",distance:100},
    {name:"Enchai",distance:200}
    ];
    planetService.Planets=of(expectedPlanets);
      falconeDashboardComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
      falconeDashboardComponent.planetList.subscribe(list=>{
        console.log(list);
      expect(list.length).toBeGreaterThan(0, 'should  have planets');
    });   
    });

    it('should HAVE Vehicles', async() => {
      const expectedVehicles: Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];
    vehiclesService.Vehicles=of(expectedVehicles);
      falconeDashboardComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
      falconeDashboardComponent.vehiclesList.subscribe(list=>{
        console.log(list);
      expect(list.length).toBeGreaterThan(0, 'should  have vehicles');
    });   
    });

  });


}

describe('FalconeDashboardComponent Before and After Getting Planets and Vehicles  ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [FalconeDashboardComponent], schemas: [NO_ERRORS_SCHEMA]});
  });

  compileAndCreate();

  tests();
});