import {ArrowRight} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';

export default function StandingsCard({
    title,
    children,
    className,
}: {title?: string; children: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className={`p-2 ${className ?? ''}`}>
            {title && (
                <CardHeader className="flex flex-row items-center justify-between px-[16px] py-[8px]">
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <ArrowRight className="!m-0" />
                </CardHeader>
            )}
            <CardContent className="p-0">{children}</CardContent>
        </Card>
    );
}
