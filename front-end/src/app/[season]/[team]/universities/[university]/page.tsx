import parseTeam from '~/helpers/parseTeam';
import Link from 'next/link';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Tabs, TabsList, TabsTrigger} from '~/components/ui/tabs';
import type RecordModel from '~/models/Record';
import {Region} from '~/models/Region';
import MatchesCard from './matches-card';
import SquadCard from './squad-card';
import {Gender} from '~/models/Gender';
import {AdaptiveTiles} from '~/components/adaptive-tiles';
import type {ISeason} from '~/models/Season';
import {Season} from '~/models/Season';
import SeasonDropdown from '~/components/season-dropdown';
import {parseSeason} from '~/helpers/parseSeason';
import {matchService, recordService, universityService} from '~/services';
import type {University2} from '~/models/University2';
import assert from 'assert';
import {Weapon} from '~/models/Weapon';

type Props = {params: {season: string; university: string; team: string}};

export default async function University({params}: Props) {
    const season = parseSeason(params.season);
    const gender = parseTeam(params.team);
    const university = await universityService.getById(params.university);
    if (!teamExists(university, gender)) {
        return <p>{university.displayNameLong} does not have this team</p>;
    }
    const rosterElement = <SquadCard university={university} season={season} gender={gender} />;
    const matchesElement = <MatchesCard university={university} gender={gender} season={season} />;
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <Card className="flex flex-col p-6">
                <UniversityHeaders team={university} season={season} gender={gender} />
                {showTabs(university, gender) && <TeamTabs gender={gender} team={university} season={season} />}
            </Card>
            <AdaptiveTiles
                elements={[[{title: 'Roster', content: rosterElement}], [{title: 'Matches', content: matchesElement}]]}
                defaultOnMobile="Roster"
            />
        </main>
    );
}

function TeamTabs({gender, team, season}: {gender: Gender; team: University2; season: ISeason}): JSX.Element {
    return (
        <Tabs defaultValue={gender == Gender.MEN ? 'men' : 'women'} className="self-stretch">
            <TabsList className="grid w-full grid-cols-2">
                <Link href={`/${season.id}/mens/universities/${team.id}`} legacyBehavior>
                    <TabsTrigger value="men">Men&apos;s</TabsTrigger>
                </Link>
                <Link href={`/${season.id}/womens/universities/${team.id}`} legacyBehavior>
                    <TabsTrigger value="women">Women&apos;s</TabsTrigger>
                </Link>
            </TabsList>
        </Tabs>
    );
}

async function UniversityHeaders({team, season, gender}: {team: University2; season: ISeason; gender: Gender}): Promise<JSX.Element> {
    const region = getRegionName(team.region);
    const overall = recordService.calculateRecordsFromMatches([team], await matchService.get({season: season, gender: gender}))[0];
    assert(overall !== undefined);
    const foil = recordService.calculateSquadRecords([team], await matchService.get({season: season, gender: gender}), Weapon.FOIL)[0];
    assert(foil !== undefined);
    const epee = recordService.calculateSquadRecords([team], await matchService.get({season: season, gender: gender}), Weapon.EPEE)[0];
    assert(epee !== undefined);
    const saber = recordService.calculateSquadRecords([team], await matchService.get({season: season, gender: gender}), Weapon.SABER)[0];
    assert(saber !== undefined);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-end justify-between md:flex-row md:items-start">
                <div className="flex flex-row items-center justify-start gap-2 md:gap-6">
                    <TeamIcon universityId={team.id} className="h-14 w-14 md:h-28 md:w-28" />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-extrabold md:text-4xl">{team.displayNameLong}</h2>
                        <p className="hidden text-lg font-bold md:flex">{region}</p>
                    </div>
                </div>
                <SeasonDropdown seasons={[{...new Season(2024)}, {...new Season(2025)}]} selectedSeason={{...season}} />
            </div>
            <div className="">
                <p className="text-2xl font-bold">
                    Record: {overall.record.wins}-{overall.record.losses}
                </p>
                <div className="flex flex-row gap-4">
                    <PartialRecord weapon={Weapon.FOIL} record={foil.record} />
                    <PartialRecord weapon={Weapon.EPEE} record={epee.record} />
                    <PartialRecord weapon={Weapon.SABER} record={saber.record} />
                </div>
            </div>
        </div>
    );
}

function PartialRecord({record, weapon}: {record: RecordModel; weapon: Weapon}) {
    const weaponTitle = weapon === Weapon.FOIL ? 'Foil' : weapon === Weapon.EPEE ? 'Epee' : 'Saber';
    return (
        <p className="text-md flex flex-row font-semibold">
            {weaponTitle}: {record.wins}-{record.losses}
        </p>
    );
}

const NORTHEAST = 'Northeast';
const MID_ATLANTIC_SOUTH = 'Mid-Atlantic/South';
const WEST = 'West';
const MIDWEST = 'Midwest';

function getRegionName(region: Region): string {
    switch (region) {
        case Region.NORTHEAST:
            return NORTHEAST;
        case Region.MID_ATLANTIC_SOUTH:
            return MID_ATLANTIC_SOUTH;
        case Region.WEST:
            return WEST;
        case Region.MIDWEST:
            return MIDWEST;
    }
}

function showTabs(university: University2, currentTeam: Gender): boolean {
    if (currentTeam === Gender.MEN) {
        return university.hasWomen;
    }
    if (currentTeam === Gender.WOMEN) {
        return university.hasMen;
    } else {
        throw Error(`${currentTeam as string} is not a team`);
    }
}

function teamExists(university: University2, gender: Gender): boolean {
    return gender === Gender.MEN ? university.hasMen : university.hasWomen;
}
