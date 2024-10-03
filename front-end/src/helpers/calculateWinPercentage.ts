import Record from '~/models/Record';
export default function calculateWinPercentage(record: Record): number {
    return record.wins / (record.wins + record.losses);
}
