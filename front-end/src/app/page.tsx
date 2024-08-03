import Link from 'next/link';
import getHomePageFencers from '~/api/getHomePageFencers';
import FencerTable from '~/components/fencer-table';

export default async function HomePage() {
    const fencers = await getHomePageFencers();
    return (
        <main className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <Link href="rankings/mens/foil">
                    <FencerTable title="Men's Foil" fencers={fencers.mens.foil} />
                </Link>
                <Link href="rankings/mens/epee">
                    <FencerTable title="Men's Epee" fencers={fencers.mens.epee} />
                </Link>
                <Link href="rankings/mens/saber">
                    <FencerTable title="Men's Saber" fencers={fencers.mens.saber} />
                </Link>
                <Link href="rankings/womens/foil">
                    <FencerTable title="Women's Foil" fencers={fencers.womens.foil} />
                </Link>
                <Link href="rankings/womens/epee">
                    <FencerTable title="Women's Epee" fencers={fencers.womens.epee} />
                </Link>
                <Link href="rankings/womens/saber">
                    <FencerTable title="Women's Saber" fencers={fencers.womens.saber} />
                </Link>
            </div>
        </main>
    );
}
