import { Link } from "react-router";

export function NotFoundPage() {
    return (
        <div className="py-16 text-center">
            <h1 className="text-3xl font-bold">Fant ikke siden</h1>
            <p className="mt-2 text-slate-600">Siden du leter etter finnes ikke.</p>
            <Link to="/" className="mt-6 inline-block font-medium text-brand-700 hover:underline">
                Gå til forsiden
            </Link>
        </div>
    );
}
