import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Observable,of} from 'rxjs';

//Importing services
import {FindingfalconeService} from '../findingfalcone.service';

//importing Interfaces
import {Result} from '../result';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent {

  result:Result={} as Result;
  planetName:string="";
  status:string="";
  error:string="";
  timeTaken=0;

  constructor(private FindingfalconeService: FindingfalconeService) {  
        
}


  ngOnInit(): void {

   this.result=this.FindingfalconeService.getResult();//Fetching result from service
   if(this.result.searchResult)
   {
    switch (this.result.searchResult.status) {
      case "success":
        // code...
        {
        this.planetName=this.result.searchResult.planet_name;
        this.status=this.result.searchResult.status;
        break;
        }
        case "false":
        // code...
        {
        this.status=this.result.searchResult.status;
        break;
        }
        case "error":
        {
         this.status=this.result.searchResult.status;
         this.error=this.result.searchResult.error;
         break;
        } 
      default:
        // code...
        {
          this.status="error";
        break;
        }
     }

    }
}



}
