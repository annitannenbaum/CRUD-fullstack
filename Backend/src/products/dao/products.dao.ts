import { CreateProductDto } from "../dto/create.product.dto";
import { PutProductDto } from "../dto/put.product.dto";
import { PatchProductDto } from "../dto/patch.product.dto";

import { v4 as uuidv4 } from 'uuid';

import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class ProductsDao {
    products: CreateProductDto[] = [];

    constructor() {
        log('Created new instance of ProductsDao');
    }

    async addProduct(product: CreateProductDto) {
        product.id = uuidv4();
        this.products.push(product);
        
        return product.id;
    }

    async getProducts() {
        return this.products;
    }

    async getProductByTitle(productTitle: string) {
        let existingTitle = this.products.find((product: { title: string}) => product.title === productTitle);
        return existingTitle;
    }

    async putProductById(productId: string, product: PutProductDto) {
        const objIndex = this.products.findIndex(
            (obj: { id: string}) => obj.id === productId
        );

        this.products.splice(objIndex, 1, product)

        return `${product.id} updated via put.`;
    }

    async patchProductById(productId: string, product: PatchProductDto) {
        const objIndex = this.products.findIndex(
            (obj: { id: string }) => obj.id === productId
        );

        let currentProduct = this.products[objIndex];

        const allowedPatchFields = [
            'title',
            'name',
            'description'
        ];

        for (let field of allowedPatchFields) {
            if (field in product) {
                // @ts-ignore
                currentProduct[field] = product[field];
            }
        }

        this.products.splice(objIndex, 1, currentProduct);

        return `${product.id} was patched.`;
    }
}

export default new ProductsDao();