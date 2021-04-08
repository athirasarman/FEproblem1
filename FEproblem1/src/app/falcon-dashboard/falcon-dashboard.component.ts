import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatButtonModule} from '@angular/material/button';

//Importing Services
import {PlanetsService} from '../planets.service';
import {VehiclesService} from '../vehicles.service';
import {FindingfalconeService} from '../findingfalcone.service';

//Importing Interfaces
import {Vehicles} from '../vehicles';
import {Planets} from '../planets';
import {Token} from '../token';
import {FindFalconRequest} from '../find-falcon-request';

@Component({
  selector: 'app-falcon-dashboard',
  templateUrl: './falcon-dashboard.component.html',
  styleUrls: ['./falcon-dashboard.component.css']
})
export class FalconDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id:1,  title: 'Select planets and vehicles you want to search in', cols: 2, rows: 2, img:"../../assets/img/logo.png" },
         // { id:2,  title: 'Select Vehicles of your choice', cols: 2, rows: 1 },
         // { id:3,  title: 'Vehicles', cols: 1, rows: 1 },
         // { id:4,  title: 'Falcon Search', cols: 1, rows: 1 }
        ];
      }

      return [
          { id:1,  title: 'Select planets and vehicles you want to search in', cols: 2, rows: 2, img:"../../assets/img/logo.png" },
        //  { id:2,  title: 'Select Vehicles of your choice', cols: 2, rows: 1 },
         // { id:3,  title: 'Vehicles', cols: 1, rows: 1 },
          //{ id:4,  title: 'Falcon Search', cols: 1, rows: 1 }
      ];
    })
  );
  Planets: Planets[]=[];
  Vehicles: Vehicles[]=[];  
  Token: Token={} as Token;
  selectedPlanets: string[]=[];
  selectedVehicles: string[]=[];

  constructor(private breakpointObserver: BreakpointObserver,

    private planetsService: PlanetsService,
    private vehicleService: VehiclesService,
    private FindingfalconeService: FindingfalconeService,) {}


  ngOnInit() {+
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }  
  
  //Function to get planets server
  getPlanets(): void
  {

    this.planetsService.getPlanets()
      .subscribe(Planets=>{this.Planets=Planets;
        console.log(this.Planets);});
       
   }


  //Function to get vehicles server
  getVehicles(): void
  {

    this.vehicleService.getVehicles()
      .subscribe(Vehicles=>{this.Vehicles=Vehicles;
        console.log(this.Vehicles);});
       
   }

//Function to get token from server
   getToken(): void
  {

    this.FindingfalconeService.findingFalconToken()
    .subscribe(Token=>{this.Token=Token;
        this.findfalcon(this.Token);
        console.log(this.Token);});

    //this.findfalcon();
   }

//Function to add a planet to a selected array
  addSelectedPlanet(planet:Planets):void
  {
         this.selectedPlanets.push(planet.name);
         console.log("planet added");
  }

  //Function to add a planet to a selected array
  addSelectedVehicle(vehicle:Vehicles):void
  {
         this.selectedVehicles.push(vehicle.name);
         console.log("Vehicle added");
  }

//function to find findingFalcon
findfalcon(token:Token, ):void{
  //  console.log(token.toString());
 let FindFalconRequest:FindFalconRequest={
   token:token.toString(),
   planet_names:this.selectedPlanets,
   vehicle_names:this.selectedVehicles
 };

 this.FindingfalconeService.findFalcon(FindFalconRequest)
    .subscribe(data=>{console.log(data);});


}


}
