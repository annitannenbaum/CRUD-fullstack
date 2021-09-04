import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngxs/store';
import { SetCurrentProduct } from 'src/app/state/products.actions';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit, OnDestroy {

  private _id: string;
  private unsubscribe = new Subject<void>();
  
  currentProduct: Product;

  constructor(private route: ActivatedRoute,
    private store: Store,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._id = params['_id']
    })

    this.store.dispatch(new SetCurrentProduct(this._id))
    .pipe(takeUntil(this.unsubscribe)).subscribe(products => {
      this.currentProduct = products.products.currentProduct;
    })
    
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

  onBackClick(): void {
    this.location.back()
  }

}
