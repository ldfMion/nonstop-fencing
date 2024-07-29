"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const paths = ["Fencers", "Latest Results", "About"];

export default function Navbar(): JSX.Element {
  return (
    <div className="bg-background sticky top-0 flex flex-row justify-between bg-opacity-20 p-6 text-2xl font-extrabold backdrop-blur-sm">
      <h1>
        <span className="text-primary">nonstop</span>fencing
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          {paths.map((path) => (
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                key={path}
              >
                {path}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
