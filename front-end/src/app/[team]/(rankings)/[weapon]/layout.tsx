export async function generateStaticParams() {
    return [{weapon: 'foil'}, {weapon: 'epee'}, {weapon: 'saber'}];
}

export const dynamicParams = false;

export default function WeaponLayout({
    children,
}: Readonly<{children: React.ReactNode}>): React.ReactNode {
    return children;
}
