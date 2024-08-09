'use client';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import {Button} from './ui/button';

export default function FooterNavigationList({
    paths,
}: {
    paths: {displayName: string; url: string}[];
}) {
    return paths.map((path) => (
        <Link passHref legacyBehavior href={`/${path.url}`}>
            <Button variant="link" className="p-0">
                {path.displayName}
            </Button>
        </Link>
    ));
}
