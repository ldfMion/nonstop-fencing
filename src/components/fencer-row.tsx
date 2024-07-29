import FencerSummary from "~/models/FencerSummary";
import { TableCell, TableRow } from "./ui/table";
import TeamIcon from "./team-icon";

export default function FencerRow({ fencer }: { fencer: FencerSummary }) {
  const teamIcon = `/team-icons/${fencer.universityId}.png`;
  return (
    <div className="flex flex-row items-center justify-between px-[16px] py-[8px]">
      <div className="flex flex-row gap-1">
        <div className="h-[24px] w-[24px] p-0">
          <TeamIcon src={teamIcon} alt={teamIcon} />
        </div>
        <div className="h-fit p-0">{fencer.fullName}</div>
      </div>
      <div className="flex flex-row gap-1">
        <div className="rounded-md bg-green-400 px-[4px] py-[2px] font-semibold text-white">
          {fencer.record.wins}
        </div>
        <div className="rounded-md bg-red-400 px-[4px] py-[2px] font-semibold text-white">
          {fencer.record.losses}
        </div>
      </div>
    </div>
  );
}
