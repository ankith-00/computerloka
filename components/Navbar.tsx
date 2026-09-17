"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Mega Menu Configuration
const megaMenuData = {
    laptop: {
        title: "Laptop Services",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
        items: [
            { name: "Screen Replacement", description: "Fix broken or flickering displays", href: "/services/laptop/screen-replacement" },
            { name: "Battery Replacement", description: "Restore battery life & charging", href: "/services/laptop/battery-replacement" },
            { name: "Keyboard Repair", description: "Fix non-responsive keys & liquid spills", href: "/services/laptop/keyboard-repair" },
            { name: "Performance Boost", description: "SSD upgrades & RAM installation", href: "/services/laptop/performance-boost" },
        ],
    },
    mobile: {
        title: "Mobile Services",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        items: [
            { name: "Glass & OLED Repair", description: "Original quality screen replacement", href: "/services/mobile/screen-repair" },
            { name: "Charging Port Fix", description: "Resolve loose ports and slow charging", href: "/services/mobile/charging-port" },
            { name: "Water Damage", description: "Diagnostics & component drying", href: "/services/mobile/water-damage" },
            { name: "Camera Repair", description: "Lens replacement & sensor fixes", href: "/services/mobile/camera-repair" },
        ],
    },
    wifi: {
        title: "Wi-Fi & Networking",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
        items: [
            { name: "Home Wi-Fi Setup", description: "Mesh networks and router configuration", href: "/services/wifi/home-setup" },
            { name: "Office Networking", description: "Structured cabling and LAN infrastructure", href: "/services/wifi/office-network" },
            { name: "Signal Extension", description: "Eliminate dead zones with repeater setup", href: "/services/wifi/boosters" },
            { name: "Network Security", description: "Firewall configuration & Wi-Fi encryption", href: "/services/wifi/security" },
        ],
    },
    others: {
        title: "Other Repairs & Services",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
        items: [
            { name: "Data Recovery", description: "Recover lost files and corrupted storage", href: "/services/data-recovery" },
            { name: "Software & OS Setup", description: "OS installation, drivers & virus removal", href: "/services/software-installation" },
            { name: "Custom PC Assembly", description: "Tailored gaming and workstation builds", href: "/services/custom-pc" },
            { name: "Console Repair", description: "PlayStation, Xbox & Nintendo fixes", href: "/services/console-repair" },
        ],
    },
};

