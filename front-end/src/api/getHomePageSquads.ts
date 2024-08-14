import {Team, Weapon} from '~/models/FencerSummary';
import getTopFive from 'helpers/getTop5';
import getTeams from './getTeams';
import {Squad} from '~/models/Squad';
import {University} from '~/models/University';
import Record from '~/models/Record';
import {ITeam} from '~/models/Team';
import calculatePythagoreanWins from 'helpers/calculatePythagoreanWins';

export default async function getHomePageSquads(): Promise<{
    mens: {
        foil: Squad[];
        epee: Squad[];
        saber: Squad[];
    };
    womens: {
        foil: Squad[];
        epee: Squad[];
        saber: Squad[];
    };
}> {
    const mensTeams = await getTeams(Team.MEN);
    const womensTeams = await getTeams(Team.WOMEN);
    return {
        mens: {
            foil: getSquadsFromTeams(mensTeams, Weapon.FOIL),
            epee: getSquadsFromTeams(mensTeams, Weapon.EPEE),
            saber: getSquadsFromTeams(mensTeams, Weapon.SABER),
        },
        womens: {
            foil: getSquadsFromTeams(womensTeams, Weapon.FOIL),
            epee: getSquadsFromTeams(womensTeams, Weapon.EPEE),
            saber: getSquadsFromTeams(womensTeams, Weapon.SABER),
        },
    };
}

class SquadFromUniversity implements Squad {
    rating: number;
    constructor(
        public university: University,
        public record: Record,
        private ratingFn: (record: Record) => number,
    ) {
        this.rating = ratingFn(record);
    }
}

function getSquadsFromTeams(teams: ITeam[], weapon: Weapon): Squad[] {
    return getTopFive(
        teams.map((team) => {
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
            return new SquadFromUniversity(team.university, squadRecord, calculatePythagoreanWins);
        }),
    );
}
