import { getFencersFromTeamAndWeapon } from "~/api";
import FencerTable from "~/components/fencer-table";

export default async function TeamAndWeaponPage({
  params,
}: {
  params: { team: string; weapon: string };
}) {
  const fencers = await getFencersFromTeamAndWeapon(params.team, params.weapon);
  return (
    <main className="flex flex-col items-center p-6">
      <div className="w-[500px] max-w-[100%]">
        <FencerTable
          fencers={fencers}
          title={`${params.team} ${params.weapon}`}
        />
      </div>
    </main>
  );
}
