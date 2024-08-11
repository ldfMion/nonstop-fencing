import Record from './Record';

export default interface FencerSummary {
    universityId: string;
    firstName?: string;
    lastName: string;
    weapon: Weapon;
    team: Team;
    record: Record;
    rating: number;
    fullName: string;
    toObject?: () => FencerSummary;
}

export enum Weapon {
    FOIL,
    EPEE,
    SABER,
}

export enum Team {
    MEN,
    WOMEN,
}

export class FencerSummary1 implements FencerSummary {
    public record;
    constructor(
        public firstName: string,
        public lastName: string,
        public universityId: string,
        public weapon: Weapon,
        public team: Team,
        wins: number,
        losses: number,
        private ratingFn: (record: {wins: number; losses: number}) => number,
    ) {
        this.record = {
            wins: wins,
            losses: losses,
        };
    }
    get rating(): number {
        return this.ratingFn(this.record);
    }
    get fullName() {
        return this.firstName ? this.firstName + ' ' + this.lastName : this.lastName;
    }
    toObject(): FencerSummary {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            universityId: this.universityId,
            weapon: this.weapon,
            team: this.team,
            record: this.record,
            rating: this.rating,
            fullName: this.fullName,
        };
    }
}
