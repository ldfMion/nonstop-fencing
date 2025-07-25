import Side from './side';
import Scores from './scores';
import SingleScore from './single-score';
import type {University2} from '~/models/University2';
import type {Match2} from '~/models/Match2';
import {universityService} from '~/services';
import ConditionalLinkWrapper from '../conditional-link-wrapper';

export default async function MatchRowWithPerspective({match, perspective}: {match: Match2; perspective: University2}) {
    const notPerspective = await universityService.getById(perspective.id == match.teamAId ? match.teamBId : match.teamAId);
    const win = match.isWinner(perspective);
    // always leave the perspective university on top
    const flip = perspective.id == match.teamBId;
    return <MatchUI2 university={notPerspective} match={match} win={win} flip={flip} />;
}

// items-center px-[16px] py-[8px]
function MatchUI2({university, match, win, flip}: {university: University2; match: Match2; win: boolean; flip: boolean}) {
    return (
        <ConditionalLinkWrapper
            href={match.id != '' ? `/matches/${match.id}` : undefined}
            className="rounded-md transition-all hover:scale-[1.01] hover:bg-accent"
        >
            <li className="flex flex-row items-center justify-between gap-10 rounded-md py-1">
                <div className="flex flex-row items-center gap-2">
                    <p className="md:text-md text-sm font-bold">vs.</p>
                    <Side university={university} />
                </div>
                <div className="flex flex-row items-center gap-3 text-center">
                    {win ? (
                        <SingleScore className="font-extrabold text-green-400">W</SingleScore>
                    ) : (
                        <SingleScore className="font-extrabold text-red-400">L</SingleScore>
                    )}
                    <Scores match={match} flip={flip} />
                </div>
            </li>
        </ConditionalLinkWrapper>
    );
}

/* function Score({a, b, win}: {a: number; b: number; win: boolean}) {
    const color = win ? 'bg-green-400' : 'bg-red-400';
    return (
        <div
            className={`flex items-center justify-center text-nowrap rounded-md font-semibold leading-none text-white ${color} p-1`}
        >
            <span className="flex w-5 items-center justify-center">{a}</span>
            <span className="flex w-5 items-center justify-center">-</span>
            <span className="flex w-5 items-center justify-center">{b}</span>
        </div>
    );
} */

/* function MatchUI1({
    universityA,
    universityB,
    match,
    win,
}: {
    universityA: University;
    universityB: University;
    match: Match;
    win: boolean;
}) {
    return (
        <div className="flex flex-row items-center px-[16px] py-[8px]">
            <Side university={universityA} />
            <Score a={match.teamAOverall} b={match.teamBOverall} win={win} />
            <Side university={universityB} flip />
        </div>
    );
}
 */
