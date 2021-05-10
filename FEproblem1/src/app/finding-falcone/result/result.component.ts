import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Observable,of} from 'rxjs';

import {ActivatedRoute, Router,ParamMap} from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent {

  result={};

  constructor(private route:ActivatedRoute) { 
 
  this.route.queryParams.subscribe(params => {
            this.result=params;
            console.log(this.result);
        });
}


  ngOnInit(): void {

}



}
