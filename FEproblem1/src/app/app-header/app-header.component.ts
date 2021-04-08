import { Component, OnInit } from '@angular/core';
import {HttpResponse,HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.sass']
})


export class AppHeaderComponent implements OnInit {
	welcomeMessage="Welcome King Shan";

  constructor() { }

  ngOnInit(): void {
  }

}
