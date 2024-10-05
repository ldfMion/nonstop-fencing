import Match from '~/models/Match';
import SingleScore from './single-score';

export default function Scores({match, flip}: {match: Match; flip: boolean}) {
    return (
        <div className={`flex w-20 flex-col items-stretch gap-1 text-right ${flip && 'flex-col-reverse'}`}>
            <div className="flex flex-row gap-1">
                <SingleScore className="font-bold">{match.teamAOverall}</SingleScore>
                <SingleScore>{match.teamAFoil}</SingleScore>
                <SingleScore>{match.teamAEpee}</SingleScore>
                <SingleScore>{match.teamASaber}</SingleScore>
            </div>
            <div className="flex flex-row gap-1">
                <SingleScore className="w-6 font-bold">{match.teamBOverall}</SingleScore>
                <SingleScore>{match.teamBFoil}</SingleScore>
                <SingleScore>{match.teamBEpee}</SingleScore>
                <SingleScore>{match.teamBSaber}</SingleScore>
            </div>
        </div>
    );
}
