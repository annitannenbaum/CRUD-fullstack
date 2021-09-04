import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { GetAllProducts, SetCurrentProduct, UpdateProduct } from 'src/app/state/products.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {

  currentProduct$: Observable<Product>;
  currentProduct: Product;

  productForm: FormGroup;
  updatedProduct: Product;

  private unsubscribe = new Subject<void>();

  constructor(private store: Store) {
    this.currentProduct$ = this.store.select(state => state.products.currentProduct);
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'title': new FormControl(''),
      'name': new FormControl(''),
      'description': new FormControl('')
    })

    this.currentProduct$.subscribe(product => {
      this.currentProduct = product;
    });
  }

  onSubmit(): void {
    this.updatedProduct = new Product({ _id: this.currentProduct._id, ...this.productForm.value})
    this.updateProduct(this.updatedProduct)
    this.store.dispatch(new GetAllProducts())
  }

  private updateProduct(product: Product) {
    this.store.dispatch(new UpdateProduct(product)).subscribe(() => 
    this.productForm.reset()
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}
