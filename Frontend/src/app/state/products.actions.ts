import { Product } from "../models/product.model";

export class GetAllProducts {
    static readonly type = '[Products] Get All Products';
    constructor() {}
}

export class SetCurrentProduct {
    static readonly type = '[Products] Set Current Product';
    constructor(public _id: string) {}
}

export class AddProduct {
    static readonly type = '[Products] Add Product';
    constructor(public product: Product) {}
}

export class UpdateProduct {
    static readonly type = '[Products] Update Product';
    constructor(public product: Product) {}
}