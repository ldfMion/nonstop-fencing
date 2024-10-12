import parseTeam from '~/helpers/parseTeam';
import {Match2} from '~/models/Match2';
import {MatchRepository} from './MatchRepository';
import {CSVRepository} from './CSVRepository';
import {Gender} from '~/models/Gender';
import {University2} from '~/models/University2';
import {Weapon} from '~/models/Weapon';
import {Season} from '~/models/Season';

export class CSVMatchRepository extends CSVRepository<Match2> implements MatchRepository {
    constructor(csvFilePath: string) {
        super(csvFilePath);
    }
    protected parseRow(row: unknown): Match2 {
        return new MatchFromCSV(row);
    }
    async findByMeetId(id: string): Promise<Match2[]> {
        return (await this.findAll()).filter((match) => match.meetId === id);
    }
}

class MatchFromCSV implements Match2 {
    id: string;
    teamAId: string;
    teamBId: string;
    overallA: number;
    overallB: number;
    foilA: number;
    foilB: number;
    epeeA: number;
    epeeB: number;
    saberA: number;
    saberB: number;
    hostId: string;
    meetId: string;
    gender: Gender;
    seasonId: string;
    constructor(row: unknown) {
        const anyRow = row as any;
        this.id = anyRow['id'];
        this.teamAId = anyRow['team_a_id'];
        this.teamBId = anyRow['team_b_id'];
        this.overallA = parseInt(anyRow['overall_a']);
        this.overallB = parseInt(anyRow['overall_b']);
        this.foilA = parseInt(anyRow['foil_a']);
        this.foilB = parseInt(anyRow['foil_b']);
        this.epeeA = parseInt(anyRow['epee_a']);
        this.epeeB = parseInt(anyRow['epee_b']);
        this.saberA = parseInt(anyRow['saber_a']);
        this.saberB = parseInt(anyRow['saber_b']);
        this.meetId = anyRow['meet_id'];
        this.hostId = anyRow['host_id'];
        this.gender = parseTeam(anyRow['gender']);
        this.seasonId = new Season(2025).id;
    }
    getWinnerId(weapon?: Weapon): string {
        if (weapon == undefined) {
            return this.overallA > this.overallB ? this.teamAId : this.teamBId;
        }
        if (weapon === Weapon.FOIL) {
            return this.foilA > this.foilB ? this.teamAId : this.teamBId;
        }
        if (weapon === Weapon.EPEE) {
            return this.epeeA > this.epeeB ? this.teamAId : this.teamBId;
        }
        if (weapon === Weapon.SABER) {
            return this.saberA > this.saberB ? this.teamAId : this.teamBId;
        }
        throw new Error(`Invalid weapon ${weapon}`);
    }
    private includes(university: University2): boolean {
        return this.teamAId === university.id || this.teamBId === university.id;
    }
    isWinner(university: University2, weapon?: Weapon): boolean {
        return this.getWinnerId(weapon) === university.id;
    }
    isLoser(university: University2, weapon?: Weapon): boolean {
        return this.includes(university) && !this.isWinner(university, weapon);
    }
}
