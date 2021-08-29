import express from 'express';
import productsService from '../services/products.service';

import debug from 'debug';

const log: debug.IDebugger = debug('app:products-controller')

class ProductsMiddleWare {

    async validateMandatoryFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.title && req.body.name) {
            next();
        } else {
            res.status(400).send({
                error: 'Missing mandatory fields title or name.'
            });
        }
    }

    async extractProductId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.productId;
        next();
    }

}

export default new ProductsMiddleWare();