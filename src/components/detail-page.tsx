import type { ReactNode } from "react";

type DetailPageProps = {
    back?: ReactNode;
    hero?: ReactNode;
    header: ReactNode;
    sidebar?: ReactNode;
    body?: ReactNode;
};

export function DetailPage({
    back,
    hero,
    header,
    sidebar,
    body,
}: DetailPageProps) {
    return (
        <article className="container mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
            {back}
            {hero}
            {sidebar ? (
                // `min-w-0` on every grid child: without it each child gets an automatic
                // minimum width equal to its min-content, so the header grows past the
                // column as soon as a title is long. The track is already
                // minmax(0,1fr); it is the children that lack permission to shrink.
                // `lg:grid-rows-[auto_1fr]`: the sidebar spans both rows, and with auto
                // rows a tall sidebar would stretch row 1 and push the description far
                // down the page. With a flexible row 2 the body takes the extra height
                // and the header keeps its own.
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_1fr] lg:gap-8">
                    <header className="flex min-w-0 flex-col gap-4 lg:col-start-1 lg:row-start-1">
                        {header}
                    </header>
                    <aside className="flex min-w-0 flex-col gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
                        {sidebar}
                    </aside>
                    <div className="flex min-w-0 flex-col gap-6 lg:col-start-1 lg:row-start-2">
                        {body}
                    </div>
                </div>
            ) : (
                <>
                    <header className="flex min-w-0 flex-col gap-4">
                        {header}
                    </header>
                    <div className="flex min-w-0 flex-col gap-6">{body}</div>
                </>
            )}
        </article>
    );
}
