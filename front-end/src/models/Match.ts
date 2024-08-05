export default class Match {
    constructor(
        public teamAId: string,
        public teamAOverall: string,
        public teamAFoil: string,
        public teamAEpee: string,
        public teamASaber: string,
        public teamBId: string,
        public teamBOverall: number,
        public teamBFoil: number,
        public teamBEpee: string,
        public teamBSaber: string,
        public date: Date,
        public hostId: string,
    ) {}
    public hasTeam(universityId: string): boolean {
        return this.teamAId === universityId || this.teamBId === universityId;
    }
}

// Team A,Team A Overall,Team A Foil,Team A Epee,Team A Saber,Team B,Team B Overall,Team B Foil,Team B Epee,Team B Saber,Date,Host
