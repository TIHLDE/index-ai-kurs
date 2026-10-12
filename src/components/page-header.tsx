import { Reveal } from "#/components/ui/motion";
import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    description?: ReactNode;
    action?: ReactNode;
};

/**
 * Shared header for the list pages: a title, an optional supporting
 * description, and an optional action slot aligned to the end.
 */
export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <Reveal
            render={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" />
            }
        >
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl">{title}</h1>
                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
            </div>
            {action && <div className="flex shrink-0 gap-2">{action}</div>}
        </Reveal>
    );
}
