import { Component, Output, EventEmitter,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable,of} from 'rxjs';

//Importing Services
import {PlanetsService} from '../planets.service';
import {VehiclesService} from '../vehicles.service';

//Importing Interfaces
import {Vehicles} from '../vehicles';
import {Planets} from '../planets';

@Component({
  selector: 'app-falcone-dashboard',
  templateUrl: './falcone-dashboard.component.html',
  styleUrls: ['./falcone-dashboard.component.scss']
})
export class FalconeDashboardComponent {
 planetList: Observable<Planets[]>=of([]);

 vehiclesList: Observable<Vehicles[]>=of([]);
  constructor(
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,) 
  { 
    // this.planetList=this.planetsService.getPlanets();
     //this.vehiclesList= this.vehicleService.getVehicles();
    
   }

  ngOnInit(): void {
    this.planetList=this.planetsService.getList();//fetch planets from server
    this.vehiclesList= this.vehicleService.getList();//fetch vehicles from server
  }

}
