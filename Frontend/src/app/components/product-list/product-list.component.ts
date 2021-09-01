import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$!: Observable<Product[]>;

  headers = ['Name', 'Description']

  constructor(private store: Store, private router: Router) {
    this.products$ = this.store.select(state => state.products.products)
   }

  ngOnInit(): void {
  }

  onSelect(_id: string) {
    this.router.navigate(['details', _id])
  }

}
