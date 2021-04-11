import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatAutocompleteActivatedEvent}from '@angular/material/autocomplete';



import {PlanetsService} from '../planets.service';
import {VehiclesService} from '../vehicles.service';

//Importing Interfaces
import {Vehicles} from '../vehicles';
import {Planets} from '../planets';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    myControl = new FormControl();
    filteredPlanets1: Observable<Planets[]>;
    

    addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  vehicle1: string= "";
  vehicle2: string= "";
  vehicle3: string= "";
  vehicle4: string= "";
  timeTaken=0;
  Planets: Planets[]=[];
  Vehicles: Vehicles[]=[];
  showVehicle1=false;
  showVehicle2=false;
  showVehicle3=false;
  showVehicle4=false;
  selectedPlanets: string[]=[];
  

  constructor(private fb: FormBuilder,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService) {}

ngOnInit() {
  this.filteredPlanets1 = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.getPlanets();
    this.getVehicles();
    } 


  //Function to get planets from server
  getPlanets(): void
  {

    this.planetsService.getPlanets()
      .subscribe(Planets=>{this.Planets=Planets;
        console.log(this.Planets);});
       
   }

  onSelectingPlanet(value:object):  void{
    this.showVehicle1=true;
    console.log(value);
    //this.addSelectedPlanet(event.option.value);
  }
 //Function to get vehicles from server
  getVehicles(): void
  {

    this.vehicleService.getVehicles()
      .subscribe(Vehicles=>{this.Vehicles=Vehicles;
        console.log(this.Vehicles);});
       
   }


  private _filter(value: Planets[]): Planets[] {
    const filterValue = value;

    return this.Planets ;
  }

  //Function to add a planet to a selected array
  addSelectedPlanet(planetName:string):void
  {
         this.selectedPlanets.push(planetName);
         console.log("planet added");
  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
