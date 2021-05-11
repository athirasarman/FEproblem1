import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Observable,of} from 'rxjs';

import {ActivatedRoute, Router,ParamMap} from '@angular/router';
import {FindingfalconeService} from '../findingfalcone.service';
import {Result} from '../result';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent {

  result:Result={} as Result;
  planetName:string="";
  status:string="";
  error:string="";
  timeTaken=0;

  constructor(private route:ActivatedRoute,
  	private FindingfalconeService: FindingfalconeService) { 
 
 
         this.result=this.FindingfalconeService.getResult();
         this.planetName=this.result.searchResult.planet_name;
         this.status=this.result.searchResult.status;
         this.error=this.result.searchResult.error;


}


  ngOnInit(): void {

}



}
