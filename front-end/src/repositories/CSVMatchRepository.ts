import parseTeam from '~/helpers/parseTeam';
import type {Match2} from '~/models/Match2';
import type {MatchRepository} from './MatchRepository';
import {CSVRepository} from './CSVRepository';
import type {Gender} from '~/models/Gender';
import type {University2} from '~/models/University2';
import {Weapon} from '~/models/Weapon';
import {Season} from '~/models/Season';
import {parseOptionalRowTextProperty, parseRowTextProperty} from '~/helpers/csvUtils';

export class CSVMatchRepository extends CSVRepository<Match2> implements MatchRepository {
    constructor(...csvFilePaths: string[]) {
        super(...csvFilePaths);
    }
    protected parseRow(row: object): Match2 {
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
    hostId: string | undefined;
    meetId: string | undefined;
    gender: Gender;
    seasonId: string;
    dateFallback?: Date;
    constructor(row: object) {
        if ('id' in row && typeof row.id == 'string') {
            this.id = row.id;
        } else {
            this.id = '';
        }
        this.teamAId = parseRowTextProperty('team_a_id', row);
        this.teamBId = parseRowTextProperty('team_b_id', row);
        this.overallA = parseInt(parseRowTextProperty('overall_a', row));
        this.overallB = parseInt(parseRowTextProperty('overall_b', row));
        this.foilA = parseInt(parseRowTextProperty('foil_a', row));
        this.foilB = parseInt(parseRowTextProperty('foil_b', row));
        this.epeeA = parseInt(parseRowTextProperty('epee_a', row));
        this.epeeB = parseInt(parseRowTextProperty('epee_b', row));
        this.saberA = parseInt(parseRowTextProperty('saber_a', row));
        this.saberB = parseInt(parseRowTextProperty('saber_b', row));
        this.meetId = parseOptionalRowTextProperty('meet_id', row);
        this.hostId = parseOptionalRowTextProperty('host_id', row);
        this.gender = parseTeam(parseRowTextProperty('gender', row));
        this.seasonId = new Season(parseInt(parseRowTextProperty('season', row))).id;
        if ('date' in row && row.date != '') {
            this.dateFallback = new Date(parseRowTextProperty('date', row));
        }
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
        return this.saberA > this.saberB ? this.teamAId : this.teamBId;
    }
    includes(university: University2): boolean {
        return this.teamAId === university.id || this.teamBId === university.id;
    }
    isWinner(university: University2, weapon?: Weapon): boolean {
        return this.getWinnerId(weapon) === university.id;
    }
    isLoser(university: University2, weapon?: Weapon): boolean {
        return this.includes(university) && !this.isWinner(university, weapon);
    }
}
