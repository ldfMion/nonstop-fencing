import ListCard from '~/components/list-card';
import {TeamList} from '~/components/team-list';
import TeamRow from '~/components/team-row';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {Gender} from '~/models/Gender';
import {HasRecord} from '~/models/HasRecord';
import {University2} from '~/models/University2';
import {Weapon} from '~/models/Weapon';
import {matchService, recordService, universityService} from '~/services';

export default async function EventTeamsPage({params}: {params: {event: string}}) {
    const mensTeams = await universityService.getFromMeet(params.event, Gender.MEN);
    const womensTeams = await universityService.getFromMeet(params.event, Gender.WOMEN);
    return (
        <Tabs defaultValue="womens" className="[&>*]:mt-0">
            <TabsList className="grid w-full grid-flow-col justify-stretch overflow-y-hidden overflow-x-scroll">
                <TabsTrigger value="womens">{"Women's"}</TabsTrigger>
                <TabsTrigger value="mens">{"Men's"}</TabsTrigger>
            </TabsList>
            {womensTeams.length > 0 && (
                <TabsContent value="womens" className="flex flex-col gap-2">
                    <TeamPageForGender eventId={params.event} teams={womensTeams} gender={Gender.WOMEN} />
                </TabsContent>
            )}
            {mensTeams.length > 0 && (
                <TabsContent value="mens" className="flex flex-col gap-2">
                    <TeamPageForGender eventId={params.event} teams={mensTeams} gender={Gender.MEN} />
                </TabsContent>
            )}
        </Tabs>
    );
}

async function TeamPageForGender({eventId, teams, gender}: {eventId: string; teams: (University2 & HasRecord)[]; gender: Gender}) {
    const matches = await matchService.fromMeet(eventId, gender);
    const foil = recordService.calculateSquadRecords(teams, matches, Weapon.FOIL);
    const epee = recordService.calculateSquadRecords(teams, matches, Weapon.EPEE);
    const saber = recordService.calculateSquadRecords(teams, matches, Weapon.SABER);
    return (
        <div className="flex flex-row gap-2 [&>*]:grow">
            <TeamList teams={teams} gender={gender} title="Overall" />
            <TeamList teams={foil} gender={gender} title="Foil" />
            <TeamList teams={epee} gender={gender} title="Epee" />
            <TeamList teams={saber} gender={gender} title="Saber" />
        </div>
    );
}
