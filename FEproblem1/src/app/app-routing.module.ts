import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultComponent}from './result/result.component';


const routes: Routes = [

   //{ path:'result',component:ResultComponent},
   { path: 'findingfalcone', loadChildren: () => import('./finding-falcone/finding-falcone.module').then(m => m.FindingFalconeModule) },
   { path: '', redirectTo:'/navigation', pathMatch:'full'}
   //{ path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
