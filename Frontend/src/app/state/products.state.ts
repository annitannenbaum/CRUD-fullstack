import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';

import { ProductsService } from '../api/products.api';
import { ProductsStateModel } from '../models/products.state.model';
import { AddProduct } from './products.actions';

@State<ProductsStateModel>({
    name: 'products',
    defaults: {
        products: []
    }
})

@Injectable()

export class ProductsState {

    constructor(private productsService: ProductsService) {}

    @Action(AddProduct)
    addProduct(ctx: StateContext<ProductsStateModel>, action: AddProduct) {

        return this.productsService.addProduct(action.product).pipe(
            tap(productsResult => {
                const state = ctx.getState();
                ctx.patchState({
                    products: [
                        ...state.products,
                        productsResult
                    ]
                });
            })
        )
    }
}