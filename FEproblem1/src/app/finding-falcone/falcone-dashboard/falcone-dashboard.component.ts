import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-falcone-dashboard',
  templateUrl: './falcone-dashboard.component.html',
  styleUrls: ['./falcone-dashboard.component.css']
})
export class FalconeDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row 
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );*/

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
}
