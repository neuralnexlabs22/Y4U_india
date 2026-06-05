"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './BrandReveal.module.css';
import Link from 'next/link';

export default function BrandReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImgRef  = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const centerRef   = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const svgRef      = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Spin SVG circle continuously ── */
      gsap.to(svgRef.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '50% 50%',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.brandReveal} brand-reveal-container`}>

      {/* ── Left fashion image ── */}
      <div ref={leftImgRef} className={`${styles.sidePanel} brand-reveal-left-img`}>
        <img
          src="/genz_vintage_streetwear_1_1780592585786.png"
          alt="Streetwear t-shirt cargo"
          className={styles.sideImg}
        />
        <div className={styles.sideFade} />
      </div>

      {/* ── Centre: spinning circle + text ── */}
      <div ref={centerRef} className={styles.center}>
        
        {/* Giant background Y4U INDIA text */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.08] select-none whitespace-nowrap">
          <h1 className="text-[10vw] font-bold tracking-widest text-outline uppercase" style={{ fontFamily: 'var(--font-serif)' }}>
            Y4U INDIA
          </h1>
        </div>

        {/* SVG spinning ring */}
        <svg
          ref={svgRef}
          className={styles.ring}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100" cy="100" r="94"
            stroke="currentColor" strokeWidth="2"
            strokeDasharray="6 10"
          />
          <circle
            cx="100" cy="100" r="80"
            stroke="currentColor" strokeWidth="0.8"
            strokeDasharray="40 15"
            opacity="0.45"
          />
        </svg>

        {/* Text block */}
        <div ref={textRef} className={styles.textBlock}>
          <h2 className={styles.headline}>
            <span className={`${styles.line1} brand-reveal-span`}>WEAR</span>
            <span className={`${styles.line2} brand-reveal-span`}>YOUR</span>
            <span className={`${styles.line3} brand-reveal-span`}>STORY</span>
          </h2>
          <p className={`${styles.categories} br-sub brand-reveal-sub`}>
            T-SHIRTS&nbsp;&nbsp;|&nbsp;&nbsp;HOODIES&nbsp;&nbsp;|&nbsp;&nbsp;BOTTOMS&nbsp;&nbsp;|&nbsp;&nbsp;OUTERWEAR
          </p>
          <Link
            href="/shop"
            className={`${styles.cta} br-sub brand-reveal-sub`}
          >
            SHOP NOW +
          </Link>
        </div>

        {/* Bottom Nav Links */}
        <div className={styles.bottomLinks}>
          <Link href="/">HOME</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/about">ABOUT US</Link>
          <Link href="/contact">CONTACT US</Link>
        </div>
      </div>

      {/* ── Right fashion image ── */}
      <div ref={rightImgRef} className={`${styles.sidePanel} brand-reveal-right-img`}>
        <img
          src="/genz_vintage_streetwear_2_1780592599689.png"
          alt="Streetwear hoodie cargo"
          className={styles.sideImg}
        />
        <div className={`${styles.sideFade} ${styles.sideFadeRight}`} />
      </div>

    </section>
  );
}
