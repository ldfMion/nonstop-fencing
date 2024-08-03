import Image from 'next/image';

export default function TeamIcon({src, alt, size}: {src: string; alt: string; size: number}) {
    return (
        <div className={`flex h-[${size}px] w-[${size}px] items-center justify-center p-0`}>
            <Image src={src} alt={alt} width={size} height={size} />
        </div>
    );
}
