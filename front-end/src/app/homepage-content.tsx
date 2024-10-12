import {getHomePageFencers, getHomePageTeams} from '~/api';
import PageHeading from '~/components/page-heading';
import StandingsCard from '~/components/list-card';
import type {Squad} from '~/models/Squad';
import getHomePageSquads from '~/api/getHomePageSquads';
import SeasonDropdown from '~/components/season-dropdown';
import {ISeason, Season} from '~/models/Season';
import {Gender} from '~/models/Gender';
import {Fencer} from '~/models/Fencer';
import {University2} from '~/models/University2';
import {HasRecord} from '~/models/HasRecord';
import TeamRow from '~/components/team-row';
import FencerRow from '~/components/fencer-row';

export default async function HomePageContent({season}: {season: ISeason}) {
    const fencers = await getHomePageFencers(season);
    const squads = await getHomePageSquads(season);
    return (
        <main className="flex flex-col gap-4 px-6">
            <div className="flex flex-row items-center justify-between">
                <PageHeading>Fencers</PageHeading>
                <SeasonDropdown selectedSeason={{...season}} seasons={[{...new Season(2024)}, {...new Season(2025)}]} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <FencerList fencers={fencers.mens.foil} title="Men's Foil" url="mens/foil/fencers" />
                <FencerList fencers={fencers.mens.epee} title="Men's Epee" url="mens/epee/fencers" />
                <FencerList fencers={fencers.mens.saber} title="Men's Saber" url="mens/saber/fencers" />
                <FencerList fencers={fencers.womens.foil} title="Women's Foil" url="womens/foil/fencers" />
                <FencerList fencers={fencers.womens.epee} title="Women's Epee" url="womens/epee/fencers" />
                <FencerList fencers={fencers.womens.saber} title="Women's Saber" url="womens/saber/fencers" />
            </div>
            <PageHeading>Teams</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <TeamList gender={Gender.MEN} season={season} />
                <TeamList gender={Gender.WOMEN} season={season} />
            </div>
            <PageHeading>Squads</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <SquadList squads={squads.womens.foil} title="Women's Foil" url="/womens/foil/squads" genderPath="womens" />
                <SquadList squads={squads.womens.epee} title="Women's Epee" url="/womens/epee/squads" genderPath="womens" />
                <SquadList squads={squads.womens.saber} title="Women's Saber" url="/womens/saber/squads" genderPath="womens" />
                <SquadList squads={squads.mens.foil} title="Men's Foil" url="/mens/foil/squads" genderPath="mens" />
                <SquadList squads={squads.mens.epee} title="Men's Epee" url="/mens/epee/squads" genderPath="mens" />
                <SquadList squads={squads.mens.saber} title="Men's Saber" url="/mens/saber/squads" genderPath="mens" />
            </div>
        </main>
    );
}

async function TeamList({gender, season}: {gender: Gender; season: ISeason}): Promise<JSX.Element> {
    const teams = await getHomePageTeams(season, gender);
    const genderPath = gender === Gender.MEN ? 'mens' : 'womens';
    const title = gender === Gender.MEN ? "Men's" : "Women's";
    const url = `/${genderPath}/teams`;
    return (
        <StandingsCard title={title} titleHref={url}>
            {teams.map((team) => (
                <TeamRow team={team} genderPath={genderPath} key={'id' in team ? team.id : team.university.id} />
            ))}
        </StandingsCard>
    );
}

function FencerList({fencers, title, url}: {fencers: (Fencer & HasRecord)[]; title: string; url: string}): JSX.Element {
    return (
        <StandingsCard title={title} key={title} titleHref={url}>
            {fencers.map((fencer) => (
                <FencerRow fencer={fencer} key={fencer.name} />
            ))}
        </StandingsCard>
    );
}

function SquadList({
    squads,
    title,
    url,
    genderPath,
}: {
    squads: Squad[] | (University2 & HasRecord)[];
    title: string;
    genderPath: 'mens' | 'womens';
    url: string;
}): JSX.Element {
    return (
        <StandingsCard title={title} key={title} titleHref={url}>
            {squads.map((squad) => (
                <TeamRow team={squad} genderPath={genderPath} key={'id' in squad ? squad.id : squad.university.id} />
            ))}
        </StandingsCard>
    );
}
