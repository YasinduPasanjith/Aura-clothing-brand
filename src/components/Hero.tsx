"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Image scale animation
        tl.from(".hero-image", {
            scale: 1.5,
            duration: 2,
        });

        // Text split animation (manual split since we don't have SplitText plugin)
        const text = textRef.current;
        if (text) {
            const content = text.innerText;
            text.innerHTML = content
                .split(" ")
                .map((word) => `<span class="word inline-block whitespace-nowrap">${word
                    .split("")
                    .map((char) => `<span class="char opacity-0 inline-block">${char}</span>`)
                    .join("")}</span>`)
                .join("&nbsp;");

            tl.to(".char", {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 1,
            }, "-=1.5");
        }
    }, { scope: container });

    return (
        <section ref={container} className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Fashion Hero"
                    fill
                    className="hero-image object-cover"
                    priority
                />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen flex flex-col justify-center px-8 md:px-20 bg-eerie-black">
                <div className="max-w-xl">
                    <span className="text-slate-gray text-xs md:text-sm mb-4 block tracking-[0.3em]">
                        Spring / Summer 2025
                    </span>
                    <h1
                        ref={textRef}
                        className="text-5xl md:text-7xl font-serif leading-none mb-8 tracking-tighter"
                    >
                        AESTHETIC <br />REFINEMENT
                    </h1>
                    <p className="text-slate-gray text-sm md:text-base leading-relaxed mb-10 max-w-sm">
                        Discover the new era of minimalist luxury. Crafted with precision, designed for the modern soul.
                    </p>
                    <div className="flex gap-8">
                        <button className="text-sm font-bold border-b border-off-white pb-2 hover:text-slate-gray hover:border-slate-gray transition-colors">
                            SHOP COLLECTION
                        </button>
                        <button className="text-sm font-bold border-b border-off-white pb-2 hover:text-slate-gray hover:border-slate-gray transition-colors">
                            THE STORY
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
