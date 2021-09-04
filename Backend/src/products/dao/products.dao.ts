import { CreateProductDto } from "../dto/create.product.dto";
import { PutProductDto } from "../dto/put.product.dto";
import mongooseService from "../../common/services/mongoose.service";

import { v4 as uuid } from 'uuid';

import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class ProductsDao {

    Schema = mongooseService.getMongoose().Schema;

    productSchema = new this.Schema({
        _id: String,
        title: String,
        name: String,
        description: String
    })

    Product = mongooseService.getMongoose().model('Products', this.productSchema);

    constructor() {
        log('Created new instance of ProductsDao');
    }

    async addProduct(productFields: CreateProductDto) {
        const productId = uuid();

        const product = new this.Product({
            _id: productId,
            ...productFields
        });

        await product.save();

        return productId;
    }

    async getProductById(productId: string) {
        return this.Product.findOne({ _id: productId }).populate('Product').exec();
    }

    async getProducts() {
        return this.Product.find()
        .exec();
    }

    async updateProductById(
        productId: string,
        productFields: PutProductDto
        ) {
            const existingProduct = await this.Product.findOneAndUpdate(
                { _id: productId },
                { $set: productFields },
                { new: true }
            ).exec();

            return existingProduct;
    }
}

export default new ProductsDao();