import { Product } from "./product.model";

export interface ProductsStateModel {
    products: Product[];
    currentProduct: Product;
}