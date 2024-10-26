'use client';
import parseGender from '~/helpers/parseTeam';
import FilteredFencerTable from './filtered-fencer-table';
import parseWeapon from '~/helpers/parseWeapon';
import type {HasRecord} from '~/models/HasRecord';
import type {Fencer} from '~/models/Fencer';

export default function FilteredFencersByWeaponAndGender({fencers}: {fencers: (Fencer & HasRecord)[]}): JSX.Element {
    const weaponOptions = ['All', 'Foil', 'Epee', 'Saber'];
    const genderOptions = ['All', "Men's", "Women's"];
    const options = [
        {
            labels: weaponOptions,
            filterFunction: filterByWeapon,
        },
        {
            labels: genderOptions,
            filterFunction: filterByGender,
        },
    ];

    return <FilteredFencerTable fencers={fencers} options={options} />;
}

function filterByWeapon(fencers: (Fencer & HasRecord)[], value: string): (Fencer & HasRecord)[] {
    if (value !== 'All') {
        const weapon = parseWeapon(value);
        return fencers.filter((fencer) => fencer.weapon === weapon);
    }
    return fencers;
}

function filterByGender(fencers: (Fencer & HasRecord)[], value: string): (Fencer & HasRecord)[] {
    if (value !== 'All') {
        const gender = parseGender(value);
        return fencers.filter((fencer) => fencer.gender === gender);
    }
    return fencers;
}
