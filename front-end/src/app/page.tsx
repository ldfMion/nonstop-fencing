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
    const womensTeams = getTopFive(await getTeams(Team.WOMEN));
    console.log(womensTeams);
    const mensTeams = getTopFive(await getTeams(Team.MEN));
    console.log(mensTeams);
    const teamTables = [
        {
            title: "Women's",
            url: 'teams/womens',
            teams: womensTeams,
        },
        {
            title: "Men's",
            url: 'teams/mens',
            teams: mensTeams,
        },
    ];
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
                {teamTables.map((data) => (
                    <Link href={data.url}>
                        <StandingsCard
                            title={data.title}
                            className="transition-all hover:scale-[1.03] hover:bg-accent"
                        >
                            {data.teams.map((team) => (
                                <RankingRow
                                    name={team.university.displayNameShort}
                                    record={team.overall}
                                    iconUniversityId={team.university.id}
                                />
                            ))}
                        </StandingsCard>
                    </Link>
                ))}
            </div>
        </main>
    );
}
