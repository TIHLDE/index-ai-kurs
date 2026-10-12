

type DetailIdentityProps = {
    name: string;
    logoUrl?: string;
};

export function DetailIdentity({ name, logoUrl }: DetailIdentityProps) {
    return (
        // `truncate` on the name only works if the row itself may shrink.
        // Without `min-w-0` a long group name sets the width of the whole header.
        <div className="flex min-w-0 items-center gap-3">
            {logoUrl ? (
                <img
                    alt={name}
                    src={logoUrl}
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-lg object-cover"
                />
            ) : null}
            <span className="truncate font-medium">{name}</span>
        </div>
    );
}
