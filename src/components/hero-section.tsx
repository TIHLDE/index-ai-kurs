import {
    TILDE_BOX,
    TILDE_PATH,
    TILDE_TRANSFORM,
} from "#/components/icons/tihlde";
import { cn } from "#/lib/utils";
import React from "react";

const lineCount = 32;
const svgWidth = 1440;
const svgHeight = 720;
const svgCenterY = svgHeight / 2;
const waveLoopDistance = (svgWidth * 2) / 3;
const waveDrawEnd = svgWidth + waveLoopDistance;
const waveSegmentWidth = svgWidth / 12;
const formatCoordinate = (value: number) => value.toFixed(1);

// The drawn strip is wider than the hero so it can loop: the scroll layer is
// `waveDrawEnd` units wide and slides left by exactly `waveLoopDistance`, which
// is one wavelength of the pattern, so the frame it lands on is identical to
// the one it started from. Both are expressed as percentages because the
// animation lives in CSS; see `hero-waves-drift` in styles.css.
const scrollLayerWidthPercent = (waveDrawEnd / svgWidth) * 100;
const scrollLoopPercent = (waveLoopDistance / waveDrawEnd) * 100;

// Animation fade on top and bottom edges.
const edgeFadeTop = 0.22;
const edgeFadeBottom = 0.82;
const edgeFadeStops = 14;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const edgeFadeRamp = (from: number, to: number) =>
    Array.from({ length: edgeFadeStops }, (_, i) => {
        const t = i / (edgeFadeStops - 1);
        return {
            offset: from + (to - from) * t,
            opacity: smoothstep(t),
        };
    });

const edgeFadeMask = `linear-gradient(to bottom, ${[
    ...edgeFadeRamp(0, edgeFadeTop),
    ...edgeFadeRamp(1, edgeFadeBottom).reverse(),
]
    .map(
        ({ offset, opacity }) =>
            `rgb(0 0 0 / ${opacity.toFixed(3)}) ${(offset * 100).toFixed(1)}%`,
    )
    .join(", ")})`;

// The tilde from the logo sits as a dimmed area in the waves: the lines inside
// it are fainter than the rest, so the shape appears as negative space.
// `tildeMaskDip` is how much is taken away; the rest of the hero is untouched.
const tildeMaskDip = 0.75;
// Softens the edge. The blur lives inside the mask image; a CSS blur on the
// layer would also smear the waves. The padding gives the blur room to fade.
const tildeMaskBlur = 4;
const tildeMaskPadding = 32;
// Thickens the band without making the shape wider on screen: a stroke along
// the same curve adds half its width outside the outline all the way round.
// The viewBox stays put, so the tilde covers the same width, only thicker.
const tildeMaskThickness = 24;

const tildeMaskSvg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${TILDE_BOX.x - tildeMaskPadding} ${TILDE_BOX.y - tildeMaskPadding} ${TILDE_BOX.width + tildeMaskPadding * 2} ${TILDE_BOX.height + tildeMaskPadding * 2}">`,
    `<filter id="soften" x="-25%" y="-50%" width="150%" height="200%">`,
    `<feGaussianBlur stdDeviation="${tildeMaskBlur}"/>`,
    `</filter>`,
    // The dimming is on the group, not on stroke and fill separately. Otherwise
    // the overlap between them would add up to a darker edge.
    `<g opacity="${tildeMaskDip}" filter="url(#soften)">`,
    `<path d="${TILDE_PATH}" transform="${TILDE_TRANSFORM}" fill="black" stroke="black" stroke-width="${tildeMaskThickness}" stroke-linejoin="round"/>`,
    `</g>`,
    `</svg>`,
].join("");

// Wider than the hero so the shape is large enough to read: the thin tips
// run past the edge while the curve itself stays well inside.
const tildeMaskWidthPercent = 130;

// The edge fade is on top and subtracts the tilde layer from itself, so the
// mask is full in the middle, fades towards top and bottom, and is dimmed
// where the tilde sits. The whole mask is built here, inline: `mask-image` in
// the stylesheet is overridden by the `style` attribute anyway, so two half
// masks cannot live side by side. One of them would silently disappear.
//
// The tilde keeps its own aspect ratio (`auto` reads the height from the
// viewBox) instead of being stretched with the hero the way the waves are.
// Stretched over a tall mobile screen it turned into a diagonal blob.
const heroMaskLayers = {
    maskImage: `${edgeFadeMask}, url("data:image/svg+xml,${encodeURIComponent(tildeMaskSvg)}")`,
    maskSize: `100% 100%, ${tildeMaskWidthPercent}% auto`,
    maskPosition: "center, center",
    maskRepeat: "no-repeat, no-repeat",
    maskComposite: "subtract, add",
} as const;

