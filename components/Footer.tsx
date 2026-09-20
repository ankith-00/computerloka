import Link from "next/link";

const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "tel:+919876543210";
const EMAIL = "hello@computerloka.in";
const ADDRESS = "Shop 12, MG Road, Bengaluru, Karnataka 560001";

const serviceLinks = [
    { label: "Laptop", href: "/services/laptop/screen-replacement" },
    { label: "Mobile", href: "/services/mobile/screen-repair" },
    { label: "Wi-Fi", href: "/services/wifi/home-setup" },
    { label: "CCTV", href: "/services/cctv/installation" },
];

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Free Consultation", href: "/free-consultation" },
    { label: "Sign In", href: "/sign-in" },
];

const socialLinks = [
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "Facebook",
        href: "https://facebook.com",
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5 21v-7h2.5l.5-3h-3V9.2c0-.9.3-1.7 1.8-1.7H16.6V4.8c-.3 0-1.4-.2-2.6-.2-2.5 0-4.2 1.5-4.2 4.4V11H7.3v3h2.5v7h3.7z" />
            </svg>
        ),
    },
    {
        label: "X",
        href: "https://x.com",
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.7 3H21l-7.2 8.2L22.5 21h-6.6l-5.2-6.8L4.7 21H1.4l7.7-8.8L1.5 3h6.8l4.7 6.2L17.7 3zm-1.2 16.2h1.8L7 4.7H5.1l11.4 14.5z" />
            </svg>
        ),
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/919876543210",
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.2-.8l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-zinc-400">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
                            ComputerLoka
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                            Expert laptop and mobile repair, home and office Wi-Fi, CCTV installation and refurbished gear -
                            every device fixed right, backed by warranty.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <svg className="h-4 w-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.9 5.3a2 2 0 0 0 2.2 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                                </svg>
                                <Link href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
                                    {EMAIL}
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="h-4 w-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h2l2 5-2.5 1.5a12 12 0 0 0 6 6l1.5-2.5 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 3 5z" />
                                </svg>
                                <Link href={PHONE_TEL} className="transition-colors hover:text-white">
                                    {PHONE_DISPLAY}
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                </svg>
                                <span className="text-zinc-400">{ADDRESS}</span>
                            </li>
                        </ul>

                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            {serviceLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="transition-colors hover:text-white">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="transition-colors hover:text-white">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Book a Service</h3>
                        <p className="mt-5 text-sm leading-relaxed">
                            Same-day laptop and phone repairs. Call for quotes, door-step pickup or store walk-ins.
                        </p>
                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                href="/free-consultation"
                                style={{ borderRadius: "0.4em" }}
                                className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
                            >
                                Book Now
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M19 12H6" />
                                </svg>
                            </Link>
                            <Link
                                href={PHONE_TEL}
                                style={{ borderRadius: "0.4em" }}
                                className="inline-flex items-center justify-center gap-2 border border-zinc-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-900"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h2l2 5-2.5 1.5a12 12 0 0 0 6 6l1.5-2.5 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 3 5z" />
                                </svg>
                                Call Now
                            </Link>
                        </div>
                        <p className="mt-6 text-xs text-zinc-500">Open Mon-Sat, 10 AM - 7 PM</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
                    <p className="text-xs text-zinc-500">© {year} ComputerLoka. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs">
                        <Link href="/privacy-policy" className="text-zinc-400 transition-colors hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-and-conditions" className="text-zinc-400 transition-colors hover:text-white">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}