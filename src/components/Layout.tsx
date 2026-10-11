import { Link, NavLink, Outlet } from "react-router";

const navLinks = [
    { to: "/", label: "Forside" },
    { to: "/arrangementer", label: "Arrangementer" },
    { to: "/grupper", label: "Grupper" },
];

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <Link to="/" className="text-xl font-bold text-brand-700">
                        Mini-Kvark
                    </Link>
                    <nav className="flex gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === "/"}
                                className={({ isActive }) =>
                                    `rounded-md px-3 py-2 text-sm font-medium ${
                                        isActive
                                            ? "bg-brand-50 text-brand-700"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
                <Outlet />
            </main>
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-500">
                    Mini-Kvark er en øvingsside for Index. Alt innhold er oppdiktet.
                </div>
            </footer>
        </div>
    );
}
