export interface CRUD {
    list: () => Promise<any>;
    create: (resource: any) => Promise<any>;
    getByTitle: (title: string) => Promise<any>;
    putById: (id: string, resource: any) => Promise<string>;
    patchById: (id: string, resource: any) => Promise<string>;
}