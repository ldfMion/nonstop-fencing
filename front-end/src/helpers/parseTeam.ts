import {Team} from '~/models/FencerSummary';
import assertString from './assertString';

export default function parseTeam(data: any): Team {
    assertString(data);
    switch (data.toLowerCase()) {
        case 'men':
        case 'mens':
        case "men's":
            return Team.MEN;
        case 'women':
        case 'womens':
        case "women's":
            return Team.WOMEN;
        default:
            throw Error(`Error parsing team ${data}`);
    }
}
