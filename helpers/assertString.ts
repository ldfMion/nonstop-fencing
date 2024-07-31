export default function assertString(object: any): asserts object is string {
    if (typeof object !== 'string') {
        throw new Error();
    }
}
