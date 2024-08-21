'use client';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import {buttonVariants} from './ui/button';
import {cn} from '~/lib/utils';

const fencerPaths = [
    {
        title: "Men's Foil",
        url: 'fencers/mens/foil',
    },
    {
        title: "Men's Epee",
        url: 'fencers/mens/epee',
    },
    {
        title: "Men's Saber",
        url: 'fencers/mens/saber',
    },
    {
        title: "Women's Foil",
        url: 'fencers/womens/foil',
    },
    {
        title: "Women's Epee",
        url: 'fencers/womens/epee',
    },
    {
        title: "Women's Saber",
        url: 'fencers/womens/saber',
    },
];

const paths: PathHeading[] = [
    {heading: 'Fencers', subPaths: fencerPaths},
    {
        heading: 'Teams',
        subPaths: [
            {title: "Men's", url: '/teams/mens'},
            {title: "Women's", url: '/teams/womens'},
        ],
    },
    {
        heading: 'Squads',
        subPaths: [
            {title: "Men's Foil", url: 'squads/mens/foil'},
            {title: "Men's Epee", url: 'squads/mens/epee'},
            {title: "Men's Saber", url: 'squads/mens/saber'},
            {title: "Women's Foil", url: 'squads/womens/foil'},
            {title: "Women's Epee", url: 'squads/womens/epee'},
            {title: "Women's Saber", url: 'squads/womens/saber'},
        ],
    },
];

export default function Navbar(): JSX.Element {
    return (
        <div className="sticky top-0 z-10 flex flex-row justify-between p-6 backdrop-blur-md">
            <h1 className="text-2xl font-extrabold">
                <span className="text-primary">nonstop</span>fencing
            </h1>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/">
                            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                                Rankings
                            </NavigationMenuTrigger>
                        </Link>
                        <NavigationMenuContent>
                            <ul className="flex flex-row gap-4 p-6">
                                {paths.map((path) => (
                                    <SubPathsSection subPath={path} />
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/about">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

function SubLinkItem({href, title}: {href: string; title: string}): JSX.Element {
    return (
        <li className={cn(buttonVariants({variant: 'link'}), 'h-fit w-fit text-nowrap p-0')}>
            <NavigationMenuLink asChild>
                <Link href={href}>{title}</Link>
            </NavigationMenuLink>
        </li>
    );
}

function SubLinksHeading({children}: {children: string}): JSX.Element {
    return (
        <Link passHref legacyBehavior href={`/`}>
            <p className="font-medium">{children}</p>
        </Link>
    );
}

function SubPathsSection({subPath}: {subPath: PathHeading}): JSX.Element {
    return (
        <li className="flex flex-col gap-1">
            <SubLinksHeading>{subPath.heading}</SubLinksHeading>
            <ul className="grid gap-2">
                {subPath.subPaths.map((path) => (
                    <SubLinkItem href={path.url} title={path.title} />
                ))}
            </ul>
        </li>
    );
}

type Path = {
    title: string;
    url: string;
};

type PathHeading = {
    heading: string;
    subPaths: Path[];
};
