import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import productsController from './controllers/products.controller';
import productsMiddleware from './middleware/products.middleware';

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {

        this.app
            .route('/products')
            .get(productsController.listProducts)
            .post(
                productsMiddleware.validateMandatoryFields,
                productsController.createProduct
            );

        this.app.param('productId', productsMiddleware.extractProductId);

        this.app
            .put('/products/:productId', [
                productsMiddleware.validateMandatoryFields,
                productsController.putProduct
            ])

        return this.app;
    }
}