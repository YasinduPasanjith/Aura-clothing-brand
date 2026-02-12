"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const COLLECTION_ITEMS = [
    { id: 1, title: "Noir Silhouette", category: "Outerwear", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" },
    { id: 2, title: "Minimalist Linen", category: "Essentials", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop" },
    { id: 3, title: "Structured Wool", category: "Tailoring", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2070&auto=format&fit=crop" },
    { id: 4, title: "Silk Archive", category: "Accessories", image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=2070&auto=format&fit=crop" },
    { id: 5, title: "Brutalist Knit", category: "Knitwear", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2071&auto=format&fit=crop" },
];

export const HorizontalGallery = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        const totalWidth = sectionRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollAmount = totalWidth - viewportWidth;

        gsap.to(sectionRef.current, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (COLLECTION_ITEMS.length - 1),
                end: () => `+=${scrollAmount}`,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: triggerRef });

    return (
        <section ref={triggerRef} className="bg-white text-eerie-black overflow-hidden pointer-events-none md:pointer-events-auto">
            <div ref={sectionRef} className="flex h-screen items-center" style={{ width: `${COLLECTION_ITEMS.length * 100}vw` }}>
                {COLLECTION_ITEMS.map((item) => (
                    <div key={item.id} className="h-screen w-screen flex-shrink-0 flex items-center justify-center px-10 md:px-40">
                        <div className="relative w-full h-[70vh] group overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/30" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <span className="text-xs tracking-[0.4em] mb-2 block uppercase">{item.category}</span>
                                <h3 className="text-4xl md:text-6xl font-serif">{item.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
