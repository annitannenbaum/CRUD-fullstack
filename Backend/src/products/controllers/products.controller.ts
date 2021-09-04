import express from 'express';
import debug from 'debug';

import productsService from '../services/products.service';

const log: debug.IDebugger = debug('app:products-controller');

class ProductsController {

    async listProducts(req: express.Request, res: express.Response) {
        const products = await productsService.list();
        res.status(200).send(products);
    }

    async createProduct(req: express.Request, res: express.Response) {
        const productId = await productsService.create(req.body);
        res.status(201).send({ id: productId });

    }

    async putProduct(req: express.Request, res: express.Response) {
        log(await productsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

}

export default new ProductsController();