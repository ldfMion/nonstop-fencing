import FencerSummary, {Team, Weapon} from '~/models/FencerSummary';
import getRecordsFromCsv from '../../helpers/getRecordsFromCsv';
import getTopFive from 'helpers/getTop5';

export default async function getHomePageFencers(): Promise<{
    mens: {
        foil: FencerSummary[];
        epee: FencerSummary[];
        saber: FencerSummary[];
    };
    womens: {
        foil: FencerSummary[];
        epee: FencerSummary[];
        saber: FencerSummary[];
    };
}> {
    const data = await getRecordsFromCsv();
    return {
        mens: {
            foil: getTopFive(
                data.filter((fencer) => fencer.team === Team.MEN && fencer.weapon === Weapon.FOIL),
            ),
            epee: getTopFive(
                data.filter((fencer) => fencer.team === Team.MEN && fencer.weapon === Weapon.EPEE),
            ),
            saber: getTopFive(
                data.filter((fencer) => fencer.team === Team.MEN && fencer.weapon === Weapon.SABER),
            ),
        },
        womens: {
            foil: getTopFive(
                data.filter(
                    (fencer) => fencer.team === Team.WOMEN && fencer.weapon === Weapon.FOIL,
                ),
            ),
            epee: getTopFive(
                data.filter(
                    (fencer) => fencer.team === Team.WOMEN && fencer.weapon === Weapon.EPEE,
                ),
            ),
            saber: getTopFive(
                data.filter(
                    (fencer) => fencer.team === Team.WOMEN && fencer.weapon === Weapon.SABER,
                ),
            ),
        },
    };
}