type CategoryKey = keyof typeof megaMenuData;

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
    const [mobileActiveCategory, setMobileActiveCategory] = useState<CategoryKey | null>(null);
    const [cartCount, setCartCount] = useState(2);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (category: CategoryKey) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveCategory(category);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 150);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveCategory(null);
                setMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const toggleMobileCategory = (category: CategoryKey) => {
        setMobileActiveCategory((prev) => (prev === category ? null : category));
    };

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
            <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand Logo */}
                <Link
                    href="/"
                    className="relative z-50 text-xl font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-80"
                >
                    ComputerLoka
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900">
                        About
                    </Link>

                    {(["laptop", "mobile", "wifi", "others"] as CategoryKey[]).map((category) => (
                        <div
                            key={category}
                            className="relative py-4"
                            onMouseEnter={() => handleMouseEnter(category)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                                className="flex items-center gap-1.5 text-sm font-medium capitalize text-zinc-600 transition-colors hover:text-zinc-900"
                            >
                                {category === "wifi" ? "Wi-Fi" : category}
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${activeCategory === category ? "rotate-180 text-zinc-900" : "text-zinc-400"
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <Link href="/web-development" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900">
                        Web Development
                    </Link>
                    <Link href="/marketplace" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900">
                        Marketplace
                    </Link>
                </div>

                {/* Desktop Action Buttons: Cart -> Sign In -> Free Advice */}
                <div className="hidden items-center gap-3 md:flex">
                    {/* Cart Icon Button (Placed before Sign in) */}
                    <Link
                        href="/cart"
                        aria-label="View shopping cart"
                        style={{ borderRadius: "0.4em" }}
                        className="relative p-2 text-zinc-700 transition-colors hover:bg-zinc-100"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        href="/sign-in"
                        style={{ borderRadius: "0.4em" }}
                        className="border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/free-consultation"
                        style={{ borderRadius: "0.4em" }}
                        className="bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                    >
                        Free Advice
                    </Link>
                </div>

                {/* Mobile Header Right Items (Cart + Menu Toggle) */}
                <div className="flex items-center gap-2 md:hidden">
                    <Link
                        href="/cart"
                        aria-label="View shopping cart"
                        className="relative rounded-[0.4em] p-2 text-zinc-700 hover:bg-zinc-100"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        aria-label="Toggle Navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="relative z-50 rounded-[0.4em] p-2 text-zinc-700 hover:bg-zinc-100"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

                {/* Desktop Mega Menu Dropdown */}
                {activeCategory && (
                    <div
                        onMouseEnter={() => handleMouseEnter(activeCategory)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full z-20 w-full px-4 sm:px-6 lg:px-8"
                    >
                        <div
                            style={{ borderRadius: "0.4em" }}
                            className="mx-auto grid max-w-7xl grid-cols-12 gap-8 overflow-hidden border border-zinc-200 bg-white p-6 shadow-xl"
                        >
                            <div style={{ borderRadius: "0.4em" }} className="relative col-span-4 min-h-[240px] overflow-hidden bg-zinc-100">
                                <Image
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    src={megaMenuData[activeCategory].image}
                                    alt={megaMenuData[activeCategory].title}
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            <div className="col-span-8 flex flex-col justify-center gap-4 py-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    {megaMenuData[activeCategory].title}
                                </p>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {megaMenuData[activeCategory].items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setActiveCategory(null)}
                                            style={{ borderRadius: "0.4em" }}
                                            className="group p-3 transition-colors hover:bg-zinc-50"
                                        >
                                            <span className="block text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600">
                                                {item.name}
                                            </span>
                                            <span className="mt-1 block text-xs text-zinc-500">
                                                {item.description}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Navigation Drawer */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            <div
                className={`fixed inset-y-0 left-0 z-40 flex w-full flex-col justify-between bg-white px-6 pb-6 pt-20 transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                        <Link href="/" onClick={() => setMenuOpen(false)} style={{ borderRadius: "0.4em" }} className="px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100">
                            Home
                        </Link>
                        <Link href="/about" onClick={() => setMenuOpen(false)} style={{ borderRadius: "0.4em" }} className="px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100">
                            About
                        </Link>

                        {(["laptop", "mobile", "wifi", "others"] as CategoryKey[]).map((category) => {
                            const isOpen = mobileActiveCategory === category;
                            return (
                                <div key={category} className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => toggleMobileCategory(category)}
                                        style={{ borderRadius: "0.4em" }}
                                        className="flex items-center justify-between px-4 py-3 text-left text-base font-semibold capitalize text-zinc-800 transition-colors hover:bg-zinc-100"
                                    >
                                        {category === "wifi" ? "Wi-Fi" : category}
                                        <svg className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-zinc-900" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                        <div className="overflow-hidden">
                                            <div className="flex flex-col gap-1 py-1 pl-4 pr-2">
                                                {megaMenuData[category].items.map((item) => (
                                                    <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ borderRadius: "0.4em" }} className="px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50">
                                                        <div className="font-medium text-zinc-900">{item.name}</div>
                                                        <div className="text-xs text-zinc-400">{item.description}</div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <Link href="/web-development" onClick={() => setMenuOpen(false)} style={{ borderRadius: "0.4em" }} className="px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100">
                            Web Development
                        </Link>
                        <Link href="/marketplace" onClick={() => setMenuOpen(false)} style={{ borderRadius: "0.4em" }} className="px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100">
                            Marketplace
                        </Link>
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-3 border-t border-zinc-200 pt-4">
                    <Link
                        href="/sign-in"
                        onClick={() => setMenuOpen(false)}
                        style={{ borderRadius: "0.4em" }}
                        className="border border-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/free-consultation"
                        onClick={() => setMenuOpen(false)}
                        style={{ borderRadius: "0.4em" }}
                        className="bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                    >
                        Free Advice
                    </Link>
                </div>
            </div>
        </header>
    );
}