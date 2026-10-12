import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "#/components/ui/badge";
import { IMAGE_PRESETS } from "#/components/ui/image-preset";
import { useRender } from "#/hooks/use-render";
import { DEFAULT_COVER_IMAGE } from "#/lib/image";

export type ListCardMetaRow = {
    icon: LucideIcon;
    text: ReactNode;
};

type ListCardProps = {
    render?: useRender.RenderProp;
    title: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    imageBadge?: ReactNode;
    titleBadge?: ReactNode;
    meta: ListCardMetaRow[];
};

export function ListCard({
    render,
    title,
    imageUrl,
    imageAlt,
    imageBadge,
    titleBadge,
    meta,
}: ListCardProps) {
    return useRender({
        render: render ?? <div />,
        props: {
            "data-slot": "list-card",
            className:
                "-mx-2 flex flex-col gap-3 rounded-xl px-2 py-3.5 transition-colors hover:bg-muted sm:flex-row",
            children: (
                <>
                    <div
                        className={`relative ${IMAGE_PRESETS["cover-wide"].aspectClassName} w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-52 sm:self-start`}
                    >
                        <img
                            src={imageUrl || DEFAULT_COVER_IMAGE}
                            alt={imageAlt ?? ""}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover"
                        />
                        {imageBadge ? (
                            <Badge className="absolute right-2 bottom-2">{imageBadge}</Badge>
                        ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-1 text-lg sm:text-xl">{title}</h3>
                            {titleBadge ? <div className="shrink-0">{titleBadge}</div> : null}
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            {meta.map((row, i) => (
                                <div key={i} className="flex min-w-0 items-center gap-2">
                                    <row.icon className="size-4 shrink-0" />
                                    <span className="truncate">{row.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ),
        },
    });
}
