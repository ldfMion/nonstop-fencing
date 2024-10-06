import parseCSV from '~/helpers/parseCsv';
import {Repository} from './Repository';

export abstract class CSVRepository<T extends {id: string}> implements Repository<T> {
    items: T[] | null = null;
    protected filePath: string;
    constructor(filePath: string) {
        this.filePath = filePath;
    }
    protected abstract parseRow(row: unknown): T;
    async findById(id: string): Promise<T> {
        const value = (await this.findAll()).find((item) => item.id === id);
        if (value == undefined) {
            throw new Error(`Item ${id} not found.`);
        }
        return value;
    }
    async findAll(): Promise<T[]> {
        if (this.items == null) {
            this.items = await this.loadFromCSV();
            return this.items;
        }
        return this.items;
    }
    private async loadFromCSV(): Promise<T[]> {
        return await parseCSV(this.filePath, this.parseRow);
    }
}
