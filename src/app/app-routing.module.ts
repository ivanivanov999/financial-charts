import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';
import { WaterfallChartComponent } from './waterfall-chart/waterfall-chart.component';

const routes: Routes = [
  {path: 'bullet', component: BulletChartComponent},
  {path: 'waterfall', component: WaterfallChartComponent},
  {path: '', redirectTo: '/bullet', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
