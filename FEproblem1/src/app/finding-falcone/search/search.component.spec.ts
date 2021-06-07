import { waitForAsync, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { FormBuilder, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';
import {Overlay, OverlayContainer} from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { NO_ERRORS_SCHEMA,DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {Observable,of} from 'rxjs';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {MatCardHarness} from '@angular/material/card/testing';
import {MatInputHarness} from '@angular/material/input/testing';

import {HarnessLoader, parallel} from '@angular/cdk/testing';

import { addMatchers, asyncData, click } from '../../../testing';

import {  asyncError } from '../../../testing/async-observable-helpers';

import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

import {MatRadioButton, MatRadioChange, MatRadioGroup} from '@angular/material/radio';


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
let overlayContainer: OverlayContainer;
let overlayContainerElement: HTMLElement;
let groupDebugElement: DebugElement;
let radioDebugElements: DebugElement[];
let radioNativeElements: HTMLElement[];
let radioLabelElements: HTMLLabelElement[];
let radioInputElements: HTMLInputElement[];
let groupInstance: MatRadioGroup;
let radioInstances: MatRadioButton[];

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
      fixture.detectChanges(); // runs ngOnInit 
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
      const autocompletes=form[0].querySelectorAll('mat-autocomplete');
      expect(autocompletes.length).toBe(1);
    }
  );


  it('should load all autocomplete harness for Destination1', async () => {
      const autocompletes = await loader.getAllHarnesses(MatAutocompleteHarness);
      expect(autocompletes.length).toBe(1);
    }
  );

  it('should load planets in autocomplete for Destination 1', async () => {
    fixture.detectChanges();
   const autocompletes = await loader.getHarness(MatAutocompleteHarness);
   let text="";

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
             const option=await autocompletes.getOptions();
         
             console.log(option.length);
             expect(option.length).toBeGreaterThan(0,'should show all options');    
   });


  it('should filter destinations for Destination1 Autocomplete based on input', async () => {
    fixture.detectChanges();
   const autocompletes = await loader.getHarness(MatAutocompleteHarness);
   let text="Donlon";

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    let options=document.querySelectorAll('mat-option');
    expect(options.length).toBe(1,'should show filtered options only'); 
    //Complete clicking Process 
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
   });


  it('should show Vehicle1 radio button group when Destination1 has been selected', async () => {
    fixture.detectChanges();
   const autocompletes = await loader.getHarness(MatAutocompleteHarness);
   let text="Donlon";

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    let options=document.querySelectorAll('mat-option');
    
    //Complete clicking Process 
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=document.querySelectorAll('mat-radio-button');
    expect(searchComponent.showVehicle1).toBe(false);
    expect(radioGroup.length).toBeGreaterThan(0);
    expect(radioButtons.length).toBeGreaterThan(0);
   });

   it('should DISPLAY Vehicles in Vehicle radio button group according to Destination selected', async () => {
    fixture.detectChanges();
   const autocompletes = await loader.getHarness(MatAutocompleteHarness);
   let text="Jebing";

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    let options=document.querySelectorAll('mat-option');
    
    //Complete clicking Process 
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    let expectedVehicles:Vehicles[]=[{name:"Space Rocket",total_no:1,max_distance:300,speed:4},
    {name:"Space Shuttle",total_no:1,max_distance:400,speed:5},
    {name:"Space Ship",total_no:2,max_distance:600,speed:10}];
    searchComponent.filteredVehicles1.subscribe(vehicles=>{
      console.log(vehicles);
      expect(vehicles).toEqual(expectedVehicles,'Should have only filtered planets');}
      );
   });
 
it('should DISPLAY error when Destination1 has not been selected', async () => {
    fixture.detectChanges();  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  

   // let options=fixture.debugElement.query(By.css('mat-option'));
    const options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');
    expect(error.length).toBe(1,'should show error message');

   });

it('should HIDE error message when Destination1 has been selected', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  

    const options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
    error=document.querySelectorAll('mat-error');
    let errors=error[0].childNodes;
    let errorMessage=errors[0].childNodes;
    let message=errorMessage[0].childNodes;
    expect(message.length).toBe(0,'should hide error message');
   
   });

