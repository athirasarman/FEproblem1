import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,ParamMap} from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
	result:object={};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

   this.route.data.subscribe(data => {
               this.result=data;
           })

}
}