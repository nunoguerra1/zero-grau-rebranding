"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";

const STEPS = ["one", "two", "three"] as const;

// Where each step node sits on the ring (percent of the box), clockwise from the top
const NODES = [
    { x: 50, y: 10 },
    { x: 84.64, y: 70 },
    { x: 15.36, y: 70 },
];

const NODE_IDLE = { backgroundColor: "#ffc800", color: "#06123d" };
const NODE_ACTIVE = { backgroundColor: "#06123d", color: "#ffc800" };

export function ReturnableSteps() {
    const t = useTranslations("Returnables");
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const steps = gsap.utils.toArray<HTMLElement>(".ret-step");
                const nodes = gsap.utils.toArray<HTMLElement>(".ret-node");

                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 2.2}`,
                        pin: true,
                        scrub: 0.6,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                tl.fromTo(".ret-progress", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0).fromTo(
                    ".ret-dot",
                    { rotation: 0, svgOrigin: "100 100" },
                    { rotation: 360, svgOrigin: "100 100", duration: 1 },
                    0,
                );

                nodes.forEach((node, i) => {
                    if (i === 0) gsap.set(node, NODE_ACTIVE);
                    else tl.fromTo(node, NODE_IDLE, { ...NODE_ACTIVE, duration: 0.06 }, i / 3);
                });

                steps.forEach((step, i) => {
                    if (i === 0) gsap.set(step, { autoAlpha: 1 });
                    else tl.fromTo(step, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.1 }, i / 3);

                    if (i < steps.length - 1) {
                        tl.to(step, { autoAlpha: 0, y: -24, duration: 0.1 }, (i + 1) / 3 - 0.1);
                    }
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            aria-labelledby="returnables-steps-title"
            className="bg-sun-400 text-navy-950 relative flex h-svh items-center overflow-hidden motion-reduce:h-auto motion-reduce:py-24"
        >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-4 px-5 pt-20 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pt-16">
                <div className="order-2 lg:order-1">
                    <h2 id="returnables-steps-title" className="font-display text-title uppercase">
                        {t("stepsTitle")}
                    </h2>

                    <div className="relative mt-5 grid motion-reduce:flex motion-reduce:flex-col motion-reduce:gap-6">
                        {STEPS.map((key, i) => (
                            <div key={key} className="ret-step [grid-area:1/1] motion-reduce:[grid-area:auto]">
                                <p className="font-display text-3xl leading-none lg:text-7xl">0{i + 1}</p>
                                <h3 className="font-display text-headline leading-none uppercase">
                                    {t(`steps.${key}.title`)}
                                </h3>
                                <p className="mt-2 max-w-md text-lg">{t(`steps.${key}.body`)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Button href="/donde-comprar" variant="dark" arrow>
                            {t("cta")}
                        </Button>
                    </div>
                </div>

                <div className="relative order-1 mx-auto aspect-square w-[min(80vw,36svh)] lg:order-2 lg:w-[min(36vw,64svh)]">
                    <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 size-full">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" />
                        <circle
                            className="ret-progress"
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeLinecap="round"
                            pathLength={1}
                            strokeDasharray="1 1"
                            transform="rotate(-90 100 100)"
                        />
                        <g className="ret-dot">
                            <circle cx="100" cy="20" r="7" fill="currentColor" />
                        </g>
                    </svg>

                    <div className="absolute inset-x-[35%] inset-y-[16%]">
                        <Image
                            src="/products/zero-grau-600ml.png"
                            alt={t("bottleAlt")}
                            fill
                            sizes="(min-width: 1024px) 14vw, 28vw"
                            className="object-contain drop-shadow-[0_20px_28px_rgba(6,18,61,0.35)]"
                        />
                    </div>

                    {NODES.map((p, i) => (
                        <span
                            key={i}
                            aria-hidden
                            className="ret-node border-navy-950 bg-sun-400 text-navy-950 motion-reduce:bg-navy-950 motion-reduce:text-sun-400 absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-sm font-bold lg:size-12 lg:text-lg"
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}