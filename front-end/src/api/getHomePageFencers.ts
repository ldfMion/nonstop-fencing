import FencerSummary, {Team, Weapon} from '~/models/FencerSummary';
import getValuesfromCsv from '../../helpers/getValuesFromCsv';

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
    const data = await getValuesfromCsv();
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

function getTopFive(fencers: FencerSummary[]): FencerSummary[] {
    const top = fencers.slice(0, 5);
    return top;
}
