import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "#/lib/utils";

/**
 * Puts the bar back in place when iOS Safari has lost it.
 *
 * Safari paints `position: fixed` in its own layer, and that layer does not
 * always follow when the viewport changes while the page is in the
 * background. Returning from another app is such a moment: the page is
 * frozen, and when the user comes back the bar is left in the middle of the
 * screen. Nothing in CSS can express "repaint this", so we force a new
 * layout of the element when the page becomes visible again. It costs
 * nothing when everything is as it should be.
 */
function useRepinOnViewportChange(ref: React.RefObject<HTMLElement | null>) {
    React.useEffect(() => {
        const node = ref.current;
        if (!node) return;

        function repin() {
            if (!node) return;
            const previous = node.style.display;
            node.style.display = "none";
            // The read is the point: it forces layout before display is restored.
            // Otherwise the browser collapses the two changes into none at all.
            void node.offsetHeight;
            node.style.display = previous;
        }

        function onPageShow(event: PageTransitionEvent) {
            // Only the restored page matters; a fresh load never has a stale
            // layer to correct.
            if (event.persisted) repin();
        }

        function onVisibilityChange() {
            if (document.visibilityState === "visible") repin();
        }

        // Only these two events: `visualViewport` changes fire in quick
        // succession while Safari hides the address bar during scrolling, and
        // a new layout per event would cost more than it fixes.
        window.addEventListener("pageshow", onPageShow);
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            window.removeEventListener("pageshow", onPageShow);
            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange,
            );
        };
    }, [ref]);
}

function BottomBar({ className, ref, ...props }: React.ComponentProps<"nav">) {
    const innerRef = React.useRef<HTMLElement | null>(null);
    useRepinOnViewportChange(innerRef);

    return (
        <nav
            data-slot="bottom-bar"
            ref={(node) => {
                innerRef.current = node;
                if (typeof ref === "function") return ref(node);
                if (ref) ref.current = node;
            }}
            className={cn(
                // `pb-safe` keeps the row clear of the iOS home indicator, which
                // otherwise sits right on top of the labels.
                //
                // No `backdrop-filter` here, unlike the header: a fixed element with
                // a backdrop blur gets its own compositing layer in WebKit, and
                // those are exactly the layers that get stuck in the wrong place.
                // The background is therefore opaque enough to stand on its own.
                "fixed inset-x-0 bottom-0 z-40 border-t bg-background pb-[env(safe-area-inset-bottom)]",
                className,
            )}
            {...props}
        />
    );
}

type BottomBarItemProps = React.ComponentProps<"button"> & {
    render?: useRender.RenderProp;
};

function BottomBarItem({ className, render, ...props }: BottomBarItemProps) {
    return useRender({
        render: render ?? <button type="button" />,
        props: {
            "data-slot": "bottom-bar-item",
            className: cn(
                // The link for the current page carries data-status=active;
                // anything else (the menu button) simply never gets the attribute.
                // `wrap-normal` overrides the global `overflow-wrap: anywhere`: the
                // labels here are short and fixed, and must never be split in the
                // middle of a word. They shrink the text instead.
                "flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-center text-[0.6875rem] font-medium wrap-normal text-muted-foreground outline-none transition-colors select-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[status=active]:text-foreground [&_svg]:size-5 [&_svg]:shrink-0",
                className,
            ),
            ...props,
        },
    });
}

export { BottomBar, BottomBarItem };
