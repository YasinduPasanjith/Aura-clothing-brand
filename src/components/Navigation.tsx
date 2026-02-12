"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_LINKS = [
    { title: "HOME", href: "#hero", subtitle: "Top of Page" },
    { title: "COLLECTIONS", href: "#collections", subtitle: "Spring / Summer 2025" },
    { title: "ARCHIVE", href: "#archive", subtitle: "Past Seasons" },
    { title: "THE STORY", href: "#story", subtitle: "Our Philosophy" },
    { title: "STORES", href: "#footer", subtitle: "Find a Boutique" },
];

export const Navigation = ({ isOpen, onClose }: NavigationProps) => {
    const container = useRef<HTMLDivElement>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(container.current, {
                display: "block",
                opacity: 1,
                duration: 0.1,
            });

            gsap.fromTo(overlay.current,
                { yPercent: -100 },
                { yPercent: 0, duration: 1, ease: "expo.inOut" }
            );

            gsap.fromTo(linksRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.5 }
            );
        } else {
            const tl = gsap.timeline();
            tl.to(linksRef.current, { y: -50, opacity: 0, stagger: 0.05, duration: 0.4, ease: "power2.in" })
                .to(overlay.current, { yPercent: 100, duration: 1, ease: "expo.inOut" })
                .set(container.current, { display: "none", opacity: 0 });
        }
    }, [isOpen]);

    return (
        <div ref={container} className="fixed inset-0 z-[100] hidden opacity-0">
            <div
                ref={overlay}
                className="absolute inset-0 bg-off-white text-eerie-black flex flex-col justify-center px-8 md:px-20"
            >
                <button
                    onClick={onClose}
                    className="absolute top-10 right-8 md:right-20 group flex items-center gap-4 text-sm font-bold tracking-widest hover:text-slate-gray transition-colors"
                >
                    <span>CLOSE</span>
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <div className="flex flex-col gap-8 md:gap-12">
                    {NAV_LINKS.map((link, index) => (
                        <a
                            key={link.title}
                            href={link.href}
                            ref={(el) => { linksRef.current[index] = el; }}
                            className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 hover:underline decoration-1 underline-offset-8"
                            onClick={onClose}
                        >
                            <span className="text-xl md:text-6xl font-serif leading-none">{link.title}</span>
                            <span className="text-xs md:text-sm text-slate-gray tracking-widest">{link.subtitle}</span>
                        </a>
                    ))}
                </div>

                <div className="absolute bottom-10 left-8 md:left-20 flex gap-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-gray">INSTAGRAM</span>
                        <span className="text-[10px] font-bold text-slate-gray">TWITTER</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-gray">PARIS</span>
                        <span className="text-[10px] font-bold text-slate-gray">NEW YORK</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
