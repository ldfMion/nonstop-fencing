import {getTopN} from './getTopN';

export default function getTopFive<T>(list: T[]): T[] {
    return getTopN(list, 5);
}
