import FencerSummary from '~/models/FencerSummary';
import FencerRow from './fencer-row';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';
import {Table, TableBody} from './ui/table';
import {ArrowRight} from 'lucide-react';

export default function FencerTable({
    fencers,
    title,
    className,
}: {
    title?: string;
    fencers: FencerSummary[];
    className?: string;
}) {
    return (
        <Card className={`p-2 ${className ?? ''}`}>
            {title && (
                <CardHeader className="flex flex-row items-center justify-between px-[16px] py-[8px]">
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <ArrowRight className="!m-0" />
                </CardHeader>
            )}
            <CardContent className="p-0">
                {fencers.map((fencer) => (
                    <FencerRow fencer={fencer} key={fencer.fullName} />
                ))}
            </CardContent>
        </Card>
    );
}
