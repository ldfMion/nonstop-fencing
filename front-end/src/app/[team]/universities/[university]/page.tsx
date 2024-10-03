import parseTeam from '~/helpers/parseTeam';
import Link from 'next/link';
import getUniversity from '~/api/getUniversity';
import Record from '~/components/record';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {Team} from '~/models/FencerSummary';
import type RecordModel from '~/models/Record';
import type {University as UniversityModel} from '~/models/University';
import {Region} from '~/models/Region';
import MatchesCard from './matches-card';
import type {ITeam} from '~/models/Team';
import SquadCard from './squad-card';
import {getTeams} from '~/api';
import type {Metadata} from 'next';
import toTitleCase from '~/helpers/toTitleCase';

type Props = {params: {university: string; team: string}};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const gender = params.team.replace('ns', "n's");
    const university = await getUniversity(params.university);
    const title = `${university.displayNameShort} - Fencers, Match Results (${toTitleCase(gender)})`;
    const description = `Check out ${university.displayNameShort}'s ${gender} fencers and past matches`;
    return {
        title: title,
        description: description,
        openGraph: {
            images: [`/team-icons/${university.id}`],
            title: title,
            description: description,
        },
    };
}

export async function generateStaticParams({params: {team}}: {params: {team: string}}) {
    const teamAsEnum = parseTeam(team);
    const teams = await getTeams(teamAsEnum);
    const paths = teams.map((team) => ({
        university: team.university.id,
    }));
    return paths;
}

export const dynamicParams = false;
export const revalidate = false;

export default async function University({params}: Props) {
    const university = await getUniversity(params.university);
    const team = parseTeam(params.team);
    const universityTeam = team == Team.MEN ? university.mens : university.womens;
    if (!teamExists(universityTeam)) {
        return <p>{university.displayNameLong} does not have this team</p>;
    }
    const rosterElement = <SquadCard university={university} team={team} />;
    const matchesElement = <MatchesCard university={university} team={team} />;
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <Card className="flex flex-col p-6">
                <UniversityHeaders team={universityTeam} />
                {showTabs(university, team) && <TeamTabs gender={team} team={universityTeam} />}
            </Card>
            <div className="hidden flex-col gap-5 md:flex md:flex-row md:items-start [&>*]:grow">
                {rosterElement}
                {matchesElement}
            </div>
            <MobileUniversityContentSelector roster={rosterElement} matches={matchesElement} />
        </main>
    );
}

function TeamTabs({gender, team}: {gender: Team; team: ITeam}): JSX.Element {
    return (
        <Tabs defaultValue={gender == Team.MEN ? 'men' : 'women'} className="self-stretch">
            <TabsList className="grid w-full grid-cols-2">
                <Link href={`/mens/universities/${team.university.id}`} legacyBehavior>
                    <TabsTrigger value="men">Men&apos;s</TabsTrigger>
                </Link>
                <Link href={`/womens/universities/${team.university.id}`} legacyBehavior>
                    <TabsTrigger value="women">Women&apos;s</TabsTrigger>
                </Link>
            </TabsList>
        </Tabs>
    );
}

function MobileUniversityContentSelector({roster, matches}: {roster: JSX.Element; matches: JSX.Element}) {
    return (
        <Tabs defaultValue="matches" className="md:hidden">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="roster">Roster</TabsTrigger>
            </TabsList>
            <TabsContent value="matches" className="flex items-start overflow-scroll">
                {matches}
            </TabsContent>
            <TabsContent value="roster">{roster}</TabsContent>
        </Tabs>
    );
}

function UniversityHeaders({team}: {team: ITeam}): JSX.Element {
    const region = getRegionName(team.university.region);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-start gap-2 md:gap-6">
                <TeamIcon universityId={team.university.id} className="h-14 w-14 md:h-28 md:w-28" />
                <div className="flex flex-col">
                    <h2 className="text-xl font-extrabold md:text-4xl">{team.university.displayNameLong}</h2>
                    <p className="hidden text-lg font-bold md:flex">{region}</p>
                </div>
            </div>
            <div className="">
                <p className="flex text-sm font-bold md:hidden">{region}</p>
                <Record record={team.overall} />
                <div className="flex flex-row gap-4">
                    <PartialRecord weaponInitial="F" record={team.foil} />
                    <PartialRecord weaponInitial="E" record={team.epee} />
                    <PartialRecord weaponInitial="S" record={team.saber} />
                </div>
            </div>
        </div>
    );
}

function PartialRecord({record, weaponInitial}: {record: RecordModel; weaponInitial: 'F' | 'E' | 'S'}) {
    return (
        <div className="flex flex-row text-sm">
            {weaponInitial}: {record.wins}-{record.losses}
        </div>
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

function hasMen(university: UniversityModel): boolean {
    return teamExists(university.mens);
}

function hasWomen(university: UniversityModel): boolean {
    return teamExists(university.womens);
}

function showTabs(university: UniversityModel, currentTeam: Team): boolean {
    if (currentTeam === Team.MEN) {
        return hasWomen(university);
    }
    if (currentTeam === Team.WOMEN) {
        return hasMen(university);
    } else {
        throw Error(`${currentTeam as string} is not a team`);
    }
}

function teamExists(team: ITeam) {
    return team.overall.losses + team.overall.wins !== 0;
}
