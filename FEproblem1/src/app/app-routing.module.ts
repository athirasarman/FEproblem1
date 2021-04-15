import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FalconDashboardComponent } from './falcon-dashboard/falcon-dashboard.component';
import {ResultComponent}from './result/result.component';


const routes: Routes = [
   { path: 'dashboard', component: FalconDashboardComponent },
   { path:'result',component:ResultComponent},
   //{ path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
