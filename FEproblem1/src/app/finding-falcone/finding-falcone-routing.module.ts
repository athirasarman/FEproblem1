import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FalconeDashboardComponent } from './falcone-dashboard/falcone-dashboard.component';

import { ResultComponent } from './result/result.component';



const routes: Routes = [
{ path: 'dashboard', component: FalconeDashboardComponent },

{ path:'result', component:ResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindingFalconeRoutingModule { }
