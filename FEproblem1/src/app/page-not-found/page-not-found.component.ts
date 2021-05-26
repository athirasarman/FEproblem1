import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent {
  title="404";
  subTitle="Oops. Looks like the page you're looking for no longer exists";
  errorMessage="But we're here to bring you back to safety";
 
  constructor() {}

 }

