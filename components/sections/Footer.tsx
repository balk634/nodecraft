import Link from "next/link";
import { masterConfig } from "@/config/master";
import { WorldTimeBadges } from "@/components/ui/WorldTimeBadges";
import Image from "next/image";
import { IconMail, IconPhone, IconMapPin, type IconProps } from "@tabler/icons-react";
import { LinkedInIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import type { ComponentType } from "react";

export function Footer() {
    const year = new Date().getFullYear();
    type SocialKey = keyof typeof masterConfig.contact.social;
    const socialEntries = Object.entries(masterConfig.contact.social) as Array<[SocialKey, string]>;

    // Map social keys to icons
    const socialIcons: Record<SocialKey, ComponentType<any>> = {
        linkedin: LinkedInIcon,
        instagram: InstagramIcon,
    };

    return (
        <footer className="bg-primary text-white border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[320px] sm:w-[1000px] sm:h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
                {/* Main Footer Links */}
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                    {/* Brand Col */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-between items-start p-4 sm:p-6 md:p-8 lg:p-10 pt-16 sm:pt-20 md:pt-20 lg:pt-20">
                        <div>
                            <Image src="/brand/logo.svg" alt="Nodecraft Logo" width={200} height={32} className="h-10 w-auto invert brightness-0 mb-8" />
                            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                Conversion-first websites with clean tracking and SEO foundations, then performance marketing that scales. Clear plan. Measurable results.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-10 flex flex-col items-start gap-5">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/60">
                                <a href={`mailto:${masterConfig.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                    <IconMail className="h-4 w-4 shrink-0 text-white/60" strokeWidth={1.5} />
                                    {masterConfig.contact.email}
                                </a>
                                <span className="w-px h-3 bg-white/10 hidden sm:block" />
                                <a href={`tel:${masterConfig.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                    <IconPhone className="h-4 w-4 shrink-0 text-white/60" strokeWidth={1.5} />
                                    {masterConfig.contact.phone}
                                </a>
                            </div>

                            <div className="flex items-start gap-2 text-[13px] text-white/60 leading-relaxed">
                                <IconMapPin className="h-4 w-4 shrink-0 text-white/60 mt-1" strokeWidth={1.5} />
                                <span>
                                    {masterConfig.contact.address.street} {masterConfig.contact.address.locality}, {masterConfig.contact.address.city},<br />
                                    {masterConfig.contact.address.state} {masterConfig.contact.address.postalCode}, {masterConfig.contact.address.country}
                                </span>
                            </div>

                            {masterConfig.contact.socialMedia.enabled && (
                                <div className="w-full pt-6 mt-2 border-t border-white/5 flex flex-col gap-4">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Connect with us</span>
                                    <div className="flex items-center gap-6">
                                        {socialEntries.map(([platform, url]) => {
                                            const Icon = socialIcons[platform];
                                            if (!Icon || !url) return null;
                                            return (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mi-nav-item text-white/40 hover:text-white transition-colors"
                                                    aria-label={platform}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-y-10 p-4 sm:p-6 md:p-8 lg:p-10 pt-10 sm:pt-12 md:pt-16 lg:pt-16">
                        {masterConfig.footerColumns.map((col) => (
                            <div key={col.title}>
                                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
                                    {col.title}
                                </h4>
                                <ul className="space-y-4">
                                    {col.links.map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="mi-link-inline footer-link text-sm text-white/70 hover:text-white transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="text-[10px] sm:text-[11px] font-mono text-white/40 uppercase tracking-widest text-center md:text-left">
                        <span>&copy; {year} NODECRAFT. All Rights Reserved.</span>
                    </div>

                    <div className="w-full lg:w-auto">
                        <WorldTimeBadges className="w-full" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
