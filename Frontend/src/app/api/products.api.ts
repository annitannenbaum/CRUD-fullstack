import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable()

export class ProductsService {

    constructor(private http: HttpClient) {}

    getAllProducts() {
        return this.http.get<Product[]>('http://localhost:3000/products');

        // TO DO extract logic into env variable
    }
}