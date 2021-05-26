import { Component, Output, EventEmitter,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable,of} from 'rxjs';;
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

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
 
  constructor(private breakpointObserver: BreakpointObserver,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,) 
  { this.planetsService.getPlanets();
    this.vehicleService.getVehicles();
   }

  ngOnInit(): void {
  }

}
