import { Product } from "../models/product.model";

export interface ProductsStateModel {
    products: Product[];
    currentProduct: Product;
}