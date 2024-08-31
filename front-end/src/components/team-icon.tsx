import Image from 'next/image';

export default function TeamIcon({universityId, size}: {universityId: string; size: number}) {
    const url = `/team-icons/${universityId}.png`;
    return (
        <div className={`relative flex h-[${size}px] items-center justify-center p-0`}>
            <Image src={url} alt={''} width={size} height={size} className={`object-cover`} />
        </div>
    );
}
