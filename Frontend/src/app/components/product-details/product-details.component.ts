import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  currentProduct$: Observable<Product>;
  currentProduct: Product;

  private unsubscribe = new Subject<void>();

  constructor(private store: Store) {
    this.currentProduct$ = this.store.select(state => state.products.currentProduct);
  }

  ngOnInit(): void {
    this.currentProduct$.subscribe(product => {
      this.currentProduct = product;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}
