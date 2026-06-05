import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProductShowcase.module.css';

gsap.registerPlugin(ScrollTrigger);

const categories = ['New Arrivals', 'Trending', 'Best Sellers', 'Limited Edition'];

const products = [
  { id: 1, name: 'Streetwear Brown Hoodie', price: '₹4,999', img: '/streetwear_hoodie_brown_1780597970626.png' },
  { id: 2, name: 'Streetwear White Tee', price: '₹2,499', img: '/streetwear_tee_white_1780597983223.png' },
  { id: 3, name: 'Streetwear Zip-Up Black', price: '₹5,499', img: '/streetwear_zipup_black_1780597997906.png' },
  { id: 4, name: 'Monogram Oversized Shirt', price: '₹3,499', img: '/monogram_shirt_1780589041147.png' },
];

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current) return;

      const getScrollAmount = () => {
        let wrapperWidth = wrapperRef.current?.scrollWidth || 0;
        return -(wrapperWidth - window.innerWidth + 100);
      };

      gsap.to(wrapperRef.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.showcase}>
      <div className={styles.header}>
        <h2 className={styles.title}>CURATED FOR YOU</h2>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <div ref={wrapperRef} className={styles.wrapper}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <img src={product.img} alt={product.name} className={styles.image} />
                <div className={styles.overlay}>
                  <button className={styles.quickAdd}>QUICK ADD</button>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
