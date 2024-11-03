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
        <BoutWrapper>
            {fencerA ? <p className="font-medium">{fencerA.name}</p> : <div></div>}
            <div className="w-fit text-nowrap text-center align-middle">{!bout.isCompleted() ? 'BYE' : <Scores bout={bout} />}</div>
            {fencerB ? <p className="text-right font-medium">{fencerB.name}</p> : <div></div>}
        </BoutWrapper>
    );
}

function BoutWrapper({children}: {children: React.ReactNode}) {
    return <li className="bout-grid py-2">{children}</li>;
}

function Scores({bout}: {bout: Bout}): JSX.Element {
    return (
        <Fragment>
            <Score score={bout.hasScore() ? bout.score.a : undefined} win={bout.winnerId === bout.fencerAId} /> <span>-</span>{' '}
            <Score score={bout.hasScore() ? bout.score.b : undefined} win={bout.winnerId === bout.fencerBId} />
        </Fragment>
    );
}

function Score({score, win}: {score?: number; win: boolean}) {
    return <span className={clsx(win ? 'text-green-400' : 'text-red-500', 'font-bold')}>{score ?? (win ? 'W' : 'L')}</span>;
}
