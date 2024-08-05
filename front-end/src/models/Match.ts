export default class Match {
    constructor(
        public teamAId: string,
        public teamAOverall: number,
        public teamAFoil: number,
        public teamAEpee: number,
        public teamASaber: number,
        public teamBId: string,
        public teamBOverall: number,
        public teamBFoil: number,
        public teamBEpee: number,
        public teamBSaber: number,
        public date: Date,
        public hostId: string,
    ) {}
    public hasTeam(universityId: string): boolean {
        return this.teamAId === universityId || this.teamBId === universityId;
    }
    get winner() {
        if (this.teamAOverall > this.teamBOverall) {
            return this.teamAId;
        } else if (this.teamBOverall > this.teamAOverall) {
            return this.teamBId;
        } else {
            throw Error("An NCAA Fencing Match can't be a tie");
        }
    }
}

// Team A,Team A Overall,Team A Foil,Team A Epee,Team A Saber,Team B,Team B Overall,Team B Foil,Team B Epee,Team B Saber,Date,Host