type WaveConfig = {
    yBase: number;
    amp: number;
    phase: number;
    width: number;
    startX: number;
    endX: number;
};

function sampleWave(x: number, { yBase, amp, phase, width }: WaveConfig) {
    const normalizedX = x / width;
    const primaryPhase = normalizedX * Math.PI * 3 + phase;
    const secondaryPhase = normalizedX * Math.PI * 6 + phase * 1.6;

    return {
        y:
            yBase +
            Math.sin(primaryPhase) * amp * 0.5 +
            Math.sin(secondaryPhase) * amp * 0.3,
        slope:
            Math.cos(primaryPhase) * amp * 0.5 * ((Math.PI * 3) / width) +
            Math.cos(secondaryPhase) * amp * 0.3 * ((Math.PI * 6) / width),
    };
}

function buildWavePath(config: WaveConfig) {
    let current = sampleWave(config.startX, config);
    let path = `M ${formatCoordinate(config.startX)} ${formatCoordinate(current.y)}`;

    for (let x0 = config.startX; x0 < config.endX; x0 += waveSegmentWidth) {
        const x1 = Math.min(x0 + waveSegmentWidth, config.endX);
        const next = sampleWave(x1, config);
        const controlOffset = (x1 - x0) / 3;

        path += ` C ${formatCoordinate(x0 + controlOffset)} ${formatCoordinate(
            current.y + current.slope * controlOffset,
        )} ${formatCoordinate(x1 - controlOffset)} ${formatCoordinate(
            next.y - next.slope * controlOffset,
        )} ${formatCoordinate(x1)} ${formatCoordinate(next.y)}`;

        current = next;
    }

    return path;
}

const wavePaths = Array.from({ length: lineCount }).map((_, i) => {
    const yBase = (i / (lineCount - 1)) * svgHeight;
    const depth = Math.abs(yBase - svgCenterY) / svgCenterY;

    return buildWavePath({
        yBase,
        amp: 22 + (1 - depth) * 38,
        phase: i * 0.22,
        width: svgWidth,
        startX: 0,
        endX: waveDrawEnd,
    });
});

/**
 * One copy of the wave strip. `preserveAspectRatio="none"` stretches it to fill
 * whatever box it is given, so every copy lines up pixel for pixel with the
 * others regardless of the hero's aspect ratio.
 */
function WaveStrip({
    stroke,
    strokeWidth,
    strokeOpacity,
    keyPrefix,
}: {
    stroke: string;
    strokeWidth: number;
    strokeOpacity?: number;
    keyPrefix: string;
}) {
    return (
        <svg
            viewBox={`0 0 ${waveDrawEnd} ${svgHeight}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
        >
            {wavePaths.map((path, i) => (
                <path
                    key={`${keyPrefix}-${i}`}
                    d={path}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeOpacity={strokeOpacity}
                />
            ))}
        </svg>
    );
}

export function HeroSectionBackground({ className }: { className?: string }) {
    return (
        <div
            data-slot="hero-waves"
            className={cn(
                // The height comes from `inset-0` alone. A fixed height here could be
                // taller than the section, and `overflow-hidden` would then cut the
                // waves off at the bottom instead of letting them fill the section.
                "absolute inset-0 overflow-hidden text-black",
                className,
            )}
            style={
                {
                    "--hero-waves-loop": `${scrollLoopPercent}%`,
                    ...heroMaskLayers,
                } as React.CSSProperties
            }
            aria-hidden
        >
            <div className="absolute inset-0 opacity-40 dark:opacity-[0.28]">
                <div
                    data-slot="hero-waves-drift"
                    className="absolute inset-y-0 left-0 min-w-[1800px]"
                    style={{ width: `${scrollLayerWidthPercent}%` }}
                >
                    <WaveStrip
                        keyPrefix="line"
                        stroke="currentColor"
                        strokeWidth={0.8}
                    />
                </div>
            </div>
        </div>
    );
}
