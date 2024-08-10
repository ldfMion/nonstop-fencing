export interface University {
    id: string;
    displayNameShort: string;
    displayNameLong: string;
    region: string;
    colorTheme: string | null;
}

export interface UniversityWithRecord extends University {
    record: {
        wins: number;
        losses: number;
    };
}

export class University1 {
    constructor(
        public id: string,
        public displayNameShort: string,
        public displayNameLong: string,
        public region: string,
        public colorTheme: string | null,
    ) {}
}
