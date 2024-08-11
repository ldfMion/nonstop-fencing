import getUniversitiesfromCsv from 'helpers/getUniversitiesFromCsv';
import parseTeam from 'helpers/parseTeam';
import {getTeams} from '~/api';
import RankingRow from '~/components/ranking-row';
import StandingsCard from '~/components/standings-card';
import {Team} from '~/models/FencerSummary';

export default async function TeamAndWeaponPage({params}: {params: {team: string}}) {
    const team = parseTeam(params.team);
    const universities = await getTeams(team);
    const title = toTitleCase(`${params.team}`).replace('ns', "n's") + ' Teams';
    return (
        <main className="flex flex-col items-center p-6">
            <div className="flex w-[500px] max-w-[100%] flex-col items-stretch gap-4">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <StandingsCard>
                    {universities.map((university) => (
                        <RankingRow
                            key={university.id}
                            name={university.displayNameShort}
                            iconUniversityId={university.id}
                            record={
                                team === Team.MEN
                                    ? university.mens.overall
                                    : university.womens.overall
                            }
                        />
                    ))}
                </StandingsCard>
            </div>
        </main>
    );
}

function toTitleCase(str: string) {
    const words: string[] = str.toLowerCase().split(' ');
    let finalStr = '';
    words.forEach((word) => {
        finalStr += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
    });
    return finalStr;
}
