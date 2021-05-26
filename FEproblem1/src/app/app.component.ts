import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FEproblem1';
  constructor(public router:Router){}

 public ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}
}
