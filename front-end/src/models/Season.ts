export interface ISeason {
    startYear: number;
    endYear: number;
    displayNameLong: string;
    displayNameShort: string;
}

export class Season implements ISeason {
    displayNameLong: string;
    displayNameShort: string;
    startYear: number;
    constructor(public endYear: number) {
        this.startYear = endYear - 1;
        this.displayNameLong = `${this.startYear}-${endYear}`;
        this.displayNameShort = `${this.startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
    }
}
