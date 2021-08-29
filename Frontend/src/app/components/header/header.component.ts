import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/api/products.api';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  products: Product[] = [];

  constructor(private apiService: ProductsService) { }

  ngOnInit(): void {

    this.apiService.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }

}
