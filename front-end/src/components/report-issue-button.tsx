import Link from 'next/link';
import {Button} from './ui/button';

export function ReportIssueButton() {
    return (
        <Button variant="link" className="!p-2 text-destructive">
            <Link href="mailto:difrancescomion.1@osu.edu">Report an Issue</Link>
        </Button>
    );
}
