import type {Bout} from '~/models/Bout';
import type {Fencer} from '~/models/Fencer';
import clsx from 'clsx';
import {Fragment} from 'react';
import {fencerService} from '~/services';

export default async function BoutRow({bout, perspective}: {bout: Bout; perspective?: Fencer}) {
    if (perspective !== undefined) {
        throw new Error('Bout with perspective not implemented');
    }
    let fencerA: Fencer | null = null;
    if (bout.fencerAId) {
        fencerA = await fencerService.getById(bout.fencerAId);
    }
    let fencerB: Fencer | null = null;
    if (bout.fencerBId) {
        fencerB = await fencerService.getById(bout.fencerBId);
    }
    return (
        <li className="bout-grid py-2">
            {fencerA ? <p className="font-medium">{fencerA.name}</p> : <div></div>}
            <div className="w-fit text-nowrap text-center align-middle">
                {!bout.isNotBye() ? (
                    'BYE'
                ) : (
                    <Fragment>
                        <Score score={bout.score.a} win={bout.winnerId === bout.fencerAId} /> <span>-</span>{' '}
                        <Score score={bout.score.b} win={bout.winnerId === bout.fencerBId} />
                    </Fragment>
                )}
            </div>
            {fencerB ? <p className="text-right font-medium">{fencerB.name}</p> : <div></div>}
        </li>
    );
}

function Score({score, win}: {score: number; win: boolean}) {
    return <span className={clsx(win ? 'text-green-400' : 'text-red-500', 'font-bold')}>{score}</span>;
}
