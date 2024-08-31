export default function assertString(object: any): asserts object is string {
    if (typeof object !== 'string') {
        throw new Error(`Expected ${JSON.stringify(object)} to be a string.`);
    }
}
