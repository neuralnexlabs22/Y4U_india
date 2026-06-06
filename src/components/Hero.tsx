import { useRef } from 'react';
import styles from './Hero.module.css';

const gridImages = [
  '/hero_tshirt_1.png',   // Black oversized graphic tee
  '/hero_shirt_2.png',    // Green plaid flannel overshirt
  '/hero_casual_3.png',   // Olive linen shirt casual look
  '/hero_tshirt_4.png',   // White oversized tee minimal
  '/hero_polo_5.png',     // Navy blue polo
  '/hero_shirt_6.png',    // Beige linen shirt flat lay
  '/hero_tshirt_7.png',   // Brown vintage graphic tee
  '/hero_denim_8.png',    // Light blue denim shirt
  '/hero_street_9.png',   // Dark grey streetwear tee
  '/hero_shirt_10.png',   // Maroon polo
  '/hero_casual_11.png',  // Sage green camp collar shirt
  '/hero_tee_12.png',     // Charcoal acid wash tee
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
