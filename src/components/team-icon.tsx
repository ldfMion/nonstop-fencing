import Image from "next/image";

export default function TeamIcon({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={24} height={24} />;
}
