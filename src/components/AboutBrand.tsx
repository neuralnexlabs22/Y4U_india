import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutBrand.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutBrand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });

      // Split text animation effect for the paragraph
      if (textRef.current) {
        const text = textRef.current;
        text.innerHTML = text.textContent!.split(' ').map(word => `<span class="${styles.word}">${word}</span>`).join(' ');
        
        const words = text.querySelectorAll(`.${styles.word}`);
        
        gsap.from(words, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.aboutBrand}>
      <div className={styles.content}>
        <h2 ref={titleRef} className={styles.title}>WEAR UR STORY</h2>
        <p ref={textRef} className={styles.description}>
          Y4U INDIA is more than fashion. Every piece represents individuality, confidence, and self-expression. Our garments are designed for people who want their style to tell their story.
        </p>
      </div>
    </section>
  );
}
