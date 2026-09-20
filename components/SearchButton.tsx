"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

export default function SearchButton({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Lock both html and body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            setQuery("");
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Dummy results
    const results = [
        { id: 1, title: "Laptop Screen Replacement", category: "Laptop Repair", price: "From ₹2,499" },
        { id: 2, title: "iPhone Battery Replacement", category: "Mobile Repair", price: "From ₹1,299" },
        { id: 3, title: "MacBook Keyboard Repair", category: "Laptop Repair", price: "From ₹3,999" },
        { id: 4, title: "Home Wi-Fi Setup", category: "Networking", price: "From ₹999" },
        { id: 5, title: "Data Recovery Services", category: "Other Services", price: "From ₹1,499" },
        { id: 6, title: "Motherboard Repair", category: "Laptop Repair", price: "From ₹4,499" },
    ];

    const filteredResults = query
        ? results.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.category.toLowerCase().includes(query.toLowerCase()))
        : [];

    return (
        <>
            <button
                type="button"
                aria-label={isOpen ? "Close Search" : "Search"}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 ${
                    isOpen
                        ? "rounded-full bg-zinc-900 text-white"
                        : "text-zinc-700"
                } ${className || ""}`}
            >
                {isOpen ? (
                    <IoCloseOutline className="h-6 w-6 md:h-5 md:w-5" />
                ) : (
                    <IoSearchOutline className="h-6 w-6 md:h-5 md:w-5" />
                )}
            </button>

            {/* Modal Overlay - Starts below navbar (top-16) */}
            <div
                className={`fixed top-16 inset-x-0 bottom-0 z-[100] flex flex-col items-center pt-4 sm:pt-6 transition-all duration-300 ease-out ${
                    isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
                }`}
            >
                {/* Blurred Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Search Container — slides down from top */}
                <div
                    className={`relative w-full max-w-2xl px-4 transition-all duration-300 ease-out ${
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
                    }`}
                >
                    {/* Search Input */}
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-2xl ring-1 ring-black/5">
                        <IoSearchOutline className="h-5 w-5 shrink-0 text-zinc-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for services, repairs..."
                            className="flex-1 border-0 bg-transparent px-1 py-1.5 text-sm text-zinc-900 focus:outline-none focus:ring-0 sm:text-base"
                            style={{ fontFamily: "ClashDisplay" }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="shrink-0 text-zinc-400 hover:text-zinc-600"
                            >
                                <IoCloseOutline className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Search Results */}
                    {query && (
                        <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-zinc-200 bg-white shadow-2xl">
                            {filteredResults.length > 0 ? (
                                <div className="divide-y divide-zinc-100">
                                    {filteredResults.map(result => (
                                        <div
                                            key={result.id}
                                            className="flex cursor-pointer items-center justify-between px-4 py-3.5 transition-colors hover:bg-zinc-50"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900">{result.title}</p>
                                                <p className="mt-0.5 text-xs text-zinc-400">{result.category}</p>
                                            </div>
                                            <span className="text-xs font-semibold text-zinc-700">{result.price}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center text-sm">
                                    <svg className="mx-auto h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="mt-4 font-semibold text-zinc-900">No results found</p>
                                    <p className="mt-1 text-zinc-400">Nothing matched &ldquo;{query}&rdquo;</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
