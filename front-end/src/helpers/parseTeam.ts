import {Gender} from '~/models/Gender';

export default function parseGender(data: string): Gender {
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