it('should CALCULATE and DISPLAY Time Taken when Destination1 and Vehicle1 has been selected', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    const options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
       console.log(searchComponent.planet1);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed

   });

it('should DISPLAY Destination2 autocomplete when Destination1 and Vehicle1 has been selected', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    const options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
       radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.showPlanet2).toBe(true);

   });   


it('should load filtered planets in autocomplete for Destination 2', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"",distance:0};

     fixture.detectChanges();

    //Setting Value to Control
    
     fixture.detectChanges();
       radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();

    //Complete Destination2 input Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    expect(options.length).toBeGreaterThan(0,'should show planets in autocomplete options');
    let expectedPlanets: Planets[]=[
    {name:"Donlon",distance:100},
    {name:"Enchai",distance:200},
    {name:"Sapir",distance:400},
    {name:"Lerbin",distance:500},
    {name:"Pingasor",distance:600}
    ];
    searchComponent.filteredPlanets2.subscribe(planets=>expect(planets).toEqual(expectedPlanets,'should have filtered lsit of planets'));
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  



   });

it('should DISPLAY error when Destination2 has not been selected', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    let text2="Donlon";

     fixture.detectChanges();

    //Setting Value to Control
    
     fixture.detectChanges();
       radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();

    //Complete Destination2 input Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text2;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    let error=document.querySelectorAll('mat-error');
    expect(error[1].textContent).toBe(' Destination 2 name not recognized. Click one of the autocomplete options. ');
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
  });

it('should HIDE error when Destination2 has not been selected', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    let text2={name:"Donlon",distance:100};

     fixture.detectChanges();

    //Setting Value to Control
    
     fixture.detectChanges();
       radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();

    //Complete Destination2 input Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text2.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    let error=document.querySelectorAll('mat-error');
    expect(error[1].textContent).toBe(' Destination 2 name not recognized. Click one of the autocomplete options. ');
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
    fixture.detectChanges();
     error=document.querySelectorAll('mat-error');
    let errors=error[1].childNodes;
    let errorMessage=errors[1].textContent;
   // let message=errorMessage[1].childNodes;
    expect(errorMessage).toBe('','should hide error message');

  });

it('should filter destinations for Destination2 Autocomplete based on input', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();

    //Setting Value to Control
    
     fixture.detectChanges();
       radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();

    //Complete Destination2 input Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    expect(options.length).toBe(1,'should show filtered options only')
    
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  



   });

it('should show filtered vehicles in Vehicle2 radio button group when Destination2 has been selected', async () => {
  fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');

    //Setting Value to Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();


    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');
    //Complete Vehicle2 clicking Process 
    let expectedVehicles:Vehicles[]=[{name:"Space pod",total_no:2,max_distance:200,speed:2},
    {name:"Space Shuttle",total_no:1,max_distance:400,speed:5},
    {name:"Space Ship",total_no:2,max_distance:600,speed:10}];
    searchComponent.filteredVehicles2.subscribe(vehicles=>{
      console.log(vehicles);
      expect(vehicles).toEqual(expectedVehicles,'Should have only filtered vehicles');
    });

   });

it('should CALCULATE and DISPLAY Time Taken when Destination1 and Vehicle1 has been selected', async () => {
  fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(125,'Calculate and Display timeTaken');//time=distance/speed
    });



  it('should DISPLAY Destination3 autocomplete when Destination2 and Vehicle2 has been selected', async () => {
    fixture.detectChanges();
  
    const autocompletes = fixture.debugElement.query(By.css('mat-autocomplete')); // Returns DebugElement
   let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();          
    options=document.querySelectorAll('mat-option');
    
    const optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();
   expect(searchComponent.showPlanet3).toBe(true,'should Display Destination3 autocomplete');
   });   



  it('should load filtered planets in autocomplete for Destination 3',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value="";
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
   expect(options.length).toBeGreaterThan(0,'should show planets in autocomplete options');
    let expectedPlanets: Planets[]=[
    {name:"Enchai",distance:200},
    {name:"Sapir",distance:400},
    {name:"Lerbin",distance:500},
    {name:"Pingasor",distance:600}
    ];
    searchComponent.filteredPlanets3.subscribe(planets=>expect(planets).toEqual(expectedPlanets,'should have filtered lsit of planets'));
    optionToClick = options[0] as HTMLElement;
    optionToClick.click(); 
   });   

 it('should filter destinations for Destination 3 autocomplete based on input',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
   expect(options.length).toBe(1,'should show filtered destination in autocomplete options');
    optionToClick = options[0] as HTMLElement;
    optionToClick.click(); 
    fixture.detectChanges();
   });   

