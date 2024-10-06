import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {fencerRepository} from '~/repositories';
import NameIcon from '../name-icon';
import clsx from 'clsx';
import {Fragment} from 'react';

export default async function BoutRow({bout, perspective}: {bout: Bout; perspective?: Fencer}) {
    if (perspective !== undefined) {
        throw new Error('Bout with perspective not implemented');
    }
    const fencerA = await fencerRepository.findById(bout.fencerAId);
    const fencerB = await fencerRepository.findById(bout.fencerBId);
    const aWins = bout.scoreA > bout.scoreB;
    return (
        <li className="bout-grid py-1">
            {fencerA && <NameIcon iconUniversityId={fencerA.universityId} name={fencerA.name} />}
            <div className="w-fit text-nowrap text-center align-middle">
                {bout.isBye() ? (
                    'BYE'
                ) : (
                    <Fragment>
                        <Score score={bout.scoreA} win={aWins} /> <span>-</span> <Score score={bout.scoreB} win={!aWins} />
                    </Fragment>
                )}
            </div>
            {fencerB && <NameIcon iconUniversityId={fencerB.universityId} name={fencerB.name} flip />}
        </li>
    );
}

function Score({score, win}: {score: number; win: boolean}) {
    return <span className={clsx(win ? 'text-green-400' : 'text-red-500', 'font-bold')}>{score}</span>;
}
