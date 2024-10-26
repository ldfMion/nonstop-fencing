import {Season} from '~/models/Season';
import HomePageContent from './homepage-content';

export default async function HomePage() {
    const season = new Season(2025);
    return <HomePageContent season={season} />;
}
