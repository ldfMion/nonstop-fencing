import {Season} from '~/models/Season';
import HomePageContent from '../homepage-content';

type Props = {params: {season: string}};

export default function HomePage({params}: Props) {
    let season;
    if (params.season == '23-24') {
        season = new Season(2024);
    } else if (params.season == '24-25') {
        season = new Season(2025);
    } else {
        throw new Error(`Invalid season ${params.season}`);
    }
    return <HomePageContent season={season} />;
}
