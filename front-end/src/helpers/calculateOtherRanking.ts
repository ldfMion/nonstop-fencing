import type Record from '~/models/Record';

export default function calculatePythagoreanWins(record: Record): number {
    const wins = record.wins;
    const losses = record.losses;
    const value = wins * (wins - losses);
    return value;
}
