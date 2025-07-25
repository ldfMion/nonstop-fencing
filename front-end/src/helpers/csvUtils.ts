import assert from 'assert';

export function parseRowTextProperty(name: string, row: object): string {
    if (!(name in row)) {
        throw new Error(`Property ${name} not found in row ${JSON.stringify(row)}`);
    }
    const value = (row as Record<string, unknown>)[name];
    if (typeof value !== 'string') {
        throw new Error(`Property ${name} is not of type string in row ${JSON.stringify(row)}`);
    }
    if (value == '') {
        throw new Error(`Property ${name} is empty in row ${JSON.stringify(row)}`);
    }
    return value;
}

export function parseOptionalRowTextProperty(name: string, row: object): string | undefined {
    if (name in row) {
        const value = (row as Record<string, unknown>)[name];
        assert(typeof value === 'string');
        if (value == '') return undefined;
        return value;
    }
    return undefined;
}

export function parseOptionalRowNumberProperty(name: string, row: object): number | undefined {
    if (name in row) {
        const value = (row as Record<string, unknown>)[name];
        assert(typeof value === 'string');
        if (value == '') return undefined;
        const n = parseInt(value);
        return n;
    }
    return undefined;
}

export function parseRowNumberProperty(name: string, row: object): number {
    if (name in row) {
        const value = (row as Record<string, unknown>)[name];
        assert(typeof value === 'string');
        assert(value !== '');
        const n = parseInt(value);
        return n;
    }
    throw new Error(`Property ${name} not found in row ${JSON.stringify(row)}`);
}
