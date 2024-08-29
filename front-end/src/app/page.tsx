import getTopFive from 'helpers/getTop5';
import {getHomePageFencers, getTeams} from '~/api';
import PageHeading from '~/components/page-heading';
import RankingRow from '~/components/ranking-row';
import StandingsCard from '~/components/list-card';
import FencerSummary, {Team} from '~/models/FencerSummary';
import {ITeam} from '~/models/Team';
import {Squad} from '~/models/Squad';
import getHomePageSquads from '~/api/getHomePageSquads';

export default async function HomePage() {
    const fencers = await getHomePageFencers();
    const fencerTables: Tables<FencerSummary> = [
        {
            title: "Men's Foil",
            url: 'fencers/mens/foil',
            items: fencers.mens.foil,
        },
        {
            title: "Men's Epee",
            url: 'fencers/mens/epee',
            items: fencers.mens.epee,
        },
        {
            title: "Men's Saber",
            url: 'fencers/mens/saber',
            items: fencers.mens.saber,
        },
        {
            title: "Women's Foil",
            url: 'fencers/womens/foil',
            items: fencers.womens.foil,
        },
        {
            title: "Women's Epee",
            url: 'fencers/womens/epee',
            items: fencers.womens.epee,
        },
        {
            title: "Women's Saber",
            url: 'fencers/womens/saber',
            items: fencers.womens.saber,
        },
    ];
    const womensTeams = getTopFive(await getTeams(Team.WOMEN));
    const mensTeams = getTopFive(await getTeams(Team.MEN));
    const teamTables: Tables<ITeam> = [
        {
            title: "Women's",
            url: 'teams/womens',
            items: womensTeams,
        },
        {
            title: "Men's",
            url: 'teams/mens',
            items: mensTeams,
        },
    ];
    const squads = await getHomePageSquads();
    const squadTables: Tables<Squad> = [
        {
            title: "Women's Foil",
            url: 'squads/womens/foil',
            items: squads.womens.foil,
        },
        {
            title: "Women's Epee",
            url: 'squads/womens/epee',
            items: squads.womens.epee,
        },
        {
            title: "Women's Saber",
            url: 'squads/womens/saber',
            items: squads.womens.saber,
        },
        {
            title: "Men's Foil",
            url: 'squads/mens/foil',
            items: squads.mens.foil,
        },
        {
            title: "Men's Epee",
            url: 'squads/mens/epee',
            items: squads.mens.epee,
        },
        {
            title: "Men's Saber",
            url: 'squads/mens/saber',
            items: squads.mens.saber,
        },
    ];
    return (
        <main className="flex flex-col gap-4 px-6">
            <PageHeading>Fencers</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {fencerTables.map((data) => (
                    <StandingsCard title={data.title} key={data.title} titleHref={data.url}>
                        {data.items.map((fencer) => (
                            <RankingRow
                                name={fencer.fullName}
                                iconUniversityId={fencer.universityId}
                                record={fencer.record}
                                key={fencer.fullName}
                            />
                        ))}
                    </StandingsCard>
                ))}
            </div>
            <PageHeading>Teams</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {teamTables.map((data) => (
                    <StandingsCard title={data.title} titleHref={data.url} key={data.title}>
                        {data.items.map((team) => (
                            <RankingRow
                                name={team.university.displayNameShort}
                                record={team.overall}
                                iconUniversityId={team.university.id}
                                href={`/universities/${team.university.id}/men`}
                                key={team.university.id}
                            />
                        ))}
                    </StandingsCard>
                ))}
            </div>
            <PageHeading>Squads</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {squadTables.map((data) => (
                    <StandingsCard title={data.title} key={data.title} titleHref={data.url}>
                        {data.items.map((squad) => (
                            <RankingRow
                                name={squad.university.displayNameShort}
                                record={squad.record}
                                iconUniversityId={squad.university.id}
                                href={`/universities/${squad.university.id}/men`}
                                key={squad.university.id}
                            />
                        ))}
                    </StandingsCard>
                ))}
            </div>
        </main>
    );
}

type Tables<T> = {
    title: string;
    url: string;
    items: T[];
}[];
