"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
    {
        id: "laptop",
        badge: "Laptop Services",
        title: "Expert Laptop Repair, Done Right",
        description:
            "From cracked screens to dead batteries, our certified technicians get your laptop back to full speed — with genuine parts and same-day turnaround.",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80",
        primary: { label: "Free Advice", href: "/free-consultation" },
        secondary: { label: "Explore Laptop Services", href: "/services/laptop/screen-replacement" },
    },
    {
        id: "mobile",
        badge: "Mobile Services",
        title: "Cracked Screens Fixed in Minutes",
        description:
            "Original-quality glass, OLED panels, charging ports and camera repairs. Bring your phone back to life with a quick, affordable fix.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
        primary: { label: "Free Advice", href: "/free-consultation" },
        secondary: { label: "Explore Mobile Services", href: "/services/mobile/screen-repair" },
    },
    {
        id: "wifi",
        badge: "Wi-Fi & Networking",
        title: "Fast, Reliable Wi-Fi Everywhere",
        description:
            "Mesh setups, office networks and signal boosters that eliminate dead zones. We design and install a network built for your space.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
        primary: { label: "Free Advice", href: "/free-consultation" },
        secondary: { label: "Explore Networking", href: "/services/wifi/home-setup" },
    },
    {
        id: "web",
        badge: "Web Development",
        title: "Websites That Work as Hard as You Do",
        description:
            "Modern, lightning-fast and mobile-first websites built to convert. From landing pages to full-scale web apps.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
        primary: { label: "Start a Project", href: "/web-development" },
        secondary: { label: "Free Advice", href: "/free-consultation" },
    },
    {
        id: "marketplace",
        badge: "Marketplace",
        title: "Refurbished Gear, Restored Standards",
        description:
            "Shop pre-owned laptops and phones that are tested, certified and backed by warranty — at a fraction of retail price.",
        image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1600&q=80",
        primary: { label: "Browse Marketplace", href: "/marketplace" },
        secondary: { label: "Free Advice", href: "/free-consultation" },
    },
];

const AUTOPLAY_MS = 5000;

export default function Hero() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const count = slides.length;

    const goTo = useCallback(
        (next: number) => {
            setIndex(((next % count) + count) % count);
        },
        [count]
    );

    useEffect(() => {
        if (paused) return;
        const startedAt = Date.now();
        setProgress(0);
        const tick = () => {
            const elapsed = Date.now() - startedAt;
            setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
        };
        const raf = requestAnimationFrame(function loop() {
            tick();
            if (Date.now() - startedAt < AUTOPLAY_MS) {
                requestAnimationFrame(loop);
            }
        });
        const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, [index, paused, goTo]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1));
        touchStartX.current = null;
    };

    return (
        <section
            aria-label="Featured services"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden bg-zinc-950"
        >
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slides.map((slide, i) => (
                    <div key={slide.id} className="relative h-svh w-full shrink-0 sm:h-[640px]" aria-hidden={index !== i}>
                        <Image
                            fill
                            priority
                            sizes="100vw"
                            src={slide.image}
                            alt={slide.badge}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/30" />

                        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 pb-24 pt-16 sm:px-6 sm:pb-0 lg:px-8">
                            <div className="max-w-2xl">
                                <span
                                    style={{ borderRadius: "9999px" }}
                                    className="inline-flex items-center gap-2 bg-blue-600/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 ring-1 ring-inset ring-blue-400/30 backdrop-blur"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                                    </span>
                                    {slide.badge}
                                </span>

                                <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    {slide.title}
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                                    {slide.description}
                                </p>

                                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={slide.primary.href}
                                        style={{ borderRadius: "0.4em" }}
                                        className="inline-flex items-center justify-center gap-2 bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500"
                                    >
                                        {slide.primary.label}
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M19 12H6" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href={slide.secondary.href}
                                        style={{ borderRadius: "0.4em" }}
                                        className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                                    >
                                        {slide.secondary.label}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex w-full max-w-7xl -translate-x-1/2 items-center justify-between px-4 sm:bottom-6 sm:px-6 lg:px-8">
                <div aria-hidden className="flex items-center gap-2 opacity-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10" />
                    <div className="h-9 w-9 sm:h-10 sm:w-10" />
                </div>

                <div className="flex items-center gap-2.5">
                    {slides.map((slide, i) => (
                        <button
                            key={slide.id}
                            type="button"
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                                i === index ? "w-12 bg-white/30" : "w-1.5 bg-white/40 hover:bg-white/60"
                            }`}
                        >
                            {i === index && (
                                <span
                                    className="absolute inset-y-0 left-0 rounded-full bg-blue-500"
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={() => goTo(index - 1)}
                        style={{ borderRadius: "9999px" }}
                        className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/15 sm:h-10 sm:w-10"
                    >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next slide"
                        onClick={() => goTo(index + 1)}
                        style={{ borderRadius: "9999px" }}
                        className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/15 sm:h-10 sm:w-10"
                    >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}