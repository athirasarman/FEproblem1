import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
export class SearchComponent {
    myControl = new FormControl();
  
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

  constructor(private fb: FormBuilder,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService) {}

ngOnInit() {
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

 //Function to get vehicles from server
  getVehicles(): void
  {

    this.vehicleService.getVehicles()
      .subscribe(Vehicles=>{this.Vehicles=Vehicles;
        console.log(this.Vehicles);});
       
   }
  onSubmit(): void {
    alert('Thanks!');
  }
}
