import type {ITeam} from '~/models/Team';
import getTopFive from './getTop5';
import type {Squad} from '~/models/Squad';
import type Record from '~/models/Record';
import type {University} from '~/models/University';
import calculateWinPercentage from './calculateWinPercentage';
import {Weapon} from '~/models/Weapon';

export default function getSquadsFromTeams(teams: ITeam[], weapon: Weapon): Squad[] {
    return teams
        .map((team) => {
            let squadRecord: Record;
            switch (weapon) {
                case Weapon.FOIL:
                    squadRecord = team.foil;
                    break;
                case Weapon.EPEE:
                    squadRecord = team.epee;
                    break;
                case Weapon.SABER:
                    squadRecord = team.saber;
                    break;
                default:
                    throw Error(`Problem with getting squad in team ${team} for weapon ${weapon}`);
            }
            return new SquadFromTeam(team.university, squadRecord, calculateWinPercentage);
        })
        .sort((a, b) => b.rating - a.rating);
}
class SquadFromTeam implements Squad {
    rating: number;
    constructor(
        public university: University,
        public record: Record,
        private ratingFn: (record: Record) => number,
    ) {
        this.rating = ratingFn(record);
    }
}
