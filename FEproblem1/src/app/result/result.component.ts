import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router,ParamMap} from '@angular/router';


@Component({
  selector: 'app-result-dummy',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
	//@Input() result={};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

   /*this.route.data.subscribe(data => {
               this.result=data;
           })*/

}
}