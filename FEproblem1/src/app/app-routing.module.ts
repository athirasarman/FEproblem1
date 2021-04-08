import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FalconDashboardComponent } from './falcon-dashboard/falcon-dashboard.component';

const routes: Routes = [
   { path: 'dashboard', component: FalconDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
