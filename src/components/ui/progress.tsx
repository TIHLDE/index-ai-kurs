import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "#/lib/utils";

/**
 * The percentage that is read aloud, formatted the same on server and client.
 *
 * Without this, Base UI formats it with `Intl.NumberFormat` and the default
 * locale on each side: the server writes "40%" and the browser "40 %" (with a
 * non-breaking space), which made React throw a hydration error on
 * `aria-valuetext` for every progress bar on the page.
 */
function progressAriaValueText(
    _formattedValue: string | null,
    value: number | null,
) {
    return value === null ? "" : `${value} %`;
}

function Progress({
    className,
    children,
    value,
    ...props
}: ProgressPrimitive.Root.Props) {
    return (
        <ProgressPrimitive.Root
            value={value}
            getAriaValueText={progressAriaValueText}
            data-slot="progress"
            className={cn("flex flex-wrap gap-3", className)}
            {...props}
        >
            {children}
            <ProgressTrack>
                <ProgressIndicator />
            </ProgressTrack>
        </ProgressPrimitive.Root>
    );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
    return (
        <ProgressPrimitive.Track
            className={cn(
                "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
                className,
            )}
            data-slot="progress-track"
            {...props}
        />
    );
}

function ProgressIndicator({
    className,
    ...props
}: ProgressPrimitive.Indicator.Props) {
    return (
        <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className={cn(
                "h-full bg-primary transition-[width,transform,translate]",
                className,
            )}
            {...props}
        />
    );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
    return (
        <ProgressPrimitive.Label
            className={cn("min-w-0 text-sm font-medium", className)}
            data-slot="progress-label"
            {...props}
        />
    );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
    return (
        <ProgressPrimitive.Value
            className={cn(
                "ml-auto text-sm text-muted-foreground tabular-nums",
                className,
            )}
            data-slot="progress-value"
            {...props}
        />
    );
}

export {
    Progress,
    ProgressTrack,
    ProgressIndicator,
    ProgressLabel,
    ProgressValue,
};
