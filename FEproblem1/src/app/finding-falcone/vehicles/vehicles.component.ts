import { Component } from '@angular/core';

import {Observable,of} from 'rxjs';

//Importing Services
import {VehiclesService} from '../vehicles.service';

//Importing Interfaces
import {Vehicles} from '../vehicles';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
	vehiclesList: Observable<Vehicles[]>;
 constructor(private vehiclesService: VehiclesService) {


  }
  ngOnInit(){
     
      this.vehiclesList=this.vehiclesService.getList();//Fetching all vehicles
       

  }
}
