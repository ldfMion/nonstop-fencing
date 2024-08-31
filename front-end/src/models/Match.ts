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
        return this.getWinner(this.teamAOverall, this.teamBOverall);
    }
    get foilWinner() {
        return this.getWinner(this.teamAFoil, this.teamBFoil);
    }
    get epeeWinner() {
        return this.getWinner(this.teamAEpee, this.teamBEpee);
    }
    get saberWinner() {
        return this.getWinner(this.teamASaber, this.teamBSaber);
    }
    private getWinner(teamAPartial: number, teamBPartial: number): string | null {
        if (teamAPartial > teamBPartial) {
            return this.teamAId;
        }
        if (teamBPartial > teamAPartial) {
            return this.teamBId;
        }
        // console.log(
        //     `An NCAA Fencing Match can't be a tie. Match: ${this.teamAId}(${teamAPartial}) vs (${teamBPartial})${this.teamBId}`,
        // );
        return null;
    }
}

// Team A,Team A Overall,Team A Foil,Team A Epee,Team A Saber,Team B,Team B Overall,Team B Foil,Team B Epee,Team B Saber,Date,Host
