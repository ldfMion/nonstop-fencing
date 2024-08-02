import Link from 'next/link';
import getHomePageFencers from '~/api/getHomePageFencers';
import FencerTable from '~/components/fencer-table';

export default async function HomePage() {
    const fencers = await getHomePageFencers();
    return (
        <main className="p-6">
            <div className="grid grid-cols-3 gap-5">
                <Link href="/mens/foil">
                    <FencerTable title="Men's Foil" fencers={fencers.mens.foil} />
                </Link>
                <Link href="/mens/epee">
                    <FencerTable title="Men's Epee" fencers={fencers.mens.epee} />
                </Link>
                <Link href="/mens/saber">
                    <FencerTable title="Men's Saber" fencers={fencers.mens.saber} />
                </Link>
                <Link href="/womens/foil">
                    <FencerTable title="Women's Foil" fencers={fencers.womens.foil} />
                </Link>
                <Link href="/womens/epee">
                    <FencerTable title="Women's Epee" fencers={fencers.womens.epee} />
                </Link>
                <Link href="/womens/saber">
                    <FencerTable title="Women's Saber" fencers={fencers.womens.saber} />
                </Link>
            </div>
        </main>
    );
}
