"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchButton from "./SearchButton";
import { IoBagOutline } from "react-icons/io5";

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

const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "tel:+919876543210";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
    const [mobileActiveCategory, setMobileActiveCategory] = useState<CategoryKey | null>(null);
    const cartCount = 0;

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
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
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
        <header className={`fixed inset-x-0 top-0 z-50 bg-white ${menuOpen ? "border-b-0" : "border-b border-zinc-200"}`}>
            <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Mobile Left: Menu Toggle + Logo */}
                <div className="relative z-50 flex min-w-0 flex-1 items-center gap-1.5 md:hidden">
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close Navigation" : "Open Navigation"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="-my-1 -mr-1 -ml-2.5 flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-[0.4em] text-zinc-900 transition-colors hover:bg-zinc-100 active:bg-zinc-200/60"
                    >
                        <div className="relative flex h-[14px] w-5 flex-col justify-between">
                            <span
                                className={`block h-[2px] w-5 rounded-full bg-zinc-900 transition-all duration-300 ease-in-out origin-center ${
                                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                                }`}
                            />
                            <span
                                className={`block h-[2px] w-5 rounded-full bg-zinc-900 transition-all duration-200 ease-in-out ${
                                    menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                                }`}
                            />
                            <span
                                className={`block h-[2px] w-5 rounded-full bg-zinc-900 transition-all duration-300 ease-in-out origin-center ${
                                    menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                                }`}
                            />
                        </div>
                    </button>
                    <Link
                        href="/"
                        className="min-w-0 shrink tracking-wide text-zinc-900 transition-opacity hover:opacity-80"
                        style={{ fontFamily: "ClashDisplay", fontSize: "1.2rem", fontWeight: 600, letterSpacing: "0.03em" }}
                    >
                        Computerloka
                    </Link>
                </div>

                {/* Desktop Logo */}
                <Link
                    href="/"
                    className="hidden tracking-wide text-zinc-900 transition-opacity hover:opacity-80 md:block"
                    style={{ fontFamily: "ClashDisplay", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "0.03em" }}
                >
                    Computerloka
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/"
                        style={{ fontFamily: "ClashDisplay", letterSpacing: "1.5px" }}
                        className="text-base font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        style={{ fontFamily: "ClashDisplay", letterSpacing: "1.5px" }}
                        className="text-base font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
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
                                style={{ fontFamily: "ClashDisplay", letterSpacing: "1.5px" }}
                                className="flex items-center gap-1.5 text-base font-medium capitalize text-zinc-600 transition-colors hover:text-zinc-900"
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

                    <Link
                        href="/marketplace"
                        style={{ fontFamily: "ClashDisplay", letterSpacing: "1.5px" }}
                        className="text-base font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                        Marketplace
                    </Link>
                </div>

                {/* Desktop Action Buttons: Call -> Search -> Cart -> Sign In -> Book Now */}
                <div className="hidden items-center gap-1.5 md:flex">


                    {/* Search Icon */}
                    <SearchButton />

                    {/* Cart Icon Button (Placed after Search) */}
                    <Link
                        href="/cart"
                        aria-label="View shopping cart"
                        style={{ borderRadius: "0.4em" }}
                        className="relative p-2 text-zinc-700"
                    >
                        <IoBagOutline className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        href="/sign-in"
                        style={{ borderRadius: "0.4em" }}
                        className="px-4 py-2 text-sm font-medium text-zinc-700"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/free-consultation"
                        style={{ borderRadius: "0.4em" }}
                        className="bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Header Right Items (Search + Book Now) */}
                <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-1.5 md:hidden">
                    {/* Search Icon */}
                    <SearchButton className="touch-manipulation" />

                    <Link
                        href="/free-consultation"
                        style={{ borderRadius: "0.4em" }}
                        className="whitespace-nowrap bg-zinc-900 p-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 sm:text-sm"
                    >
                        Book Now
                    </Link>
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
                            className="mx-auto max-w-4xl border border-zinc-200 bg-white p-6 shadow-xl"
                        >
                            <div className="flex flex-col gap-4">
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
                                            <span
                                                style={{ fontFamily: "var(--font-lexend), Lexend, sans-serif" }}
                                                className="block text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600"
                                            >
                                                {item.name}
                                            </span>
                                            <span
                                                style={{ fontFamily: "var(--font-lexend), Lexend, sans-serif" }}
                                                className="mt-1 block text-xs text-zinc-500"
                                            >
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
                className={`fixed top-16 inset-x-0 bottom-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            <div
                className={`fixed top-16 bottom-0 left-0 z-40 flex w-full max-w-full overflow-x-hidden max-h-[calc(100dvh-4rem)] flex-col justify-between bg-white px-5 pb-6 pt-5 sm:pt-6 transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"
                    }`}
            >
                <div className="flex-1 overflow-y-auto no-scrollbar overflow-x-hidden">
                    <nav className="flex flex-col w-full max-w-full overflow-x-hidden pt-2">
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            style={{ fontFamily: "ClashDisplay", letterSpacing: "0.5px" }}
                            className="flex items-center justify-between border-b border-zinc-100 py-3.5 text-2xl font-medium text-zinc-900 transition-colors hover:text-blue-600 sm:text-3xl"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setMenuOpen(false)}
                            style={{ fontFamily: "ClashDisplay", letterSpacing: "0.5px" }}
                            className="flex items-center justify-between border-b border-zinc-100 py-3.5 text-2xl font-medium text-zinc-900 transition-colors hover:text-blue-600 sm:text-3xl"
                        >
                            About
                        </Link>

                        {(["laptop", "mobile", "wifi", "others"] as CategoryKey[]).map((category) => {
                            const isOpen = mobileActiveCategory === category;
                            const categoryTitle =
                                category === "wifi" ? "Wi-Fi" : category === "others" ? "Other Services" : category;
                            return (
                                <div key={category} className="border-b border-zinc-100">
                                    <button
                                        type="button"
                                        onClick={() => toggleMobileCategory(category)}
                                        className="flex w-full items-center justify-between py-3.5 text-left transition-colors group"
                                    >
                                        <span
                                            style={{ fontFamily: "ClashDisplay", letterSpacing: "0.5px" }}
                                            className="text-2xl font-medium capitalize text-zinc-900 transition-colors group-hover:text-blue-600 sm:text-3xl"
                                        >
                                            {categoryTitle}
                                        </span>
                                        <span
                                            className={`flex h-7 w-7 items-center justify-center text-xl font-light text-zinc-400 transition-transform duration-300 select-none ${
                                                isOpen ? "rotate-45 text-zinc-900" : ""
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="flex flex-col gap-1 pb-3 pt-1 pl-2">
                                                {megaMenuData[category].items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setMenuOpen(false)}
                                                        className="group flex flex-col rounded-lg px-2 py-2 transition-colors hover:bg-zinc-50"
                                                    >
                                                        <div
                                                            style={{ fontFamily: "var(--font-lexend), Lexend, sans-serif" }}
                                                            className="text-sm font-semibold text-zinc-800 transition-colors group-hover:text-blue-600"
                                                        >
                                                            {item.name}
                                                        </div>
                                                        <div
                                                            style={{ fontFamily: "var(--font-lexend), Lexend, sans-serif" }}
                                                            className="text-xs font-normal text-zinc-400"
                                                        >
                                                            {item.description}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <Link
                            href="/marketplace"
                            onClick={() => setMenuOpen(false)}
                            style={{ fontFamily: "ClashDisplay", letterSpacing: "0.5px" }}
                            className="flex items-center justify-between border-b border-zinc-100 py-3.5 text-2xl font-medium text-zinc-900 transition-colors hover:text-blue-600 sm:text-3xl"
                        >
                            Marketplace
                        </Link>
                    </nav>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-3">
                    <Link
                        href="/sign-in"
                        onClick={() => setMenuOpen(false)}
                        style={{ borderRadius: "0.4em", fontFamily: "ClashDisplay", letterSpacing: "0.5px" }}
                        className="border border-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/free-consultation"
                        onClick={() => setMenuOpen(false)}
                        style={{ borderRadius: "0.4em", fontFamily: "ClashDisplay", letterSpacing: "0.5px" }}
                        className="bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </header>
    );
}