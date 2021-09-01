import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductOverviewComponent } from './pages/product-overview/product-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ProductOverviewComponent
  },
  {
    path: 'details/:_id',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
