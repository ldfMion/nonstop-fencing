import {Season} from '~/models/Season';
import HomePageContent from '../homepage-content';
import {parseSeason} from '~/helpers/parseSeason';

type Props = {params: {season: string}};

export default function HomePage({params}: Props) {
    const season = parseSeason(params.season);
    return <HomePageContent season={season} />;
}
