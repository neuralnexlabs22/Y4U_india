"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import BrandReveal from '@/components/BrandReveal';
import ProductShowcase from '@/components/ProductShowcase';
import AboutBrand from '@/components/AboutBrand';
import Testimonials from '@/components/Testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Unified Intro Stack Timeline
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-stack",
          start: "top top",
          end: "+=120%", // 1.2 viewports of scrolling
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      // 1. Hero Zoom & Fade Out
      mainTl.to(".hero-grid", {
        scale: 4.5,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1
      }, 0);

      mainTl.to(".hero-text", {
        scale: 1.2,
        opacity: 0,
        y: -60,
        ease: "power1.inOut",
        duration: 1
      }, 0);

      mainTl.to(".hero-container", {
        autoAlpha: 0,
        ease: "power2.inOut",
        duration: 0.8
      }, 0.2);

      // 2. Brand Reveal Animations (Reveal it in place)
      mainTl.fromTo(".brand-reveal-container", {
        opacity: 0
      }, {
        opacity: 1,
        ease: "none",
        duration: 0.3
      }, 0.2);

      // Left image slides in from left
      mainTl.fromTo(".brand-reveal-left-img", {
        xPercent: -80,
        opacity: 0
      }, {
        xPercent: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.8
      }, 0.4);

      // Right image slides in from right
      mainTl.fromTo(".brand-reveal-right-img", {
        xPercent: 80,
        opacity: 0
      }, {
        xPercent: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.8
      }, 0.4);

      // Center text staggers up
      mainTl.fromTo(".brand-reveal-span", {
        y: 60,
        opacity: 0,
        filter: "blur(10px)"
      }, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        ease: "power2.out",
        duration: 0.7
      }, 0.35);

      // Categories + Shop Now CTA
      mainTl.fromTo(".brand-reveal-sub", {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.6
      }, 0.65);

      // 3. Brand Reveal Parallax (scrubs as we finish the pin transition)
      mainTl.to(".brand-reveal-left-img img", {
        y: 50,
        ease: "none",
        duration: 0.4
      }, 0.8);

      mainTl.to(".brand-reveal-right-img img", {
        y: -50,
        ease: "none",
        duration: 0.4
      }, 0.8);

    });

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-primary-bg min-h-screen">
      <div className="intro-stack">
        {/* 1. Zoom-in perspectives Hero Grid */}
        <Hero />
        
        {/* 2. Parallax Brand Reveal with spinning ring & models */}
        <BrandReveal />
      </div>
      
      {/* 3. Horizontal scrolling dynamic Product Showcase */}
      <ProductShowcase />
      
      {/* 4. Word-by-word reveal brand ethos statement */}
      <AboutBrand />
      

      
      {/* 6. Infinite looping community Testimonials marquee */}
      <Testimonials />
    </div>
  );
}