it('should DISPLAY error when Destination3 has not been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();  
    let error=document.querySelectorAll('mat-error');
    expect(error[2].textContent).toBe(' Destination 3 name not recognized. Click one of the autocomplete options. ');      
    options=overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click(); 
    fixture.detectChanges();
   }); 


it('should HIDE error when Destination3 has not been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[1].querySelectorAll('mat-radio-button');

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();  
    let error=document.querySelectorAll('mat-error');
    expect(error[2].textContent).toBe(' Destination 3 name not recognized. Click one of the autocomplete options. ');  


    options=overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();
    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text); 
    fixture.detectChanges();
     error=document.querySelectorAll('mat-error');
    expect(error[2].textContent).toBe('','should hide error message'); 
   });     



it('should DISPLAY filtered Vehicles in Vehicle3 radio button group according to Destination3 selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();   


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');
    //Complete Vehicle3 clicking Process 
    let expectedVehicles:Vehicles[]=[{name:"Space pod",total_no:1,max_distance:200,speed:2},
    {name:"Space Shuttle",total_no:1,max_distance:400,speed:5},
    {name:"Space Ship",total_no:2,max_distance:600,speed:10}];
    searchComponent.filteredVehicles3.subscribe(vehicles=>{
      console.log(vehicles);
      expect(vehicles).toEqual(expectedVehicles,'Should have only filtered vehicles');
   });  

})


it('should CALCULATE and DISPLAY Time Taken when Destination3 and Vehicle3 has been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();   


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.timeTaken).toBe(225,'should Calculate and Display timeTaken');
});


it('should DISPLAY Destination4 autocomplete when Destination3 and Vehicle3 has been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();   


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.showPlanet4).toBe(true,'should Display Destination4 Autocomplete');
});

it('should load filtered planets in autocomplete for Destination 4',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges(); 


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.showPlanet4).toBe(true,'should Display Destination4 Autocomplete');

   //Input process of Destination 4
   text ={name:"Sapir",distance:400};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[12];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= "";
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();
     options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      let expectedPlanets: Planets[]=[
    {name:"Sapir",distance:400},
    {name:"Lerbin",distance:500},
    {name:"Pingasor",distance:600}
    ];
    searchComponent.filteredPlanets4.subscribe(planets=>expect(planets).toEqual(expectedPlanets,'should have filtered list of planets'));

    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

});


it('should filter destinations for Destination4 Autocomplete based on input',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges(); 


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.showPlanet4).toBe(true,'should Display Destination4 Autocomplete');

   //Input process of Destination 4
   text ={name:"Sapir",distance:400};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[12];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();
     options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
     expect(options.length).toBe(1,'should show only filtered planets in autocomplete ')
     optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

});

it('should DISPLAY error when Destination4 has not been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges(); 


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.showPlanet4).toBe(true,'should Display Destination4 Autocomplete');

   //Input process of Destination 4
   text ={name:"Sapir",distance:400};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[12];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();
     options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
     optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');
    expect(error[3].textContent).toBe(' Destination 4 name not recognized. Click one of the autocomplete options. ');  

});

it('should HIDE error when Destination4 has not been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges(); 


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.showPlanet4).toBe(true,'should Display Destination4 Autocomplete');

   //Input process of Destination 4
   text ={name:"Sapir",distance:400};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[12];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();
     options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
     optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();
    let error=document.querySelectorAll('mat-error');
    expect(error[3].textContent).toBe(' Destination 4 name not recognized. Click one of the autocomplete options. ','should display error message');  
    //Setting Value to Destination4 Control
    fixture.componentInstance.Destination4.setValue(text);
    fixture.detectChanges(); 
    error=document.querySelectorAll('mat-error');
    expect(error[3].textContent).toBe('','should hide error message');
});

