import { Component } from '@angular/core';

import {Observable,of} from 'rxjs';

//Importing Services
import {PlanetsService} from '../planets.service';

//Importing Interfaces
import {Planets} from '../planets';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent {
  planetList: Observable<Planets[]>=of([]);

  constructor(private planetsService: PlanetsService) {

  }
  
  ngOnInit(){
     
      this.planetList=this.planetsService.getList();//Fetching all planets from service
       

  }

}
