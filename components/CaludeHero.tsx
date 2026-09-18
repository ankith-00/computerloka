"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });

const services = [
    {
        id: "laptop",
        label: "Laptop repair",
        headline: "We fix what's slowing your laptop down",
        description:
            "Screen cracks, dead batteries, spilled coffee — we replace only what's broken, with genuine parts and most repairs done the same day.",
        stat: "80% of repairs finish same-day",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80",
        primary: { label: "Get a free quote", href: "/free-consultation" },
        secondary: { label: "See laptop services", href: "/services/laptop/screen-replacement" },
    },
    {
        id: "mobile",
        label: "Mobile repair",
        headline: "Cracked screen? Back to new in under an hour",
        description:
            "Original-spec glass, OLED panels, charging ports and cameras. We open it, fix it, and hand it back working — no loaner, no week-long wait.",
        stat: "Avg. screen swap: 45 minutes",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
        primary: { label: "Get a free quote", href: "/free-consultation" },
        secondary: { label: "See mobile services", href: "/services/mobile/screen-repair" },
    },
    {
        id: "wifi",
        label: "Wi-Fi & networking",
        headline: "Wi-Fi that reaches every room, every time",
        description:
            "We map your space, place the mesh points where signal actually drops, and leave you with a network built for how you use it.",
        stat: "Dead zones gone in one visit",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
        primary: { label: "Get a free quote", href: "/free-consultation" },
        secondary: { label: "See networking", href: "/services/wifi/home-setup" },
    },
    {
        id: "web",
        label: "Web development",
        headline: "Websites built to load fast and convert faster",
        description:
            "From a single landing page to a full product, we design and ship mobile-first sites that hold up under real traffic.",
        stat: "Launch in as little as 2 weeks",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
        primary: { label: "Start a project", href: "/web-development" },
        secondary: { label: "Get a free quote", href: "/free-consultation" },
    },
    {
        id: "marketplace",
        label: "Marketplace",
        headline: "Certified refurbished laptops and phones",
        description:
            "Every device is tested, graded and backed by warranty — solid hardware at a price that isn't retail.",
        stat: "12-month warranty on every unit",
        image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80",
        primary: { label: "Browse marketplace", href: "/marketplace" },
        secondary: { label: "Get a free quote", href: "/free-consultation" },
    },
];

const AUTOPLAY_MS = 6000;

export default function Hero() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const reducedMotion = useRef(false);
    const count = services.length;
    const active = services[index];

    const goTo = useCallback(
        (next: number) => setIndex(((next % count) + count) % count),
        [count]
    );

    useEffect(() => {
        reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion.current) return;
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (paused) return;
        const startedAt = Date.now();
        setProgress(0);
        let raf: number;
        const tick = () => {
            const elapsed = Date.now() - startedAt;
            setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
            if (elapsed < AUTOPLAY_MS) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, [index, paused, goTo]);

    const fade = Math.max(1 - scrollY / 500, 0);
    const lift = Math.min(scrollY * 0.25, 120);
    const gridShift = scrollY * 0.12;

    return (
        <section
            aria-label="Featured services"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative overflow-hidden bg-[#0c0d0f]"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        "linear-gradient(#f3f2ee 1px, transparent 1px), linear-gradient(90deg, #f3f2ee 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    transform: `translateY(${gridShift}px)`,
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#ff7a33]/10 blur-[140px]"
            />

            <div
                className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
                style={{ opacity: fade, transform: `translateY(-${lift}px)` }}
            >
                <div className="grid gap-12 lg:grid-cols-[1.1fr_400px] lg:items-start">
                    <div className="min-w-0">
                        <p className="text-sm text-[#9b9a96]">
                            {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")} — {active.label}
                        </p>

                        <h1
                            key={active.id}
                            className={`${spaceGrotesk.className} mt-5 max-w-xl text-4xl font-medium leading-[1.08] tracking-tight text-[#f3f2ee] sm:text-5xl lg:text-6xl animate-[fadeUp_0.5s_ease-out]`}
                        >
                            {active.headline}
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-relaxed text-[#b3b2ad] sm:text-lg">
                            {active.description}
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={active.primary.href}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ff7a33] px-7 py-3.5 text-sm font-semibold text-[#0c0d0f] transition-colors hover:bg-[#ff9257]"
                            >
                                {active.primary.label}
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M19 12H6" />
                                </svg>
                            </Link>
                            <Link
                                href={active.secondary.href}
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-7 py-3.5 text-sm font-semibold text-[#f3f2ee] transition-colors hover:bg-white/5"
                            >
                                {active.secondary.label}
                            </Link>
                        </div>

                        <div className="mt-16 hidden items-center gap-2 text-xs text-[#6f6e6a] sm:flex">
                            <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7M12 21V3" />
                            </svg>
                            Scroll to see what else we do
                        </div>
                    </div>

                    <ul className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
                        {services.map((service, i) => {
                            const isActive = i === index;
                            return (
                                <li key={service.id} className="shrink-0 lg:shrink">
                                    <button
                                        type="button"
                                        aria-current={isActive}
                                        onClick={() => goTo(i)}
                                        className={`w-full rounded-lg border text-left transition-colors ${isActive
                                                ? "border-[#ff7a33]/40 bg-white/[0.04]"
                                                : "border-white/10 hover:border-white/20"
                                            }`}
                                    >
                                        {isActive ? (
                                            <div className="p-3">
                                                <div className="relative h-32 w-full overflow-hidden rounded-md sm:h-36">
                                                    <Image
                                                        fill
                                                        sizes="400px"
                                                        src={service.image}
                                                        alt={service.label}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <p className="mt-3 text-sm font-medium text-[#f3f2ee]">{service.label}</p>
                                                <p className="mt-1 text-xs text-[#9b9a96]">{service.stat}</p>
                                                <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                                                    <div
                                                        className="h-full rounded-full bg-[#ff7a33]"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between whitespace-nowrap px-4 py-3.5 sm:whitespace-normal">
                                                <span className="text-sm text-[#b3b2ad]">{service.label}</span>
                                                <span className="ml-3 hidden text-xs text-[#6f6e6a] sm:inline">{service.stat}</span>
                                            </div>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}