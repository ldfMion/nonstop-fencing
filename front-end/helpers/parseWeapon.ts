import {Weapon} from '~/models/FencerSummary';
import assertString from './assertString';

export default function parseWeapon(data: any): Weapon {
    assertString(data);
    switch (data.toLowerCase()) {
        case 'foil':
            return Weapon.FOIL;
        case 'epee':
            return Weapon.EPEE;
        case 'saber':
            return Weapon.SABER;
        default:
            throw Error(`Error parsing weapon ${data}`);
    }
}
