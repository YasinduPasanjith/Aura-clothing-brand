"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const StickyReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(imageRef.current,
            {
                clipPath: "inset(20% 30% 20% 30% round 10px)",
                scale: 0.8
            },
            {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div ref={imageRef} className="relative w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
                        alt="Reveal"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h2 className="text-5xl md:text-9xl font-serif text-white tracking-tighter">
                            UNCOMPROMISED
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
