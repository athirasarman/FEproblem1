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
 
  constructor(
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,) 
  { 
    this.planetsService.getPlanets();//fetch planets from server
    this.vehicleService.getVehicles();//fetch vehicles from server
   }

  ngOnInit(): void {
  }

}
