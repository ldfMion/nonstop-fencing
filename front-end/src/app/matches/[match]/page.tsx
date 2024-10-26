import clsx from 'clsx';
import {Fragment} from 'react';
import BoutRow from '~/components/bout-row/index';
import FilteredFencersByWeapon from '~/components/filtered-fencer-table-by-weapon';
import ListCard from '~/components/list-card';
import {AdaptiveTiles} from '~/components/adaptive-tiles';
import PageHeading from '~/components/page-heading';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import type {Bout} from '~/models/Bout';
import {Weapon} from '~/models/Weapon';
import {boutService, fencerService, matchService, recordService, universityService} from '~/services';
import Side from '~/components/match-row/side';
import type {University2} from '~/models/University2';
import {mapFencerWithRecordToObject} from '~/helpers/objectMappers';
import type {Metadata} from 'next';
import {matchRepository} from '~/repositories';

export async function generateMetadata({params}: {params: {match: string}}): Promise<Metadata> {
    const match = await matchRepository.findById(params.match);
    const teamA = await universityService.getById(match.teamAId);
    const teamB = await universityService.getById(match.teamBId);
    const title = `${teamA.displayNameShort} vs ${teamB.displayNameShort} - NCAA Fencing`;
    const description = `${teamA.displayNameShort} vs ${teamB.displayNameShort}. Result, weapon breakdown, fencer stats.`;
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
    };
}

export async function generateStaticParams() {
    const matches = await matchRepository.findAll();
    console.log('generating matches');
    console.log(matches);
    const paths: {match: string}[] = [];
    matches.forEach((match) => {
        if (match.id != '') {
            paths.push({match: match.id});
        }
    });
    console.log(paths);
    return paths;
}

export const dynamicParams = false;
export const revalidate = false;

export default async function MatchPage({params}: {params: {match: string}}) {
    console.log(params);
    const matchData = await matchService.getById(params.match);
    if (!matchData) return <p>Match not found</p>;

    const bouts = await boutService.getFromMatch(params.match);
    const foil = bouts.filter((bout) => bout.weapon === Weapon.FOIL);
    const epee = bouts.filter((bout) => bout.weapon === Weapon.EPEE);
    const saber = bouts.filter((bout) => bout.weapon === Weapon.SABER);
    const universityA = await universityService.getById(matchData.teamAId);
    const universityB = await universityService.getById(matchData.teamBId);
    const fencers = recordService.calculateRecordsFromBouts(await fencerService.getFromMatch(params.match), bouts);
    const boutsSection = (
        <div className="flex flex-col gap-2">
            <PageHeading>Bout Results</PageHeading>
            <WeaponResults title="Foil" scoreA={matchData.foilA} scoreB={matchData.foilB} bouts={foil} teamA={universityA} teamB={universityB} />
            <WeaponResults title="Epee" scoreA={matchData.epeeA} scoreB={matchData.epeeB} bouts={epee} teamA={universityA} teamB={universityB} />
            <WeaponResults title="Saber" scoreA={matchData.saberA} scoreB={matchData.saberB} bouts={saber} teamA={universityA} teamB={universityB} />
        </div>
    );
    const fencersSection = (
        <div className="flex flex-col gap-2">
            <PageHeading>Fencer Stats</PageHeading>
            <ListCard>
                <FilteredFencersByWeapon fencers={mapFencerWithRecordToObject(fencers)} />
            </ListCard>
        </div>
    );
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <Card className="flex flex-col p-6">
                <div className="flex flex-row items-center justify-center gap-5">
                    <div className="flex flex-col-reverse items-center md:flex-row md:gap-8">
                        <h2 className="text-center text-xl font-bold md:text-3xl">{universityA.displayNameShort}</h2>
                        <TeamIcon universityId={universityA.id} className="h-14 w-14 md:h-20 md:w-20" />
                    </div>
                    {/* <div className="grid grid-cols-3 gap-1 text-5xl font-extrabold [&>*]:text-center"> */}
                    <div className="text-2xl font-extrabold md:text-5xl">
                        <span>{matchData.overallA}</span>
                        <span>-</span>
                        <span>{matchData.overallB}</span>
                    </div>
                    <div className="flex flex-col items-center md:flex-row md:gap-8">
                        <TeamIcon universityId={universityB.id} className="h-14 w-14 md:h-20 md:w-20" />
                        <h2 className="text-center text-xl font-bold md:text-3xl">{universityB.displayNameShort}</h2>
                    </div>
                </div>
            </Card>
            <AdaptiveTiles
                elements={[[{title: 'Bouts', content: boutsSection}], [{title: 'Fencers', content: fencersSection}]]}
                defaultOnMobile="Bouts"
            />
        </main>
    );
}

function WeaponResults({
    title,
    bouts,
    scoreA,
    scoreB,
    teamA,
    teamB,
}: {
    title: string;
    bouts: Bout[];
    scoreA: number;
    scoreB: number;
    teamA: University2;
    teamB: University2;
}) {
    const aWins = scoreA > scoreB;
    bouts.sort((a, b) => a.order - b.order);
    return (
        <ListCard title={title}>
            <Fragment>
                <div className="bout-grid py-2">
                    <Side university={teamA} />
                    <div className="flex flex-row justify-center gap-1 text-center text-2xl font-bold">
                        <Score win={aWins} score={scoreA} />
                        <span>-</span>
                        <Score win={!aWins} score={scoreB} />
                    </div>
                    <Side university={teamB} flip={true} />
                </div>
                {bouts.map((bout) => (
                    <Fragment key={bout.id}>
                        {/* <Separator /> */}
                        <BoutRow bout={bout} />
                    </Fragment>
                ))}
            </Fragment>
        </ListCard>
    );
}

function Score({score, win}: {score: number; win: boolean}) {
    return <span className={clsx(win ? 'text-green-400' : 'text-red-500', 'font-bold')}>{score}</span>;
}
