import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { masterConfig } from "@/config/master";
import Link from "next/link";
import Image from "next/image";
import { motion } from "@/components/ui/motion-lite";
import { IconArrowRight, IconStack2, IconArrowDown } from "@tabler/icons-react";

export function Hero() {
    const { hero } = masterConfig.sections;
    const heroImageFile = masterConfig.ui.heroImages.home || hero.imageSrc || "hero1.jpg";
    const heroImageMaxWidth = hero.visualDimensions?.maxWidth || 500;
    const heroSrc = (() => {
        const normalized = heroImageFile.trim().replace(/^\/(https?:\/\/)/i, "$1");
        if (/^https?:\/\//i.test(normalized)) return normalized;
        if (normalized.startsWith("/")) return normalized;
        return `/${normalized}`;
    })();

    return (
        <Section className="relative min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] flex items-start bg-transparent py-0 pt-14 md:pt-16 pb-16">
            <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <div className="space-y-8 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/20 bg-primary/5 text-primary"
                    >
                        <IconStack2 className="h-3.5 w-3.5" strokeWidth={2} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                            {hero.tag}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-[0.9] tracking-tighter text-ink"
                    >
                        {hero.headline}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-sm sm:text-base md:text-base text-ink-muted leading-relaxed max-w-xl pl-6 border-l border-primary/20"
                    >
                        {hero.subheadline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                        <Button asChild variant="primary" size="lg" className="w-full sm:w-auto sm:min-w-[180px]">
                            {(() => {
                                const calendlyUrl = masterConfig.contact.calendlyUrl?.trim();
                                const isExternal = /^https?:\/\//i.test(calendlyUrl);
                                const href = calendlyUrl || "/contact";
                                return (
                                    <Link 
                                        href={href} 
                                        className="gap-2"
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noreferrer" : undefined}
                                    >
                                        Book a call
                                        <IconArrowRight className="h-4 w-4" />
                                    </Link>
                                );
                            })()}
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-[180px]">
                            <Link href="#services" className="gap-2">
                                Explore services
                                <IconArrowDown className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Right: Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full order-1 lg:order-2 mb-8 lg:mb-0 flex justify-center lg:justify-end"
                >
                    <div
                        className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-none lg:ml-auto"
                        style={{
                            maxWidth: `clamp(260px, 72vw, ${heroImageMaxWidth}px)`,
                            aspectRatio: hero.visualDimensions?.aspectRatio || "1/1",
                        }}
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-75" />

                        <Image
                            src={heroSrc}
                            alt="Hero Illustration"
                            fill
                            className={`object-cover z-10 ${hero.grayscale ? "grayscale" : ""}`}
                            priority
                            quality={68}
                            sizes="(max-width: 639px) 72vw, (max-width: 1023px) 62vw, 500px"
                        />
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
