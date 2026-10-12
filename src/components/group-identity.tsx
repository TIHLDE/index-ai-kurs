import { Mail } from "lucide-react";

export type GroupIdentityProps = {
    name: string;
    email?: string;
    logoUrl?: string;
};

export function GroupIdentity({ name, email, logoUrl }: GroupIdentityProps) {
    return (
        <>
            {logoUrl ? (
                <img
                    alt={name}
                    className="size-16 shrink-0 rounded-lg object-cover"
                    src={logoUrl}
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                    {name.slice(0, 2).toUpperCase()}
                </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col text-left">
                <span className="truncate font-medium">{name}</span>
                {email ? (
                    <span className="flex items-center gap-1 truncate text-muted-foreground">
                        <Mail className="size-3 shrink-0" />
                        <span className="truncate">{email}</span>
                    </span>
                ) : null}
            </div>
        </>
    );
}
