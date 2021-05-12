import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [

   //{ path:'result',component:ResultComponent},
  
   { path: 'findingfalcone', loadChildren: () => import('./finding-falcone/finding-falcone.module').then(m => m.FindingFalconeModule) },
   { path: '', redirectTo:'/navigation', pathMatch:'full'},
   { path: 'result',redirectTo:'result',pathMatch:'full'},
   { path:'404', component:PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
	