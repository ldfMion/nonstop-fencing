import Image from 'next/image';
import Link from 'next/link';
import {cn} from '~/lib/utils';

export default function TeamIcon({universityId, className}: {universityId: string; className?: string}) {
    const url = `/team-icons/${universityId}.png`;
    return (
        <Link href={`/mens/universities/${universityId}`}>
            <div className={cn('relative flex items-center justify-center p-0', className)}>
                <Image src={url} alt={''} width={100} height={100} className={`relative h-full w-full object-contain`} />
            </div>
        </Link>
    );
}
