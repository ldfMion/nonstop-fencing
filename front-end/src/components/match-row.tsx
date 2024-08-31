import type {University} from '~/models/University';
import type Match from '~/models/Match';
import getUniversity from '~/api/getUniversity';
import NameIcon from './name-icon';
import {HTMLAttributes} from 'react';
import {clsx} from 'clsx';
import Link from 'next/link';

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
        <li className="flex flex-row items-center justify-between gap-10 py-1">
            <div className="flex flex-row gap-2">
                <p className="font-bold">vs.</p>
                <Side university={university} />
            </div>
            <div className="flex flex-row items-center gap-3 text-center">
                {win ? (
                    <SingleScore className="font-extrabold text-green-400">W</SingleScore>
                ) : (
                    <SingleScore className="font-extrabold text-red-400">L</SingleScore>
                )}
                <div
                    className={`flex w-20 flex-col items-stretch gap-1 text-right ${flip && 'flex-col-reverse'}`}
                >
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
            </div>
        </li>
    );
}

function SingleScore({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
} & HTMLAttributes<HTMLParagraphElement>): JSX.Element {
    return <p className={clsx('w-6', className)}>{children}</p>;
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

function Side({university, flip}: {university: University; flip?: boolean}): React.ReactNode {
    return (
        <NameIcon
            iconUniversityId={university.id}
            name={university.displayNameShort}
            flip={flip}
            className="text-lg"
            href={`/mens/universities/${university.id}`}
        />
    );
}

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
