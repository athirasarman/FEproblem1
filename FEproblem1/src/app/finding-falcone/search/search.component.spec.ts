import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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

import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatAutocompleteHarness} from '@angular/material/autocomplete/testing';


import { SearchComponent } from './search.component';

//Importing Services
import { PlanetsService} from '../planets.service';
import { VehiclesService} from '../vehicles.service';
import {ValidationMessage} from '../validation-message';
import {ValidationMessageList} from '../MessageList';
import {FindingfalconeService} from '../findingfalcone.service';
import { TestPlanetService } from '../test-planet.service';
import { TestVehicleService} from '../test-vehicle.service';
import { TestFindingFalconeService} from '../test-finding-falcone.service';
import { Router } from '@angular/router';

//Importing Interfaces
import { Planets} from '../planets';
import { Vehicles} from '../vehicles';
import {Token} from '../token';
import {FindFalconRequest} from '../find-falcon-request';

class FakeRouter {
  navigateByUrl(url: string) { return url;  }
}

let searchComponent: SearchComponent;
let router: Router;
let fixture: ComponentFixture<SearchComponent>;
let planetService:PlanetsService;
let vehiclesService:VehiclesService;
let findingfalconeService: FindingfalconeService;
let loader: HarnessLoader;

describe('SearchComponent', () => {

  compileAndCreate();

  beforeEach(() => {
    addMatchers();
   // fixture = TestBed.createComponent(SearchComponent);
   // searchComponent = fixture.componentInstance;
    planetService = TestBed.get(PlanetsService);
    vehiclesService=TestBed.get(VehiclesService);
    findingfalconeService=TestBed.get(FindingfalconeService);

    router = new FakeRouter() as any as Router;
    const routerSpy = jasmine.createSpyObj('FakeRouter', ['navigateByUrl']);
    const planetServiceSpy = jasmine.createSpyObj('TestPlanetService', ['getList']);
    const vehicleServiceSpy= jasmine.createSpyObj('TestVehicleService',['getList']);
    const findingFalconeServiceSpy= jasmine.createSpyObj('TestFindingFalconeService',['getResult']);

   // searchComponent = new SearchComponent(fb,router, planetService, vehiclesService, findingfalconeService);

  });

  it('should compile', () => {
    expect(searchComponent).toBeTruthy();
  });



  tests();


});

function tests()
{
 describe('SearchComponent Tests for Fetching Data', () => {
    let router: Router;

     // Trigger component so it gets heroes and binds to them
    beforeEach(waitForAsync(() => {
      router = fixture.debugElement.injector.get(Router);
      fixture.detectChanges(); // runs ngOnInit -> getHeroes
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to heroes
    }));



    it('should HAVE planets', () => {
      console.log(searchComponent.PlanetList);
      expect(searchComponent.PlanetList.length).toBeGreaterThan(0, 'should have planets after service promise resolves');
    });

     it('should HAVE vehicles', () => {
      console.log(searchComponent.PlanetList);
      expect(searchComponent.Vehicles.length).toBeGreaterThan(0, 'should have vehicles after service promise resolves');
    });

  });

 describe('SearchComponent Tests for DISPLAY', () => {
    let router: Router;

     // Trigger component so it gets heroes and binds to them
    beforeEach(waitForAsync(() => {
      router = fixture.debugElement.injector.get(Router);
      fixture.detectChanges(); // runs ngOnInit -> getHeroes
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to heroes
    }));

  
    it('should DISPLAY title as "Search"', async () => {
      const page = fixture.debugElement.nativeElement.childNodes;
      const form= page[0].childNodes;
      const elements=form[0].getElementsByClassName('visits-chart__title');
      const title=elements[0].textContent;
      expect(title).toBe("Search");
    });
   
    it('should load autocomplete for Destination 1', async () => {
      const page = fixture.debugElement.nativeElement.childNodes;
      const form= page[0].childNodes;
      const autocompletes=form[0].querySelectorAll('mat-autocomplete')
      expect(autocompletes.length).toBe(1);
    }
  );

  });
}



/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  beforeEach(waitForAsync(() => {
    //const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    //const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

    TestBed
        .configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatAutocompleteModule
      ],
      providers: [
      {provide: PlanetsService, useClass: TestPlanetService},
      {provide: Router, useClass: FakeRouter},
      {provide: VehiclesService, useClass: TestVehicleService},
      {provide: TestFindingFalconeService, useClass: FindingfalconeService},
      ]
    })
        .compileComponents()
        .then(() => {
        fixture = TestBed.createComponent(SearchComponent);
        searchComponent = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        });
  }));
}