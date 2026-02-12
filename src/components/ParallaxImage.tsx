"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
}

export const ParallaxImage = ({ src, alt, className, speed = 1 }: ParallaxImageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        gsap.to(imageRef.current, {
            y: (i, target) => -((target.offsetHeight * 0.2) * speed),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <div className="relative w-full h-full scale-110">
                <Image
                    ref={imageRef as any}
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};
