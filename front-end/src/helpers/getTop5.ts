export default function getTopFive<T>(list: T[]): T[] {
    const top = list.slice(0, 5);
    return top;
}
