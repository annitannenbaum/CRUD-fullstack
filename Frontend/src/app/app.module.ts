import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsService } from './api/products.api';
import { environment } from 'src/environments/environment';
import { ProductsState } from './state/products.state';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductOverviewComponent } from './pages/product-overview/product-overview.component';
import { ProductDetailViewComponent } from './pages/product-detail-view/product-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
    ProductDetailsComponent,
    ProductOverviewComponent,
    ProductDetailViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ProductsState], {
      developmentMode: !environment.production
    })
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
