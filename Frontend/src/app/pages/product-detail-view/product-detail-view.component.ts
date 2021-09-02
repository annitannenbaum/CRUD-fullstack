import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/api/products.api';

import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {

  _id!: string;
  currentProduct!: Product;

  constructor(private route: ActivatedRoute, private apiService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._id = params['_id']
      console.log(this._id)

    })
    this.apiService.getAllProducts().subscribe(res => {
        this.currentProduct = res.find(
          product => product._id === this._id
        )
    })
  }

}
