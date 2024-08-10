import FencerSummary from '~/models/FencerSummary';

export default function calculatePythagoreanWins(record: {wins: number; losses: number}): number {
    const EXPONENT = 2;
    const wins = record.wins;
    const winsRaised = Math.pow(wins, EXPONENT);
    const losses = record.losses;
    const lossesRaised = Math.pow(losses, EXPONENT);
    const value = (winsRaised / (winsRaised + lossesRaised)) * (wins + losses / 2);
    return value;
}
