import Image from 'next/image';
import Link from 'next/link';

export default function TeamIcon({universityId, size}: {universityId: string; size: number}) {
    const url = `/team-icons/${universityId}.png`;
    return (
        <Link href={`/universities/${universityId}`} legacyBehavior>
            <div className={`flex h-[${size}px] w-[${size}px] items-center justify-center p-0`}>
                <Image src={url} alt={''} width={size} height={size} />
            </div>
        </Link>
    );
}
