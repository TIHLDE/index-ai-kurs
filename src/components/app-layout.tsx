import { Outlet } from "react-router";

import { SiteBottomBar } from "#/components/site-bottom-bar";
import { SiteFooter } from "#/components/site-footer";
import { SiteHeader } from "#/components/site-header";
import { navItems } from "#/components/site-nav-items";

export function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col pb-16 lg:pb-0">
            <SiteHeader navItems={navItems} />
            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>
            <SiteFooter />
            <SiteBottomBar navItems={navItems} />
        </div>
    );
}
