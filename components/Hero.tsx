"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWifi } from "react-icons/fa";
import { LuCctv } from "react-icons/lu";
import { GoArrowUpRight } from "react-icons/go";

const slides = [
    {
        id: "laptop",
        title: "Expert Laptop Repair, Done Right",
        description:
            "From cracked screens to dead batteries, our certified technicians get your laptop back to full speed — with genuine parts and same-day turnaround.",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: "mobile",
        title: "Cracked Screens Fixed in Minutes",
        description:
            "Original-quality glass, OLED panels, charging ports and camera repairs. Bring your phone back to life with a quick, affordable fix.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: "wifi",
        title: "Fast, Reliable Wi-Fi Everywhere",
        description:
            "Mesh setups, office networks and signal boosters that eliminate dead zones. We design and install a network built for your space.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: "web",
        title: "Websites That Work as Hard as You Do",
        description:
            "Modern, lightning-fast and mobile-first websites built to convert. From landing pages to full-scale web apps.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: "marketplace",
        title: "Refurbished Gear, Restored Standards",
        description:
            "Shop pre-owned laptops and phones that are tested, certified and backed by warranty — at a fraction of retail price.",
        image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1600&q=80",
    },
];

const quickServices = [
    {
        label: "Laptop",
        subheading: "Screen, battery & motherboard repair",
        href: "/services/laptop/screen-replacement",
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="11" rx="1.5" />
                <path strokeLinecap="round" d="M2 18.5h20" />
            </svg>
        ),
    },
    {
        label: "Mobile",
        subheading: "Screen, battery & charging repair",
        href: "/services/mobile/screen-repair",
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="7" y="3" width="10" height="18" rx="2" />
                <path strokeLinecap="round" d="M11 18h2" />
            </svg>
        ),
    },
    {
        label: "Wi-Fi",
        subheading: "Router setup, mesh & dead-zone fix",
        href: "/services/wifi/home-setup",
        icon: <FaWifi className="h-5 w-5" />,
    },
    {
        label: "CCTV",
        subheading: "Camera install & 24/7 surveillance",
        href: "/services/cctv/installation",
        icon: <LuCctv className="h-5 w-5" />,
    },
];

const AUTOPLAY_MS = 5000;
const count = slides.length;

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const advance = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % count);
    }, []);

    const jumpTo = useCallback((next: number) => {
        setActiveIndex(((next % count) + count) % count);
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(advance, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [paused, advance]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
            if (delta < 0) {
                advance();
            } else {
                jumpTo(activeIndex - 1);
            }
        }
        touchStartX.current = null;
    };

    return (
        <>
            <section
                aria-label="Featured services"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative overflow-hidden bg-zinc-950 h-[83vh] [height:83dvh] md:h-[calc(100vh-4rem)] md:[height:calc(100dvh-4rem)]"
            >
                {/* Parallax Fade & Ken Burns Scale Slides */}
                <div className="relative h-full w-full">
                    {slides.map((slide, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                                }`}
                                aria-hidden={!isActive}
                            >
                                {/* Background Image with Ken Burns / Parallax Zoom */}
                                <div
                                    className={`absolute inset-0 h-full w-full transform transition-transform duration-[5000ms] ease-out ${
                                        isActive ? "scale-105" : "scale-115"
                                    }`}
                                >
                                    <Image
                                        fill
                                        priority={i === 0}
                                        sizes="100vw"
                                        src={slide.image}
                                        alt={slide.title}
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/30" />
                                </div>

                                {/* Text content with Parallax Slide-up stagger */}
                                <div className="relative mx-auto flex h-full max-w-7xl items-end pb-36 pt-16 px-4 sm:items-center sm:px-6 sm:pb-32 sm:pt-12 lg:px-8">
                                    <div
                                        className={`max-w-2xl transform transition-all duration-1000 ease-out ${
                                            isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                        }`}
                                    >
                                        <h1
                                            className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                                            style={{ fontFamily: "ClashDisplay" }}
                                        >
                                            {slide.title}
                                        </h1>

                                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-300 sm:mt-3 sm:text-lg">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            <div className="absolute inset-x-0 bottom-4 z-30 sm:bottom-6 lg:bottom-8">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl border-0 bg-white shadow-xl shadow-black/10 backdrop-blur-sm sm:rounded-2xl sm:shadow-2xl sm:shadow-black/15">
                        <div className="grid grid-cols-[1.15fr_1.15fr_1.15fr_1.15fr_0.65fr]">
                            {quickServices.map((service) => (
                                <Link
                                    key={service.label}
                                    href={service.href}
                                    className="group flex flex-col items-center gap-1.5 px-2 py-3.5 transition-colors hover:bg-zinc-50 sm:flex-row sm:gap-3 sm:px-6 sm:py-5"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-all duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-9 sm:w-9">
                                        {service.icon}
                                    </span>
                                    <span className="flex min-w-0 flex-col">
                                        <span className="text-[11px] font-semibold leading-tight text-zinc-800 sm:text-sm">{service.label}</span>
                                        <span className="mt-0.5 hidden text-[11px] leading-tight text-zinc-400 sm:block">{service.subheading}</span>
                                    </span>
                                </Link>
                            ))}

                            {/* Explore */}
                            <Link
                                href="/services"
                                className="group flex flex-col items-center gap-1.5 px-2 py-3.5 transition-colors hover:bg-zinc-50 sm:flex-row sm:gap-3 sm:px-4 sm:py-5"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-all duration-300 group-hover:bg-zinc-900 group-hover:text-white sm:h-9 sm:w-9">
                                    <GoArrowUpRight className="h-5 w-5" />
                                </span>
                                <span className="flex min-w-0 flex-col">
                                    <span className="text-[11px] font-semibold leading-tight text-zinc-900 sm:text-sm">Explore</span>
                                    <span className="mt-0.5 hidden text-[11px] leading-tight text-zinc-400 sm:block">All services</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    );
} 