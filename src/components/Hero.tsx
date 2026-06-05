import { useRef } from 'react';
import styles from './Hero.module.css';

const gridImages = [
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className={`${styles.hero} hero-container`}>
      <div className={styles.perspectiveContainer}>
        <div ref={gridRef} className={`${styles.grid} hero-grid`}>
          {gridImages.map((src, index) => (
            <div key={index} className={styles.card}>
              <img src={src} alt="Product" className={styles.image} />
            </div>
          ))}
        </div>
      </div>
      
      <div ref={textRef} className={`${styles.content} hero-text`}>
        <h1 className={styles.title}>Y4U INDIA</h1>
        <p className={styles.subtitle}>~ WEAR UR STORY ~</p>
      </div>
    </section>
  );
}
