import {Season} from '~/models/Season';

export async function generateStaticParams() {
    return [new Season(2023).displayNameShort, new Season(2024).displayNameShort];
}

export const dynamicParams = false;
export const revalidate = false;

export default function SeasonLayout({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {
    return children;
}
