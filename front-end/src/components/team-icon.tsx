import Image from 'next/image';

export default function TeamIcon({src, alt}: {src: string; alt: string}) {
    return (
        <div className="flex h-[24px] w-[24px] items-center justify-center p-0">
            <Image src={src} alt={alt} width={24} height={24} />
        </div>
    );
}
