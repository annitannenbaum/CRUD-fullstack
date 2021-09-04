import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { AddProduct } from 'src/app/state/products.actions';
import { GetAllProducts } from 'src/app/state/products.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  private newProduct: Product;
  private unsubscribe = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'description': new FormControl('')
    })
  }

  onSubmit() {
    this.newProduct = new Product(this.productForm.value);
    this.addProduct(this.newProduct);
    this.store.dispatch(new GetAllProducts())
  }

  private addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product))
    .pipe(takeUntil(this.unsubscribe)).subscribe(() => this.productForm.reset());
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}
