import FencerSummary from '~/models/FencerSummary';

export default function calculatePythagoreanWins(fencer: FencerSummary): number {
    const EXPONENT = 2;
    const wins = fencer.record.wins;
    const winsRaised = Math.pow(wins, EXPONENT);
    const losses = fencer.record.losses;
    const lossesRaised = Math.pow(losses, EXPONENT);
    const value = (winsRaised / (winsRaised + lossesRaised)) * (wins + losses);
    return value;
}
