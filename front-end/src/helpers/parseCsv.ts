import path from 'path';
import csv from 'csv-parser';
import fs from 'fs';

export default async function parseCSV<T>(filePath: string, parseRow: (row: object) => T): Promise<T[]> {
    const results: object[] = [];
    const csvFilePath = path.join(process.cwd(), filePath);
    const formattedResults: Promise<T[]> = new Promise<T[]>((resolve) =>
        fs
            .createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data: object) => results.push(data))
            .on('end', () => {
                const formattedResults: T[] = results.map(parseRow);
                resolve(formattedResults);
            }),
    );
    return formattedResults;
    // const formattedResult: FencerSummary[] = results.map(result => {
    //     if(typeof result !== 'object' || result == null){
    //         throw new Error()
    //     }
    //     if(!('First name' in result && typeof result['First name'] === 'string' && result['First name'] !== '')){
    //         throw new Error()
    //     }
    //     if(!('Last name' in result && typeof result['Last name'] == 'string')){
    //         throw new Error()
    //     }
    //     if()
    // })
}
