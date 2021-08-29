import productsDao from "../dao/products.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateProductDto } from "../dto/create.product.dto";
import { PutProductDto } from "../dto/put.product.dto";
import { PatchProductDto } from "../dto/patch.product.dto";

class ProductsService implements CRUD {

    async list() {
        return productsDao.getProducts();
    }

    async create(resource: CreateProductDto) {
        return productsDao.addProduct(resource);
    }

    async putById(id: string, resource: PutProductDto) {
        return productsDao.updateProductById(id, resource)
    }

    async patchById(id: string, resource: PatchProductDto) {
        return productsDao.updateProductById(id, resource)
    }
}

export default new ProductsService();