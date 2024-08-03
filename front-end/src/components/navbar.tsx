'use client';
import {getDisplayName} from 'next/dist/shared/lib/utils';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';

const paths: {
    displayName: string;
    url: string;
}[] = [
    {displayName: 'Fencers', url: ''},
    {displayName: 'Universities', url: ''},
    {displayName: 'About', url: 'about'},
];

export default function Navbar(): JSX.Element {
    return (
        <div className="sticky top-0 flex flex-row justify-between bg-background p-6 text-2xl font-extrabold backdrop-blur-sm">
            <h1>
                <span className="text-primary">nonstop</span>fencing
            </h1>
            <NavigationMenu>
                <NavigationMenuList>
                    {paths.map((path) => (
                        <NavigationMenuItem key={path.url}>
                            <Link passHref legacyBehavior href={`/${path.url}`}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {path.displayName}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
