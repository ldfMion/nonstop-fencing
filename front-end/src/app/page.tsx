import {Season} from '~/models/Season';
import HomePageContent from './homepage-content';

export default async function HomePage() {
    let season = new Season(2024);
    return <HomePageContent season={season} />;
}
