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

import { VehiclesComponent } from './vehicles.component';

//Importing Services
import {VehiclesService} from '../vehicles.service';
import { TestVehicleService} from '../test-vehicle.service';

//Importing Interfaces
import {Vehicles} from '../vehicles';


let vehiclesComponent: VehiclesComponent;
let fixture: ComponentFixture<VehiclesComponent>;
let httpClientSpy=jasmine.createSpyObj('HttpClient',['get']);
let vehiclesService:VehiclesService;



/////// Tests //////
describe('VehiclesComponent', () => {
  beforeEach(waitForAsync(() => {
    addMatchers();
    
    const vehicleServiceSpy = jasmine.createSpyObj('VehiclesService', ['getList']);
    TestBed
        .configureTestingModule({
          declarations: [ VehiclesComponent ],
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
          providers: [ VehiclesService]
          
        }).compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(VehiclesComponent);
          vehiclesComponent = fixture.componentInstance;
            let expectedVehicles: Vehicles[]=[];
          vehicleServiceSpy.getList.and.returnValue(asyncData(expectedVehicles));
        });

        vehiclesService = TestBed.inject(VehiclesService);
  }));

  it('should compile', () => {
    expect(vehiclesComponent).toBeTruthy();
  });
  
});



describe('VehiclesComponent Before and After Getting Vehicles List  ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [VehiclesComponent], schemas: [NO_ERRORS_SCHEMA]});
  });

  compileAndCreate();

  tests();
});

/** Add TestBed providers, compile, and create VehicleComponent */
function compileAndCreate() {
  beforeEach(waitForAsync(() => {
    TestBed
        .configureTestingModule({
           declarations: [ VehiclesComponent ],
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
      {provide: VehiclesService, useClass: TestVehicleService},
      ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(VehiclesComponent);
          vehiclesComponent = fixture.componentInstance;
          vehiclesService = TestBed.inject(VehiclesService);
          });
        
        
   }));
}

/**
 * The  tests for Vehicles Component.
 */
function tests() {

  it('should NOT have vehicles before ngOnInit', () => {
    vehiclesComponent.vehiclesList.subscribe(list=>{
      expect(list.length).toBe(0, 'should not have vehicles before ngOnInit');
    });
  
  });

  describe('after get list', () => {
     // Trigger component so it gets vehicles and binds to them
    beforeEach(waitForAsync(() => {
      
      fixture.detectChanges(); // runs ngOnInit -> getList
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to vehiclesList
    }));


    it('should HAVE vehicles', async() => {
       const expectedVehicles: Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];
   //vehiclesService.Vehicles=of(expectedVehicles);
      vehiclesComponent.ngOnInit();
     //fixture.detectChanges();
    //fixture.whenStable().then(()=>{
      //fixture.detectChanges();});
      vehiclesComponent.vehiclesList.subscribe(list=>{
        console.log(list);
      expect(list.length).toBeGreaterThan(0, 'should  have vehicles');
    });   
    });


  it("should DISPLAY title as 'Available Vehicles'", async () => {
     const compiled = fixture.debugElement.nativeElement.childNodes;
     const cards=compiled[0].childNodes;
     let content=cards[0].childNodes;
     let title=(content[0].textContent);
     expect(title).toBe('Available Vehicles','should display title as Available Vehicles ' )

  });


  it('should DISPLAY Vehicles', async () => {
     const expectedVehicles: Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];
  // vehiclesService.Vehicles=of(expectedVehicles);
      vehiclesComponent.ngOnInit();
    // fixture.detectChanges();
    //fixture.whenStable().then(()=>{
      //fixture.detectChanges();});
      vehiclesComponent.vehiclesList.subscribe(list=>{
        console.log(list);
          const compiled = fixture.debugElement.nativeElement.childNodes;
          const cardList=document.getElementsByClassName('example-card');
          console.log(cardList); 
          expect(cardList.length).toBeGreaterThan(0,'should display Vehicles ' )  
         
      });
  });
  });


}

