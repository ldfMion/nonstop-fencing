import {getHomePageFencers, getHomePageTeams} from '~/api';
import PageHeading from '~/components/page-heading';
import StandingsCard from '~/components/list-card';
import type {Squad} from '~/models/Squad';
import getHomePageSquads from '~/api/getHomePageSquads';
import SeasonDropdown from '~/components/season-dropdown';
import type {ISeason} from '~/models/Season';
import {Season} from '~/models/Season';
import {Gender} from '~/models/Gender';
import type {Fencer} from '~/models/Fencer';
import type {University2} from '~/models/University2';
import type {HasRecord} from '~/models/HasRecord';
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
                <FencerList fencers={fencers.mens.foil} title="Men's Foil" url={`${season.displayNameShort}/mens/foil/fencers`} />
                <FencerList fencers={fencers.mens.epee} title="Men's Epee" url={`${season.displayNameShort}/mens/epee/fencers`} />
                <FencerList fencers={fencers.mens.saber} title="Men's Saber" url={`${season.displayNameShort}/mens/saber/fencers`} />
                <FencerList fencers={fencers.womens.foil} title="Women's Foil" url={`${season.displayNameShort}/womens/foil/fencers`} />
                <FencerList fencers={fencers.womens.epee} title="Women's Epee" url={`${season.displayNameShort}/womens/epee/fencers`} />
                <FencerList fencers={fencers.womens.saber} title="Women's Saber" url={`${season.displayNameShort}/womens/saber/fencers`} />
            </div>
            <PageHeading>Teams</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <TeamList gender={Gender.MEN} season={season} />
                <TeamList gender={Gender.WOMEN} season={season} />
            </div>
            <PageHeading>Squads</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <SquadList
                    squads={squads.womens.foil}
                    title="Women's Foil"
                    url={`${season.displayNameShort}/womens/foil/squads`}
                    gender={Gender.WOMEN}
                />
                <SquadList
                    squads={squads.womens.epee}
                    title="Women's Epee"
                    url={`${season.displayNameShort}/womens/epee/squads`}
                    gender={Gender.WOMEN}
                />
                <SquadList
                    squads={squads.womens.saber}
                    title="Women's Saber"
                    url={`${season.displayNameShort}/womens/saber/squads`}
                    gender={Gender.WOMEN}
                />
                <SquadList squads={squads.mens.foil} title="Men's Foil" url={`${season.displayNameShort}/mens/foil/squads`} gender={Gender.MEN} />
                <SquadList squads={squads.mens.epee} title="Men's Epee" url={`${season.displayNameShort}/mens/epee/squads`} gender={Gender.MEN} />
                <SquadList squads={squads.mens.saber} title="Men's Saber" url={`${season.displayNameShort}/mens/saber/squads`} gender={Gender.MEN} />
            </div>
        </main>
    );
}

async function TeamList({gender, season}: {gender: Gender; season: ISeason}): Promise<JSX.Element> {
    const teams = await getHomePageTeams(season, gender);
    const genderPath = gender === Gender.MEN ? 'mens' : 'womens';
    const title = gender === Gender.MEN ? "Men's" : "Women's";
    const url = `${season.displayNameShort}/${genderPath}/teams`;
    return (
        <StandingsCard title={title} titleHref={url}>
            {teams.map((team) => (
                <TeamRow team={team} gender={gender} key={team.id} />
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

function SquadList({squads, title, url, gender}: {squads: (University2 & HasRecord)[]; title: string; gender: Gender; url: string}): JSX.Element {
    return (
        <StandingsCard title={title} key={title} titleHref={url}>
            {squads.map((squad) => (
                <TeamRow team={squad} gender={gender} key={squad.id} />
            ))}
        </StandingsCard>
    );
}
