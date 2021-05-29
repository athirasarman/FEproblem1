import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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

//Importing Interfaces
import {Vehicles} from '../vehicles';


let vehiclesComponent: VehiclesComponent;
let fixture: ComponentFixture<VehiclesComponent>;
let httpClientSpy=jasmine.createSpyObj('HttpClient',['get']);
let vehiclesService= new VehiclesService(httpClientSpy as any);
 let harnessLoader: HarnessLoader;


/////// Tests //////
describe('VehiclesComponent', () => {
//var originalTimeout  = jasmine.DEFAULT_TIMEOUT_INTERVAL;;
  beforeEach(waitForAsync(() => {
    addMatchers();
    
    const vehicleServiceSpy = jasmine.createSpyObj('VehiclesService', ['getList']);
       //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
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
           // vehiclesService.getVehicles().subscribe(data=>expectedVehicles=data);

          // getList spy returns observable of test vehicles
          vehicleServiceSpy.getList.and.returnValue(asyncData(expectedVehicles));
        });

        vehiclesService = TestBed.inject(VehiclesService);
  }));

 afterEach(function() {
      //jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

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

 /* describe('VehiclesComponent Display Tests', () => {
   // let componentfixture: ComponentFixture<VehiclesComponent>;
  
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [VehiclesComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(VehiclesComponent);
    fixture.detectChanges();
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should DISPLAY heroes', async () => {
    const cards = await harnessLoader.getAllHarnesses(MatCardHarness);
    let title=cards[0].getTitleText();
    expect(cards.length).toBe(4,'should DISPLAY heroes');
   // expect(await cards[0].getTitleText()).toBe('Shiba Inu');
  });

  it('should get subtitle text', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);
    expect(await parallel(() => cards.map(card => card.getSubtitleText()))).toEqual([
      '',
      'Dog Breed'
    ]);
  });

  it('should act as a harness loader for user content', async () => {
    const card = await loader.getHarness(MatCardHarness.with({title: 'Shiba Inu'}));
    const footerSubcomponents = await card.getAllHarnesses(MatButtonHarness) ?? [];
    expect(footerSubcomponents.length).toBe(2);
  });
});*/

/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  let expectedVehicles:any;
  beforeEach(waitForAsync(() => {
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
          providers: [VehiclesService]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(VehiclesComponent);
          vehiclesComponent = fixture.componentInstance;
          vehiclesService = TestBed.inject(VehiclesService);
          harnessLoader = TestbedHarnessEnvironment.loader(fixture);

          // getList spy returns observable of test vehicles
          vehiclesService.getVehicles().subscribe(data=>{
           expectedVehicles=data;
           vehicleServiceSpy.getList.and.returnValue(asyncData(expectedVehicles));
          });
        
        });
  }));
}

/**
 * The (almost) same tests for both.
 */
function tests() {

  it('should NOT have vehicles before ngOnInit', () => {
    vehiclesComponent.vehiclesList.subscribe(list=>{
      expect(list.length).toBe(0, 'should not have vehicles before ngOnInit');
    });
  
  });

  describe('after get list', () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehiclesService', ['getList']);

     // Trigger component so it gets vehicles and binds to them
    beforeEach(waitForAsync(() => {
      
      fixture.detectChanges(); // runs ngOnInit -> getList
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to heroes
           vehiclesService = TestBed.inject(VehiclesService);
    }));


    it('should HAVE vehicles', () => {
       const expectedVehicles: Vehicles[]=[
    {name:"Space pod",total_no:2, max_distance:200,speed:2},
    {name:"Space Rocket",total_no:1,max_distance:300,speed:4}
    ];
    vehicleServiceSpy.getList.and.returnValue(asyncData(expectedVehicles));
      vehiclesComponent.ngOnInit();
     fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();});
      vehiclesComponent.vehiclesList.subscribe(list=>{
        console.log(list);
      expect(list.length).toBe(0, 'should  have vehicles');
    });
     
   
    });


  it("should DISPLAY title as 'Available Vehicles'", async () => {
   /// const cards = await harnessLoader.getAllHarnesses(MatCardHarness);
     const compiled = fixture.debugElement.nativeElement.childNodes;
     const cards=compiled[0].childNodes;
     let content=cards[0].childNodes;
     let title=(content[0].textContent);
     expect(title).toBe('Available Vehicles','should display title as Available Vehicles ' )

  });

  it('should DISPLAY Vehicles', async () => {
    vehiclesService.getVehicles().subscribe(data=>{
        vehiclesComponent.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      vehiclesComponent.vehiclesList.subscribe(list=>{
     console.log(list);
      const compiled = fixture.debugElement.nativeElement.childNodes;
     const cards=compiled[0];
     console.log(cards);
    });
   

   })


    });
   // const cards = await harnessLoader.getAllHarnesses(MatCardHarness);
   vehiclesComponent.vehiclesList.subscribe(list=>{
     console.log(list);
      const compiled = fixture.debugElement.nativeElement.childNodes;
     const cards=compiled[0];
     console.log(cards);

   })

     //expect(vehicle.length).toBe(4);
    // expect(title).toBe('Available Vehicles','should display title as Available Vehicles ' )

  });

  });


}


