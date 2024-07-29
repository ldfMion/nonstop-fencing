import FencerSummary from "~/models/FencerSummary";
import FencerRow from "./fencer-row";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody } from "./ui/table";
import { ArrowRight } from "lucide-react";

export default function FencerTable({
  fencers,
  title,
}: {
  title: string;
  fencers: FencerSummary[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-[16px] py-[8px]">
        <CardTitle className="text-xl">{title}</CardTitle>
        <ArrowRight className="!m-0" />
      </CardHeader>
      <CardContent className="p-0">
        {fencers.map((fencer) => (
          <FencerRow fencer={fencer} key={fencer.fullName} />
        ))}
      </CardContent>
    </Card>
  );
}
