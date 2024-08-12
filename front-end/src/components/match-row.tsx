import TeamIcon from './team-icon';
import {University} from '~/models/University';
import Match from '~/models/Match';
import getUniversity from '~/api/getUniversity';
import Side from './side';

export default async function MatchRow({
    match,
    perspective,
}: {
    match: Match;
    perspective: University;
}) {
    const notPerspective = await getUniversity(
        perspective.id == match.teamAId ? match.teamBId : match.teamAId,
    );
    const win = perspective.id == match.winner;
    // always leave the perspective university on top
    const flip = perspective.id == match.teamBId;
    return <MatchUI2 university={notPerspective} match={match} win={win} flip={flip} />;
}

// items-center px-[16px] py-[8px]
function MatchUI2({
    university,
    match,
    win,
    flip,
}: {
    university: University;
    match: Match;
    win: boolean;
    flip: boolean;
}) {
    return (
        <div className="flex flex-row items-center justify-between px-4 py-2">
            <div className="flex flex-row gap-2">
                <p className="font-bold">vs.</p>
                <Side university={university} />
            </div>
            <div className="flex flex-row items-center gap-3">
                {win ? (
                    <p className="font-extrabold text-green-400">W</p>
                ) : (
                    <p className="font-extrabold text-red-400">L</p>
                )}
                <div
                    className={`flex w-20 flex-col items-stretch gap-1 text-right ${flip && 'flex-col-reverse'}`}
                >
                    <div className="flex flex-row gap-1">
                        <p className="w-6 font-bold">{match.teamAOverall}</p>
                        <p className="w-6">{match.teamAFoil}</p>
                        <p className="w-6">{match.teamAEpee}</p>
                        <p className="w-6">{match.teamASaber}</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <p className="w-6 font-bold">{match.teamBOverall}</p>
                        <p className="w-6">{match.teamBFoil}</p>
                        <p className="w-6">{match.teamBEpee}</p>
                        <p className="w-6">{match.teamBSaber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MatchUI1({
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

function Score({a, b, win}: {a: number; b: number; win: boolean}) {
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
}
