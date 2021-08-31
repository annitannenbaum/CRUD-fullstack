export interface Product {
    id: string,
    title: string,
    name: string,
    description?: string
}

export class Product {
    public constructor(init?: Partial<Product>) {
        Object.assign(this, init)
    }
}