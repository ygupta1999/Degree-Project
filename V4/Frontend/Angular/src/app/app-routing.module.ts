import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Imports to routing HTTP
import { MarketComponent } from './market/market.component';


const routes: Routes = [
  { path: 'market', component: MarketComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
