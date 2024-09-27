'use client';
import Link from 'next/link';
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger, navigationMenuTriggerStyle} from '~/components/ui/navigation-menu';
import {buttonVariants} from '../ui/button';
import {cn} from '~/lib/utils';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {MenuIcon} from 'lucide-react';
import {useState} from 'react';
import {PATHS} from '../../content/paths';
import type {PathHeading} from '../../content/paths';

function DesktopNavbar(): JSX.Element {
    return (
        <div className="hidden flex-row justify-between py-6 md:flex">
            <Link href="/">
                <h1 className="text-2xl font-extrabold">
                    <span className="text-primary">nonstop</span>fencing
                </h1>
            </Link>
            <NavigationMenu>
                <NavigationMenuList className="flex flex-row gap-2">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>Rankings</NavigationMenuTrigger>
                        </Link>
                        <NavigationMenuContent>
                            <ul className="flex flex-row gap-4 p-6">
                                {PATHS.map((path) => (
                                    <SubPathsSection subPath={path} key={path.heading} />
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/about" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

function MobileNavbar(): JSX.Element {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-row items-center justify-between py-4 md:hidden">
            <h1 className="text-xl font-extrabold">
                <span className="text-primary">nonstop</span>fencing
            </h1>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent className="p-10">
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col items-start">
                            <MobileBaseLink href="/about" title="About" onOpenChange={setOpen} />
                            <MobileBaseLink href="/" title="Rankings" onOpenChange={setOpen} />
                            <NavigationMenuItem>
                                <NavigationMenuList id="navmenulist" className="ml-2 flex flex-col items-start gap-4">
                                    {PATHS.map((path) => (
                                        <MobileLink onOpenChange={setOpen} key={path.heading}>
                                            <SubPathsSection subPath={path} />
                                        </MobileLink>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </SheetContent>
            </Sheet>
        </div>
    );
}

function SubLinkItem({href, title}: {href: string; title: string}): JSX.Element {
    return (
        <li className={cn(buttonVariants({variant: 'link'}), 'h-fit w-fit text-nowrap p-0 text-foreground')}>
            <NavigationMenuLink asChild>
                <Link href={href} legacyBehavior>
                    {title}
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

function SubLinksHeading({children}: {children: string}): JSX.Element {
    return (
        <Link href={`/`}>
            <p className="font-bold text-primary">{children}</p>
        </Link>
    );
}

function SubPathsSection({subPath}: {subPath: PathHeading}): JSX.Element {
    return (
        <li className="flex flex-col gap-1">
            <SubLinksHeading>{subPath.heading}</SubLinksHeading>
            <ul className="grid gap-2">
                {subPath.subPaths.map((path) => (
                    <SubLinkItem href={path.url} title={path.title} key={path.title} />
                ))}
            </ul>
        </li>
    );
}

function MobileBaseLink({href, title, onOpenChange}: {href: string; title: string; onOpenChange: (open: boolean) => void}): JSX.Element {
    return (
        <MobileLink onOpenChange={onOpenChange}>
            <NavigationMenuItem>
                <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(buttonVariants({variant: 'link'}), 'p-0 text-lg text-foreground')}>{title}</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </MobileLink>
    );
}

function MobileLink({onOpenChange, children}: {onOpenChange: (open: boolean) => void; children: React.ReactNode}) {
    return <div onClick={() => onOpenChange(false)}>{children}</div>;
}

export {MobileNavbar, DesktopNavbar};
