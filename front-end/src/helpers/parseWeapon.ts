import {Weapon} from '~/models/Weapon';

export default function parseWeapon(data: string): Weapon {
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
