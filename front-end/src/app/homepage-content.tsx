import {getHomePageFencers, getHomePageTeams} from '~/api';
import PageHeading from '~/components/page-heading';
import RankingRow from '~/components/ranking-row';
import StandingsCard from '~/components/list-card';
import type {Squad} from '~/models/Squad';
import getHomePageSquads from '~/api/getHomePageSquads';
import SeasonDropdown from '~/components/season-dropdown';
import {ISeason, Season} from '~/models/Season';
import {Gender} from '~/models/Gender';
import {Fencer} from '~/models/Fencer';
import {WithRecord} from '~/models/WithRecord';
import {University2} from '~/models/University2';

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
            {teams.map((team) =>
                'id' in team ? (
                    <RankingRow name={team.displayNameShort} record={team.record} iconUniversityId={team.id} href={`/${genderPath}/universities/${team.id}`} key={team.id} />
                ) : (
                    <RankingRow
                        name={team.university.displayNameShort}
                        record={team.overall}
                        iconUniversityId={team.university.id}
                        href={`/${genderPath}/universities/${team.university.id}`}
                        key={team.university.id}
                    />
                ),
            )}
        </StandingsCard>
    );
}

function FencerList({fencers, title, url}: {fencers: WithRecord<Fencer>[]; title: string; url: string}): JSX.Element {
    return (
        <StandingsCard title={title} key={title} titleHref={url}>
            {fencers.map((fencer) => (
                <RankingRow name={fencer.name} iconUniversityId={fencer.universityId} record={fencer.record} key={fencer.name} />
            ))}
        </StandingsCard>
    );
}

function SquadList({squads, title, url, genderPath}: {squads: Squad[] | WithRecord<University2>[]; title: string; genderPath: 'mens' | 'womens'; url: string}): JSX.Element {
    return (
        <StandingsCard title={title} key={title} titleHref={url}>
            {squads.map((squad) => {
                if ('id' in squad) {
                    return <RankingRow name={squad.displayNameShort} record={squad.record} iconUniversityId={squad.id} href={`/${genderPath}/universities/${squad.id}`} key={squad.id} />;
                }
                return (
                    <RankingRow
                        name={squad.university.displayNameShort}
                        record={squad.record}
                        iconUniversityId={squad.university.id}
                        href={`/${genderPath}/universities/${squad.university.id}`}
                        key={squad.university.id}
                    />
                );
            })}
        </StandingsCard>
    );
}
