export interface Product {
    _id: string,
    title: string,
    name: string,
    description?: string
}

// constructor to build new Product object when creating a new Product

export class Product {
    public constructor(init?: Partial<Product>) {
        Object.assign(this, init)
    }
}