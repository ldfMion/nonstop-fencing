import FencerSummary, {FencerSummary1, Team, Weapon} from '~/models/FencerSummary';
import fs from 'fs';
import csv from 'csv-parser';
import * as path from 'path';
import parseWeapon from 'helpers/parseWeapon';
import parseTeam from 'helpers/parseTeam';

export default async function getValuesfromCsv(): Promise<FencerSummary[]> {
    const results: any[] = [];
    const csvFilePath = path.join(process.cwd(), 'data', 'records.csv');
    let formattedResults: Promise<FencerSummary[]> = new Promise((resolve, reject) =>
        fs
            .createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const formattedResults: FencerSummary[] = results
                    .map(parseRow)
                    .sort((a, b) => b.rating - a.rating);
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

function parseRow(row: any): FencerSummary {
    return new FencerSummary1(
        row['First name'] === '' ? undefined : row['First name'],
        row['Last name'],
        (row['University '] as string).toLowerCase().replace(' ', ''),
        parseWeapon(row['Weapon']),
        parseTeam(row['Team']),
        parseInt(row['Wins']),
        parseInt(row['Losses']),
        calculatePythagoreanWins,
    );
}

function calculatePythagoreanWins(fencer: FencerSummary): number {
    const EXPONENT = 2;
    const wins = fencer.record.wins;
    const winsRaised = Math.pow(wins, EXPONENT);
    const losses = fencer.record.losses;
    const lossesRaised = Math.pow(losses, EXPONENT);
    const value = (winsRaised / (winsRaised + lossesRaised)) * (wins + losses);
    return value;
}
