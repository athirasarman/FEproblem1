import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.sass']
})
export class AppFooterComponent implements OnInit {
  copyRight="@2012. All Rights Reserved.";

  constructor() { }

  ngOnInit(): void {
  }

}
