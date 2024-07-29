import getHomePageFencers from "~/api/getHomePageFencers";
import FencerTable from "~/components/fencer-table";

export default async function HomePage() {
  const fencers = await getHomePageFencers();
  console.log(fencers);
  return (
    <main className="p-6">
      <div className="grid grid-cols-3 gap-5">
        <FencerTable title="Men's Foil" fencers={fencers.mens.foil} />
        <FencerTable title="Men's Epee" fencers={fencers.mens.epee} />
        <FencerTable title="Men's Saber" fencers={fencers.mens.saber} />
        <FencerTable title="Women's Foil" fencers={fencers.womens.foil} />
        <FencerTable title="Women's Epee" fencers={fencers.womens.epee} />
        <FencerTable title="Women's Saber" fencers={fencers.womens.saber} />
      </div>
    </main>
  );
}
