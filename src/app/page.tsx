"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { StickyReveal } from "@/components/StickyReveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MagneticCursor } from "@/components/MagneticCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen">
        <MagneticCursor />

        <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
          <span className="text-xl font-serif font-bold tracking-widest cursor-pointer">AURA</span>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-4 text-sm font-bold tracking-widest hover:text-slate-gray transition-colors"
          >
            <span className="hidden md:block">MENU</span>
            <div className="flex flex-col gap-1 w-6">
              <span className="h-[1px] w-full bg-off-white group-hover:bg-slate-gray transition-colors"></span>
              <span className="h-[1px] w-full bg-off-white group-hover:bg-slate-gray transition-colors"></span>
            </div>
          </button>
        </nav>

        <Hero />

        <section id="story" className="py-20 md:py-40 px-8 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="w-full md:w-1/2">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
              alt="Craftsmanship"
              className="h-[60vh] md:h-[80vh] w-full"
              speed={1.5}
            />
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">THE CRAFT OF SILENCE</h2>
            <p className="text-slate-gray text-base leading-relaxed mb-8">
              Every stitch is a testament to our commitment to minimalist perfection. We believe that true luxury is felt, not seen.
            </p>
            <button className="border border-off-white px-8 py-4 hover:bg-off-white hover:text-eerie-black transition-colors">
              READ OUR STORY
            </button>
          </div>
        </section>

        <HorizontalGallery />

        <StickyReveal />

        <section className="py-40 bg-white text-eerie-black text-center px-8">
          <h2 className="text-6xl md:text-[12rem] font-serif leading-none mb-20 tracking-tighter">
            ELEVATE YOUR SOUL
          </h2>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2070&auto=format&fit=crop"
              alt="Model 1"
              className="h-[50vh] w-full md:w-1/4"
              speed={0.8}
            />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=2070&auto=format&fit=crop"
              alt="Model 2"
              className="h-[70vh] w-full md:w-1/3"
              speed={1.2}
            />
          </div>
        </section>

        <footer id="footer" className="py-20 px-8 border-t border-slate-gray/20 flex flex-col md:flex-row justify-between items-start gap-20">
          <div>
            <span className="text-4xl font-serif font-bold tracking-widest block mb-10">AURA</span>
            <p className="max-w-xs text-slate-gray text-xs">
              Maison d'Aura. All rights reserved. 2025.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-xs mb-4">SOCIAL</span>
              <a href="#" className="text-xs text-slate-gray hover:text-white">INSTAGRAM</a>
              <a href="#" className="text-xs text-slate-gray hover:text-white">TWITTER</a>
              <a href="#" className="text-xs text-slate-gray hover:text-white">LINKEDIN</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-xs mb-4">LEGAL</span>
              <a href="#" className="text-xs text-slate-gray hover:text-white">PRIVACY</a>
              <a href="#" className="text-xs text-slate-gray hover:text-white">TERMS</a>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
