import Record from './Record';

export type WithRecord<T> = T & {
    record: Record;
    rating: number;
};
