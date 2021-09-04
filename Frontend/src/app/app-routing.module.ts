import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailViewComponent } from './pages/product-detail-view/product-detail-view.component';

import { ProductOverviewComponent } from './pages/product-overview/product-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ProductOverviewComponent
  },
  {
    path: 'details/:_id',
    component: ProductDetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
