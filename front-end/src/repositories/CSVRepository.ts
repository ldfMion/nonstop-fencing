import parseCSV from '~/helpers/parseCsv';
import type {Repository} from './Repository';

export abstract class CSVRepository<T extends {id: string}> implements Repository<T> {
    items: T[] | null = null;
    protected filePaths: string[];
    constructor(...filePaths: string[]) {
        this.filePaths = filePaths;
    }
    protected abstract parseRow(row: object): T;
    async findById(id: string): Promise<T> {
        const value = (await this.findAll()).find((item) => item.id === id);
        if (value == undefined) {
            throw new Error(`Item ${id} not found. ${this.constructor.name}`);
        }
        return value;
    }
    async findAll(): Promise<T[]> {
        if (this.items == null) {
            this.items = await this.loadFromCSV();
        }
        return this.items;
    }
    private async loadFromCSV(): Promise<T[]> {
        const parsedLists = await Promise.all(this.filePaths.map((file) => parseCSV(file, (row: object) => this.parseRow(row))));
        return parsedLists.flat();
    }
}
