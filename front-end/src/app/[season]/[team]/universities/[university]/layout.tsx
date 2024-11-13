import {getTeams} from '~/api';
import type {Metadata} from 'next';
import toTitleCase from '~/helpers/toTitleCase';
import {universityService} from '~/services';
import parseTeam from '~/helpers/parseTeam';
import {Season} from '~/models/Season';

type Props = {params: {season: string; university: string; team: string}};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const gender = params.team.replace('ns', "n's");
    const university = await universityService.getById(params.university);
    const title = `${university.displayNameShort} - Fencers, Match Results (${toTitleCase(gender)})`;
    const description = `Check out ${university.displayNameShort}'s ${gender} fencers and past matches`;
    return {
        title: title,
        description: description,
        openGraph: {
            images: [`/team-icons/${university.id}.png`],
            title: title,
            description: description,
        },
        twitter: {
            card: 'summary',
            images: [`/team-icons/${university.id}.png`],
        },
    };
}

export async function generateStaticParams({params: {team}}: {params: {team: string}}) {
    const teamAsEnum = parseTeam(team);
    const teams = await getTeams(new Season(2024), teamAsEnum);
    const paths = teams.map((team) => ({
        university: team.id,
    }));
    return paths;
}

export const dynamicParams = false;
export const revalidate = false;

export default function UniversityLayout({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {
    return children;
}
