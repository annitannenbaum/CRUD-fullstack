import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { ProductsService } from 'src/app/api/products.api';
import { Product } from 'src/app/models/product.model';
import { AddProduct } from 'src/app/state/products.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  private newProduct!: Product;

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
  }

  private addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product)).subscribe(() => this.productForm.reset());
  }

}
