import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FalconeDashboardComponent } from './falcone-dashboard/falcone-dashboard.component';
import { ResultComponent } from './result/result.component';
import { PlanetsComponent } from './planets/planets.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SearchComponent } from './search/search.component';



const routes: Routes = [

{ path: 'dashboard', component: FalconeDashboardComponent },
{ path: 'search', component: SearchComponent },
{ path:'result', component:ResultComponent },
{ path:'planets', component:PlanetsComponent },
{ path:'vehicles', component:VehiclesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindingFalconeRoutingModule { }
