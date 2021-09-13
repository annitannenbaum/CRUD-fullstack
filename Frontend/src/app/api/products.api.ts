import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable()

export class ProductsService {

    constructor(private http: HttpClient) {}

    getAllProducts() {
        return this.http.get<Product[]>('http://localhost:3000/products');
    }

    addProduct(product: Product) {
        return this.http.post<string>('http://localhost:3000/products', product);
    }

    updateProduct(product: Product) {
        return this.http.put<Product>(`http://localhost:3000/products/${product._id}`, product)
    }
}
