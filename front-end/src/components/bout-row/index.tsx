import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {fencerRepository} from '~/repositories';
import NameIcon from '../name-icon';
import clsx from 'clsx';

export default async function BoutRow({bout, perspective}: {bout: Bout; perspective?: Fencer}) {
    if (perspective !== undefined) {
        throw new Error('Bout with perspective not implemented');
    }
    const fencerA = await fencerRepository.findById(bout.fencerAId);
    const fencerB = await fencerRepository.findById(bout.fencerBId);
    const aWins = bout.scoreA > bout.scoreB;
    return (
        <li className="grid cursor-pointer grid-cols-3 items-center justify-between py-1">
            {fencerA && <NameIcon iconUniversityId={fencerA.universityId} name={fencerA.name} />}
            <div className="text-center">
                <Score score={bout.scoreA} win={aWins} /> <span>-</span> <Score score={bout.scoreB} win={!aWins} />
            </div>
            {fencerB && <NameIcon iconUniversityId={fencerB.universityId} name={fencerB.name} flip />}
        </li>
    );
}

function Score({score, win}: {score: number; win: boolean}) {
    return <span className={clsx(win ? 'text-green-400' : 'text-red-500', 'font-bold')}>{score}</span>;
}
