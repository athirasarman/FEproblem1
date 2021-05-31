import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';


const routes: Routes = [

   //{ path:'result',component:ResultComponent},
  
   { path: 'findingfalcone', loadChildren: () => import('./finding-falcone/finding-falcone.module').then(m => m.FindingFalconeModule) },
   { path: '', redirectTo:'dashboard', pathMatch:'full'},
   { path: 'result',redirectTo:'result',pathMatch:'full'},   
   { path:'404', component:PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, // <-- debugging purposes only
                                           preloadingStrategy: SelectivePreloadingStrategyService,
  	                                       onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
	