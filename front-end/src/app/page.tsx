import Link from 'next/link';
import getHomePageFencers from '~/api/getHomePageFencers';
import FencerTable from '~/components/fencer-table';
import StandingsCard from '~/components/standings-card';

export default async function HomePage() {
    const fencers = await getHomePageFencers();
    const tables = [
        {
            title: "Men's Foil",
            url: 'rankings/mens/foil',
            fencers: fencers.mens.foil,
        },
        {
            title: "Men's Epee",
            url: 'rankings/mens/epee',
            fencers: fencers.mens.epee,
        },
        {
            title: "Men's Saber",
            url: 'rankings/mens/saber',
            fencers: fencers.mens.saber,
        },
        {
            title: "Women's Foil",
            url: 'rankings/womens/foil',
            fencers: fencers.womens.foil,
        },
        {
            title: "Women's Epee",
            url: 'rankings/womens/epee',
            fencers: fencers.womens.epee,
        },
        {
            title: "Women's Saber",
            url: 'rankings/womens/saber',
            fencers: fencers.womens.saber,
        },
    ];
    return (
        <main className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {tables.map((data) => (
                    <Link href={data.url} key={data.title}>
                        <StandingsCard
                            title={data.title}
                            className="transition-all hover:scale-[1.03] hover:bg-accent"
                        >
                            <FencerTable fencers={data.fencers} />
                        </StandingsCard>
                    </Link>
                ))}
            </div>
        </main>
    );
}
