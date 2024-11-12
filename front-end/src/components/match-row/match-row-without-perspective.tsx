import type {Match2} from '~/models/Match2';
import SingleScore from './single-score';
import Side from './side';
import clsx from 'clsx';
import Link from 'next/link';
import {universityService} from '~/services';

export default async function MatchRowWithoutPerspective({match}: {match: Match2}) {
    const universityA = await universityService.getById(match.teamAId);
    const universityB = await universityService.getById(match.teamBId);
    const topWon = match.overallA > match.overallB;
    return (
        <Link href={`/matches/${match.id}`} legacyBehavior>
            <li className="flex cursor-pointer flex-row items-center justify-between gap-2 rounded-md py-2 transition-all hover:scale-[1.01] hover:bg-accent">
                <div className="flex flex-col gap-1">
                    <Side university={universityA} />
                    <Side university={universityB} />
                </div>
                <div className="flex flex-row gap-1">
                    <div className={clsx('flex flex-col items-center gap-1 text-center', !topWon && 'flex-col-reverse')}>
                        <SingleScore className="font-extrabold text-green-400">W</SingleScore>
                        <SingleScore className="font-extrabold text-red-400">L</SingleScore>
                    </div>
                    <Scores match={match} flip={false} />
                </div>
            </li>
        </Link>
    );
}

function Scores({match, flip}: {match: Match2; flip: boolean}) {
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
