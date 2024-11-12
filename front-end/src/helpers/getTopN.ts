export function getTopN<T>(list: T[], n: number): T[] {
    const top = list.slice(0, n);
    return top;
}
