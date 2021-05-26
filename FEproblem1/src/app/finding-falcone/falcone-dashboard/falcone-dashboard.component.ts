import { Component, Output, EventEmitter,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable,of} from 'rxjs';
import { Router,NavigationExtras} from '@angular/router';
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
  styleUrls: ['./falcone-dashboard.component.css']
})
export class FalconeDashboardComponent {
 
   PlanetList: Observable<Planets[]>;
   VehicleList: Observable<Vehicles[]>;
   cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id:1,  title: 'Search', cols: 2, rows: 2, img:"../../assets/img/logo.png"}
         // { id:2,  title: '', cols: 2, rows: 2, img:"" ,}

        ];
      }

      return [
          { id:1,  title: 'Search', cols: 2, rows: 2, img:"../../assets/img/logo.png"}
          //{ id:2,  title: '', cols: 2, rows: 2, img:""}
       
      ];
    })
  );




  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private planetsService: PlanetsService,
              private vehicleService: VehiclesService,) {}

  ngOnInit(): void {
   this.PlanetList=of(this.planetsService.getList());
   this.VehicleList=of(this.vehicleService.getList());
  }

}
