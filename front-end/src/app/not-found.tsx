import Link from 'next/link';
import {Button} from '~/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-start gap-4 p-16">
            <h2 className="text-3xl font-bold">This page was not found :(</h2>
            <Button asChild variant="default" className="font-semibold">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
