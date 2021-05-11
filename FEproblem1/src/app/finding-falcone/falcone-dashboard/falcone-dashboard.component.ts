import { Component, Output, EventEmitter,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable,of} from 'rxjs';
import { Router,NavigationExtras} from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-falcone-dashboard',
  templateUrl: './falcone-dashboard.component.html',
  styleUrls: ['./falcone-dashboard.component.css']
})
export class FalconeDashboardComponent {
 @Output() searchResultEvent=new EventEmitter<{}>();
 showSearchCard:boolean=true;
 showResultCard:boolean=false
 searchresult={};


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
         private router: Router) {}

   addItem(newItem:{}) {
     
    console.log(newItem);
    this.searchresult=newItem;
    let navigationExtras: NavigationExtras = {
            queryParams: this.searchresult
        };
    this.router.navigate(["/result"],{state:this.searchresult});
  }
}
