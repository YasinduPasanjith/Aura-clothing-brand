"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

        // Initial state
        gsap.set(".hero-image-wrapper", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 100 });
        gsap.set(".stagger-text", { y: 100, opacity: 0 });

        tl.to(".hero-image-wrapper", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            y: 0,
            duration: 1.5,
            stagger: 0.2,
        })
            .to(".stagger-text", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
            }, "-=1");

        // Subtle floating animation
        imagesRef.current.forEach((img, i) => {
            if (img) {
                gsap.to(img, {
                    y: "-=15",
                    duration: 2 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.5
                });
            }
        });

        // Subtle parallax on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            imagesRef.current.forEach((img, i) => {
                if (img) {
                    gsap.to(img, {
                        x: xPos * (i + 1) * 0.2,
                        y: "+=" + (yPos * (i + 1) * 0.2), // Combine with floating
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: container });

    const images = [
        {
            src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
            className: "w-[40vw] md:w-[22vw] aspect-[3/4] top-[10%] left-[2%] md:left-[5%] z-20",
        },
        {
            src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
            className: "w-[45vw] md:w-[25vw] aspect-square top-[40%] right-[2%] md:right-[10%] z-10 opacity-60",
        },
        {
            src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
            className: "w-[35vw] md:w-[18vw] aspect-[2/3] bottom-[5%] left-[15%] md:left-[20%] z-30",
        }
    ];

    return (
        <section id="hero" ref={container} className="relative h-screen w-full bg-eerie-black overflow-hidden flex items-center justify-center">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <h2 className="text-[25vw] font-serif font-bold text-white/[0.03] leading-none tracking-tighter whitespace-nowrap">
                    AURA MAISON
                </h2>
            </div>

            {/* Floating Images Container */}
            <div className="absolute inset-0 w-full h-full">
                {images.map((img, i) => (
                    <div
                        key={i}
                        ref={(el) => { imagesRef.current[i] = el; }}
                        className={`absolute hero-image-wrapper overflow-hidden ${img.className}`}
                    >
                        <Image
                            src={img.src}
                            alt={`Fashion ${i + 1}`}
                            fill
                            className="object-cover scale-110 hover:scale-100 transition-transform duration-700"
                            priority
                        />
                    </div>
                ))}
            </div>

            {/* Central Content */}
            <div className="relative z-40 text-center max-w-4xl px-4">
                <span className="stagger-text block text-xs md:text-sm tracking-[0.6em] mb-6 text-slate-gray">
                    COLLECTION NO. 04 — SUMMER 2025
                </span>
                <h1
                    ref={mainTitleRef}
                    className="stagger-text text-6xl md:text-9xl font-serif leading-[0.85] tracking-tighter mb-12 mix-blend-difference"
                >
                    ESSENCE <br />
                    <span className="italic ml-[0.5em]">OF</span> SILENCE
                </h1>

                <div className="stagger-text flex flex-col md:flex-row gap-8 items-center justify-center">
                    <p className="text-slate-gray text-[10px] md:text-xs max-w-[200px] text-left leading-relaxed">
                        EXPLORING THE BOUNDARIES BETWEEN FORM AND VOID. A DIALOGUE WITH SPACE.
                    </p>
                    <div className="h-[1px] w-20 bg-slate-gray/30 hidden md:block"></div>
                    <button className="group relative px-10 py-4 overflow-hidden border border-off-white/20">
                        <span className="relative z-10 text-[10px] tracking-widest font-bold">DISCOVER MORE</span>
                        <div className="absolute inset-0 bg-off-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="absolute inset-0 z-20 flex items-center justify-center text-eerie-black text-[10px] tracking-widest font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            SHOP NOW
                        </span>
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <span className="stagger-text text-[8px] tracking-[0.5em] text-slate-gray">SCROLL</span>
                <div className="h-20 w-[1px] bg-gradient-to-b from-slate-gray to-transparent"></div>
            </div>
        </section>
    );
};
