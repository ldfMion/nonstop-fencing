export interface Repository<T extends {id: string}> {
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}
