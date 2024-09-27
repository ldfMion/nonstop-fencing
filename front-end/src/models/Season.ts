export interface ISeason {
    startYear: number;
    endYear: number;
    displayNameLong: string;
    displayNameShort: string;
}

export class Season implements ISeason {
    displayNameLong: string;
    displayNameShort: string;
    constructor(
        public startYear: number,
        public endYear: number,
    ) {
        this.displayNameLong = `${startYear}-${endYear}`;
        this.displayNameShort = `${startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
    }
}
