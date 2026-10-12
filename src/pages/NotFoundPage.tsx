import { Link } from "react-router";

import { Button } from "#/components/ui/button";

export function NotFoundPage() {
    return (
        <div className="container mx-auto flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
            <h1 className="text-3xl">Fant ikke siden</h1>
            <p className="text-muted-foreground">Siden du leter etter finnes ikke.</p>
            <Button render={<Link to="/" />}>Gå til forsiden</Button>
        </div>
    );
}
