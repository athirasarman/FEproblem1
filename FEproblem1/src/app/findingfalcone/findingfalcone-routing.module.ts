import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { FindingfalconeComponent } from './findingfalcone.component';

const routes: Routes = [
   //{ path: '', component: FalconDashboardComponent },
   //{ path:'search', component: SearchComponent},
   //{ path:'result', component: ResultComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindingfalconeRoutingModule { }
