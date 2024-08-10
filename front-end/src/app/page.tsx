import Link from 'next/link';
import {getHomePageTeams} from '~/api';
import getHomePageFencers from '~/api/getHomePageFencers';
import FencerTable from '~/components/fencer-table';
import Record from '~/components/record';
import Side from '~/components/side';
import StandingsCard from '~/components/standings-card';

export default async function HomePage() {
    const fencers = await getHomePageFencers();
    const fencerTables = [
        {
            title: "Men's Foil",
            url: 'rankings/mens/foil',
            fencers: fencers.mens.foil,
        },
        {
            title: "Men's Epee",
            url: 'rankings/mens/epee',
            fencers: fencers.mens.epee,
        },
        {
            title: "Men's Saber",
            url: 'rankings/mens/saber',
            fencers: fencers.mens.saber,
        },
        {
            title: "Women's Foil",
            url: 'rankings/womens/foil',
            fencers: fencers.womens.foil,
        },
        {
            title: "Women's Epee",
            url: 'rankings/womens/epee',
            fencers: fencers.womens.epee,
        },
        {
            title: "Women's Saber",
            url: 'rankings/womens/saber',
            fencers: fencers.womens.saber,
        },
    ];
    const teams = await getHomePageTeams();
    const teamTables = [
        {
            title: "Women's",
            url: 'rankings/womens',
            teams: teams.womens,
        },
        {
            title: "Men's",
            url: 'rankings/mens',
            teams: teams.mens,
        },
    ];
    return (
        <main className="flex flex-col gap-8 p-6">
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {teamTables.map((data) => (
                    <Link href={data.url} key={data.title}>
                        <StandingsCard
                            title={data.title}
                            className="transition-all hover:scale-[1.03] hover:bg-accent"
                        >
                            {data.teams.map((team) => (
                                <div className="flex flex-row justify-between">
                                    <Side university={team} />
                                    <Record record={team.record} />
                                </div>
                            ))}
                        </StandingsCard>
                    </Link>
                ))}
            </div>
        </main>
    );
}