it('should DISPLAY filtered Vehicles in Vehicle3 radio button group according to Destination4 selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges(); 


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    fixture.detectChanges();
    expect(searchComponent.showVehicle3).toBe(false,'should show Vehicle 3 radioGroup');
    const radioGroup= document.querySelectorAll('mat-radio-group');
    const radioButtons=radioGroup[2].querySelectorAll('mat-radio-button');

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   expect(searchComponent.showPlanet4).toBe(true,'should Display Destination4 Autocomplete');

   //Input process of Destination 4
   text ={name:"Sapir",distance:400};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[12];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();
     options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
     optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Vehicles List Testing
    expect(searchComponent.showVehicle2).toBe(false,'should display vehicles radio group')
     let expectedVehicles:Vehicles[]=[{name:"Space Shuttle",total_no:1,max_distance:400,speed:5},
    {name:"Space Ship",total_no:2,max_distance:600,speed:10}];
    searchComponent.filteredVehicles4.subscribe(vehicles=>{
      console.log(vehicles);
      expect(vehicles).toEqual(expectedVehicles,'Should have only filtered vehicles');
   }); 
});


it('should CALCULATE and DISPLAY Time Taken when Destination4 and Vehicle4 has been selected',async () => {
   fixture.detectChanges();
    let text:Planets={name:"Jebing",distance:300};

     fixture.detectChanges();
    let inputElement = fixture.debugElement.query(By.css('input')); // Returns DebugElement
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling event for filter process
    fixture.detectChanges();  
    let options =overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
 
    const leftclickevent = {button: 0};
    click(options[0],leftclickevent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    //Setting Value to Destination1 Control
    fixture.componentInstance.Destination1.setValue(text);
    
    console.log(fixture.componentInstance.Destination1.value);
     fixture.detectChanges();
     radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
   radioLabelElements[0].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(75);//time=distance/speed
    fixture.detectChanges();
    searchComponent.showVehicle2=true;
    text={name:"Donlon",distance:100};

     fixture.detectChanges();
    //Complete Destination2 clicking Process 
    let inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[4];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value=text.name;
   inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges();        
    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    let optionToClick = options[0] as HTMLElement;
    optionToClick.click();  
    fixture.detectChanges();

    //Setting Value to Destination2 Control
    fixture.componentInstance.Destination2.setValue(text);

    //Complete Vehicle2 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[3].click();
   fixture.detectChanges();

   //Input process of Destination 3
   text ={name:"Enchai",distance:200};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[8];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();  
    await fixture.whenStable();
    fixture.detectChanges(); 


    options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    //Setting Value to Destination3 Control
    fixture.componentInstance.Destination3.setValue(text);  
    

    //Complete Vehicle3 clicking Process 
    fixture.detectChanges();
    radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance); 
        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
      //Complete Vehicle2 clicking process
   radioLabelElements[6].click();
   fixture.detectChanges();

   //Input process of Destination 4
   text ={name:"Sapir",distance:400};
     inputElements=fixture.debugElement.queryAll(By.css('input'));
     inputElement=inputElements[12];
    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value= text.name;
    inputElement.nativeElement.dispatchEvent(new Event('input'));// Calling eventfor filter process
    fixture.detectChanges();
     fixture.whenStable();
    fixture.detectChanges();
     options=document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
     optionToClick = options[0] as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();
    fixture.whenStable();
    fixture.detectChanges();
      //Setting Value to Destination3 Control
    fixture.componentInstance.Destination4.setValue(text);  
    fixture.detectChanges();

      //Complete Vehicle4 clicking Process 
 
   radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
    
    //Complete Vehicle1 clicking process
  radioLabelElements[9].click();
   fixture.detectChanges();
   expect(searchComponent.timeTaken).toBe(305,'should Calculate and Display timeTaken');  //time=distance/speed       
});


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
        inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
        radioDebugElements = fixture.debugElement.queryAll(By.directive(MatRadioButton));
        radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
        radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

        radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label'))!.nativeElement);
        radioInputElements = radioDebugElements
          .map(debugEl => debugEl.query(By.css('input'))!.nativeElement);
    })();
        });
  }));
}
