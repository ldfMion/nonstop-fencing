import {Gender} from '~/models/Gender';
import assertString from './assertString';

export default function parseGender(data: any): Gender {
    assertString(data);
    switch (data.toLowerCase()) {
        case 'men':
        case 'mens':
        case "men's":
            return Gender.MEN;
        case 'women':
        case 'womens':
        case "women's":
            return Gender.WOMEN;
        default:
            throw Error(`Error parsing team ${data}`);
    }
}
