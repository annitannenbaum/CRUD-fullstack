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
                productsMiddleware.validateNoDuplicateTitles,
                productsController.createProduct
            );

        this.app.param('productId', productsMiddleware.extractProductId);

        this.app
            .route('/products/:productId')
            .get(productsController.getProductByTitle);

        this.app
            .put('/products/:productId', [
                productsMiddleware.validateMandatoryFields,
                productsController.putProduct
            ])

        this.app
            .patch(
                '/products/:productId',
                productsController.patchProduct
            )

        return this.app;
    }
}