export interface University {
    id: string;
    displayNameShort: string;
    displayNameLong: string;
    region: string;
    colorTheme: string | null;
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
