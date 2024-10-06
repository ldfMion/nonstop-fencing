import clsx from 'clsx';
import {List} from 'lucide-react';
import {Fragment} from 'react';
import getUniversity from '~/api/getUniversity';
import BoutRow from '~/components/bout-row/index';
import FilteredFencersByWeapon from '~/components/filtered-fencer-table-by-weapon';
import ListCard from '~/components/list-card';
import PageHeading from '~/components/page-heading';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {Weapon} from '~/models/Weapon';
import {boutRepository, matchRepository} from '~/repositories';
import {fencerService} from '~/services';

export default async function MatchPage({params}: {params: {id: string}}) {
    const matchData = await matchRepository.findById(params.id);
    if (!matchData) return <p>Match not found</p>;

    const bouts = await boutRepository.findByMatchId(params.id);
    const foil = bouts.filter((bout) => bout.weapon === Weapon.FOIL);
    const epee = bouts.filter((bout) => bout.weapon === Weapon.EPEE);
    const saber = bouts.filter((bout) => bout.weapon === Weapon.SABER);
    const universityA = await getUniversity(matchData.teamAId);
    const universityB = await getUniversity(matchData.teamBId);
    const fencers = calculateMatchRecords(await fencerService.getFromMatch(params.id), bouts);
    console.log(fencers);
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <Card className="flex flex-col p-6">
                <div className="flex flex-row items-center justify-center gap-5">
                    <div className="flex flex-row items-center gap-8">
                        <h2 className="text-3xl font-bold">{universityA.displayNameShort}</h2>
                        <TeamIcon universityId={universityA.id} className="h-14 w-14 md:h-20 md:w-20" />
                    </div>
                    {/* <div className="grid grid-cols-3 gap-1 text-5xl font-extrabold [&>*]:text-center"> */}
                    <div className="text-5xl font-extrabold">
                        <span>{matchData.overallA}</span>
                        <span>-</span>
                        <span>{matchData.overallB}</span>
                    </div>
                    <div className="flex flex-row items-center gap-8">
                        <TeamIcon universityId={universityB.id} className="h-14 w-14 md:h-20 md:w-20" />
                        <h2 className="text-3xl font-bold">{universityB.displayNameShort}</h2>
                    </div>
                </div>
            </Card>
            <div className="hidden flex-col gap-5 md:flex md:flex-row md:items-start [&>*]:grow">
                <div className="flex flex-col gap-2">
                    <PageHeading>Bouts</PageHeading>
                    <WeaponResults title="Foil" scoreA={matchData.foilA} scoreB={matchData.foilB} bouts={foil} />
                    <WeaponResults title="Epee" scoreA={matchData.epeeA} scoreB={matchData.epeeB} bouts={epee} />
                    <WeaponResults title="Saber" scoreA={matchData.saberA} scoreB={matchData.saberB} bouts={saber} />
                </div>
                <div>
                    <ListCard title="Fencers">
                        <FilteredFencersByWeapon fencers={fencers} />
                    </ListCard>
                </div>
            </div>
        </main>
    );
}

function WeaponResults({title, bouts, scoreA, scoreB}: {title: string; bouts: Bout[]; scoreA: number; scoreB: number}) {
    const aWins = scoreA > scoreB;
    return (
        <ListCard title={title}>
            <Fragment>
                {bouts.map((bout) => (
                    <BoutRow bout={bout} />
                ))}
                <div className="flex flex-row justify-center gap-1 text-center text-2xl font-bold">
                    <Score win={aWins} score={scoreA} />
                    <span>-</span>
                    <Score win={!aWins} score={scoreB} />
                </div>
            </Fragment>
        </ListCard>
    );
}

function Score({score, win}: {score: number; win: boolean}) {
    return <span className={clsx(win ? 'text-green-400' : 'text-red-500', 'font-bold')}>{score}</span>;
}

function calculateMatchRecords(fencers: Fencer[], bouts: Bout[]) {
    return fencers.map((fencer) => {
        const wins = bouts.filter((bout) => bout.includes(fencer) && bout.winnerId === fencer.id).length;
        const losses = bouts.filter((bout) => bout.includes(fencer) && bout.winnerId !== fencer.id).length;
        return {
            ...fencer.toObject!(),
            record: {
                wins: wins,
                losses: losses,
            },
            rating: wins - losses,
        };
    });
}
