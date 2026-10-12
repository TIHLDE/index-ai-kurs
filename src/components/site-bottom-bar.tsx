import { Calendar, Menu, SquareArrowOutUpRight, UsersRound } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

import { TihldeLogo } from "#/components/icons/tihlde";
import { type NavItem, type NavLink } from "#/components/site-nav-items";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "#/components/ui/accordion";
import { BottomBar, BottomBarItem } from "#/components/ui/bottom-bar";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "#/components/ui/drawer";

export function SiteBottomBar({ navItems }: { navItems: NavItem[] }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);
    const { pathname } = useLocation();
    const statusFor = (isActive: boolean) => (isActive ? "active" : undefined);

    return (
        <BottomBar className="lg:hidden">
            <div className="flex items-stretch justify-between gap-1 px-2 py-1">
                <BottomBarItem render={<Link to="/" data-status={statusFor(pathname === "/")} />}>
                    <div className="size-5">
                        <TihldeLogo />
                    </div>
                    Hjem
                </BottomBarItem>

                <BottomBarItem
                    render={
                        <Link
                            to="/arrangementer"
                            data-status={statusFor(pathname.startsWith("/arrangementer"))}
                        />
                    }
                >
                    <Calendar />
                    Arrangementer
                </BottomBarItem>

                <BottomBarItem
                    render={<Link to="/grupper" data-status={statusFor(pathname.startsWith("/grupper"))} />}
                >
                    <UsersRound />
                    Grupper
                </BottomBarItem>

                <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
                    <DrawerTrigger asChild>
                        <BottomBarItem aria-label="Åpne meny" className="relative">
                            <Menu />
                            Meny
                        </BottomBarItem>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="flex flex-row items-center gap-2">
                            <div className="size-7">
                                <TihldeLogo />
                            </div>
                            <DrawerTitle>Meny</DrawerTitle>
                        </DrawerHeader>

                        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 pb-8">
                            {navItems.map((item) =>
                                item.kind === "group" ? (
                                    <Accordion key={item.label}>
                                        <AccordionItem value={item.label} className="border-none">
                                            <AccordionTrigger>{item.label}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col pl-2">
                                                    {item.items.map((sub) => (
                                                        <MenuLink
                                                            key={sub.label}
                                                            link={sub}
                                                            onNavigate={closeMenu}
                                                        />
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <MenuLink key={item.label} link={item} onNavigate={closeMenu} />
                                ),
                            )}
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </BottomBar>
    );
}

function MenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
    if (link.kind === "external") {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 py-2"
                onClick={onNavigate}
            >
                {link.label}
                <SquareArrowOutUpRight className="size-3.5" aria-hidden />
            </a>
        );
    }

    return (
        <Link to={link.to} className="flex items-center gap-2 py-2" onClick={onNavigate}>
            {link.label}
        </Link>
    );
}
