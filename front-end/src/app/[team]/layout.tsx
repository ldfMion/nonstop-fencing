export async function generateStaticParams() {
    return [{team: 'mens'}, {team: 'womens'}];
}

export const dynamicParams = false;
export const revalidate = false;

export default function Layout({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {
    return children;
}
