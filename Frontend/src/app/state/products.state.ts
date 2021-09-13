import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';

import { tap } from 'rxjs/operators';

import { ProductsService } from '../api/products.api';
import { Product } from '../models/product.model';
import { ProductsStateModel } from './products.state.model';
import { AddProduct, GetAllProducts, SetCurrentProduct, UpdateProduct } from './products.actions';

@State<ProductsStateModel>({
    name: 'products',
    defaults: {
        products: [],
        currentProduct: {
            _id: '',
            name: '',
            title: '',
            description: ''
        }
    }
})

@Injectable()

export class ProductsState {

    constructor(private productsService: ProductsService) {}

    @Action(GetAllProducts)
    getAllProducts(ctx: StateContext<ProductsStateModel>) {
        return this.productsService.getAllProducts().pipe(
            tap(productsResult => {
                const state = ctx.getState();
                ctx.patchState({
                    products: [
                        ...productsResult
                    ]
                })
            })
        )
    }

    @Action(SetCurrentProduct)
    setCurrentProduct(ctx: StateContext<ProductsStateModel>, action: SetCurrentProduct) {
        const state = ctx.getState();
        let productToFind: Product;

        // if state is already initialized, get product from state
        // else get product from API

        if (!(state.products.length === 0)) {
            productToFind = state.products.find(
                product => product._id === action._id
            )
            ctx.patchState({
                currentProduct: {
                    ...productToFind
                }
            });
            return productToFind;

        } else {
           return this.productsService.getAllProducts().pipe(
                tap(products => {
                    productToFind = products.find(
                        product => product._id === action._id
                    )
                    ctx.patchState({
                        currentProduct: {
                            ...productToFind
                        }
                    })
                })
            )
        }
    }

    @Action(AddProduct)
    addProduct(ctx: StateContext<ProductsStateModel>, action: AddProduct) {

        return this.productsService.addProduct(action.product).pipe(
            tap(productsResult => {
                const state = ctx.getState();
                ctx.patchState({
                    products: [
                        ...state.products,
                        {...action.product, _id: productsResult} // add backend generated id to new product object
                    ]
                });
            })
        )
    }

    @Action(UpdateProduct)
    updateProduct(ctx: StateContext<ProductsStateModel>, action: UpdateProduct) {
        return this.productsService.updateProduct(action.product).pipe(tap(() => {
            const state = ctx.getState();

            ctx.setState(patch({
                products: updateItem<Product>(product => product._id === action.product._id, {...action.product})
                })
            );

            ctx.patchState({
                currentProduct: {
                    ...action.product
                }
            });
        }
        ))
    }
}
