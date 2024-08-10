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
    const universityA = await getUniversity(match.teamAId);
    const universityB = await getUniversity(match.teamBId);
    const win = perspective.id == match.winner;
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
