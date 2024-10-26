import SingleScore from './single-score';
import type {Match2} from '~/models/Match2';

export default function Scores({match, flip}: {match: Match2; flip: boolean}) {
    return (
        <div className={`flex w-20 flex-col items-stretch gap-1 text-right ${flip && 'flex-col-reverse'}`}>
            <div className="flex flex-row gap-1">
                <SingleScore className="font-bold">{match.overallA}</SingleScore>
                <SingleScore>{match.foilA}</SingleScore>
                <SingleScore>{match.epeeA}</SingleScore>
                <SingleScore>{match.saberA}</SingleScore>
            </div>
            <div className="flex flex-row gap-1">
                <SingleScore className="w-6 font-bold">{match.overallB}</SingleScore>
                <SingleScore>{match.foilB}</SingleScore>
                <SingleScore>{match.epeeB}</SingleScore>
                <SingleScore>{match.saberB}</SingleScore>
            </div>
        </div>
    );
}
