import { Product } from "../models/product.model";

export class GetAllProducts {
    static readonly type = '[Products] Get All Products';
    constructor() {}
}

export class AddProduct {
    static readonly type = '[Products] Add Product';
    constructor(public product: Product) {}
}