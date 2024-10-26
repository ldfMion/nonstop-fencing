export async function generateStaticParams() {
    const seasons = ['24-25', '23-24'];
    const paths = seasons.map((season) => ({
        season: season,
    }));
    return paths;
}

export const dynamicParams = false;
export const revalidate = false;

export default function SeasonLayout({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {
    return children;
}
