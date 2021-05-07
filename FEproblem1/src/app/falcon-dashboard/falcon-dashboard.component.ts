import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-falcon-dashboard',
  templateUrl: './falcon-dashboard.component.html',
  styleUrls: ['./falcon-dashboard.component.css']
})

export class FalconDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id:1,  title: '', cols: 2, rows: 2, img:"../../assets/img/logo.png" }
        ];
      }

      return [
          { id:1,  title: '', cols: 2, rows: 2, img:"../../assets/img/logo.png" }
       
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}


  ngOnInit() {
  }  


}
