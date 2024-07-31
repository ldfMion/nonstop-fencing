import {Team} from '~/models/FencerSummary';
import assertString from './assertString';

export default function parseTeam(data: any): Team {
    assertString(data);
    switch (data.toLowerCase()) {
        case 'men':
        case 'mens':
            return Team.MEN;
        case 'women':
        case 'womens':
            return Team.WOMEN;
        default:
            throw Error(`Error parsing team ${data}`);
    }
}
