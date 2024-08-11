import getTopFive from 'helpers/getTop5';
import Link from 'next/link';
import {getHomePageFencers, getTeams} from '~/api';
import FencerTable from '~/components/fencer-table';
import PageHeading from '~/components/page-heading';
import RankingRow from '~/components/ranking-row';
import StandingsCard from '~/components/standings-card';
import {Team} from '~/models/FencerSummary';

export default async function HomePage() {
    const fencers = await getHomePageFencers();
    const fencerTables = [
        {
            title: "Men's Foil",
            url: 'fencers/mens/foil',
            fencers: fencers.mens.foil,
        },
        {
            title: "Men's Epee",
            url: 'fencers/mens/epee',
            fencers: fencers.mens.epee,
        },
        {
            title: "Men's Saber",
            url: 'fencers/mens/saber',
            fencers: fencers.mens.saber,
        },
        {
            title: "Women's Foil",
            url: 'fencers/womens/foil',
            fencers: fencers.womens.foil,
        },
        {
            title: "Women's Epee",
            url: 'fencers/womens/epee',
            fencers: fencers.womens.epee,
        },
        {
            title: "Women's Saber",
            url: 'fencers/womens/saber',
            fencers: fencers.womens.saber,
        },
    ];
    const mensTeams = getTopFive(await getTeams(Team.MEN));
    const womensTeams = getTopFive(await getTeams(Team.WOMEN));
    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeading>Fencers</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {fencerTables.map((data) => (
                    <Link href={data.url} key={data.title}>
                        <StandingsCard
                            title={data.title}
                            className="transition-all hover:scale-[1.03] hover:bg-accent"
                        >
                            <FencerTable fencers={data.fencers} />
                        </StandingsCard>
                    </Link>
                ))}
            </div>
            <PageHeading>Teams</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Link href="teams/mens">
                    <StandingsCard
                        title="Men's"
                        className="transition-all hover:scale-[1.03] hover:bg-accent"
                    >
                        {mensTeams.map((team) => (
                            <RankingRow
                                name={team.displayNameShort}
                                record={team.mens.overall}
                                iconUniversityId={team.id}
                            />
                        ))}
                    </StandingsCard>
                </Link>
                <Link href="teams/womens">
                    <StandingsCard
                        title="Women's"
                        className="transition-all hover:scale-[1.03] hover:bg-accent"
                    >
                        {womensTeams.map((team) => (
                            <RankingRow
                                name={team.displayNameShort}
                                record={team.womens.overall}
                                iconUniversityId={team.id}
                            />
                        ))}
                    </StandingsCard>
                </Link>
            </div>
        </main>
    );
}
