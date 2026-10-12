import { SquareArrowOutUpRight, User } from "lucide-react";
import { Link } from "react-router";

import { TihldeLogo } from "#/components/icons/tihlde";
import { type NavItem, type NavLink } from "#/components/site-nav-items";
import { ThemeSwitcher } from "#/components/theme-switcher";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "#/components/ui/navigation-menu";

export function SiteHeader({ navItems }: { navItems: NavItem[] }) {
    return (
        <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur">
            <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
                <Link
                    to="/"
                    aria-label="Forside"
                    className="flex items-center"
                    style={{ color: "var(--color-logo, currentColor)" }}
                >
                    <TihldeLogo variant="full" className="h-5 w-auto" />
                </Link>

                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {navItems.map((item) =>
                            item.kind === "group" ? (
                                <NavigationMenuItem key={item.label}>
                                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-fit max-w-xl grid-cols-3 gap-2 p-4">
                                            {item.items.map((sub) => (
                                                <li key={sub.label}>
                                                    <NavigationMenuLink
                                                        render={renderLink(sub)}
                                                        closeOnClick={true}
                                                    >
                                                        <div className="relative flex flex-col gap-1">
                                                            <span className="font-medium">{sub.label}</span>
                                                            {sub.description ? (
                                                                <span className="text-muted-foreground">
                                                                    {sub.description}
                                                                </span>
                                                            ) : null}
                                                            {sub.kind === "external" ? (
                                                                <SquareArrowOutUpRight
                                                                    className="absolute top-0 right-0 size-4"
                                                                    aria-hidden
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ) : (
                                <NavigationMenuItem key={item.label}>
                                    <NavigationMenuLink render={renderLink(item)}>
                                        <span className="flex items-center gap-1">
                                            {item.label}
                                            {item.kind === "external" ? (
                                                <SquareArrowOutUpRight className="size-3.5" aria-hidden />
                                            ) : null}
                                        </span>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ),
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                    <Avatar className="size-8">
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}

function renderLink(link: NavLink) {
    if (link.kind === "internal") {
        return <Link to={link.to} />;
    }

    if (link.sameTab) {
        return <a href={link.href} />;
    }

    return <a href={link.href} target="_blank" rel="noopener noreferrer" />;
}
