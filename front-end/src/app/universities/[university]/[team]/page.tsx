import getUniversityRecord from 'helpers/getUniversityRecord';
import parseTeam from 'helpers/parseTeam';
import Link from 'next/link';
import getUniversity from '~/api/getUniversity';
import Record from '~/components/record';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {Team} from '~/models/FencerSummary';
import RecordModel from '~/models/Record';
import {University as UniversityModel} from '~/models/University';
import {Region} from '~/models/Region';
import MatchesCard from './matches-card';
import SquadCard from './squad-card';
import {ITeam} from '~/models/Team';

export default async function University({params}: {params: {university: string; team: string}}) {
    const university = await getUniversity(params.university);
    if (!university) {
        return <p>University not found</p>;
    }
    console.log(university);
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
                <UniversityHeaders university={university} record={universityTeam.overall} />
                {showTabs(university, team) && <TeamTabs team={team} />}
            </Card>
            <div className="hidden flex-col gap-5 md:flex md:flex-row md:items-start [&>*]:grow">
                {rosterElement}
                {matchesElement}
            </div>
            <MobileUniversityContentSelector roster={rosterElement} matches={matchesElement} />
        </main>
    );
}

function TeamTabs({team}: {team: Team}): JSX.Element {
    return (
        <Tabs defaultValue={team == Team.MEN ? 'men' : 'women'} className="self-stretch">
            <TabsList className="grid w-full grid-cols-2">
                <Link href="./men" legacyBehavior>
                    <TabsTrigger value="men">Men's</TabsTrigger>
                </Link>
                <Link href="./women" legacyBehavior>
                    <TabsTrigger value="women">Women's</TabsTrigger>
                </Link>
            </TabsList>
        </Tabs>
    );
}

function MobileUniversityContentSelector({
    roster,
    matches,
}: {
    roster: JSX.Element;
    matches: JSX.Element;
}) {
    return (
        <Tabs defaultValue="matches" className="md:hidden">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="roster">Roster</TabsTrigger>
            </TabsList>
            <TabsContent value="matches">{matches}</TabsContent>
            <TabsContent value="roster">{roster}</TabsContent>
        </Tabs>
    );
}

function UniversityHeaders({
    university,
    record,
}: {
    university: UniversityModel;
    record: RecordModel;
}): JSX.Element {
    const region = getRegionName(university.region);
    return (
        <div className="flex flex-row gap-6">
            <TeamIcon universityId={university.id} size={100} />
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-4xl font-extrabold">{university.displayNameLong}</h2>
                    <p className="text-lg font-bold">{region}</p>
                </div>
                <Record record={record} />
            </div>
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
        throw Error(`${currentTeam} is not a team`);
    }
}

function teamExists(team: ITeam) {
    return team.overall.losses + team.overall.wins !== 0;
}
