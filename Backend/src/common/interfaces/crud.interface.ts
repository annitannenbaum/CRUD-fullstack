export interface CRUD {
    list: () => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<unknown>;
    patchById: (id: string, resource: any) => Promise<unknown>;
}