import getTopFive from 'helpers/getTop5';
import {getHomePageFencers, getTeams} from '~/api';
import FencerTable from '~/components/fencer-table';
import PageHeading from '~/components/page-heading';
import RankingRow from '~/components/ranking-row';
import StandingsCard from '~/components/list-card';
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
        <main className="flex flex-col gap-4 px-6">
            <PageHeading>Fencers</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {fencerTables.map((data) => (
                    <StandingsCard title={data.title} key={data.title} titleHref={data.url}>
                        <FencerTable fencers={data.fencers} />
                    </StandingsCard>
                ))}
            </div>
            <PageHeading>Teams</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {teamTables.map((data) => (
                    <StandingsCard title={data.title} titleHref={data.url} key={data.title}>
                        {data.teams.map((team) => (
                            <RankingRow
                                name={team.university.displayNameShort}
                                record={team.overall}
                                iconUniversityId={team.university.id}
                            />
                        ))}
                    </StandingsCard>
                ))}
            </div>
        </main>
    );
}
