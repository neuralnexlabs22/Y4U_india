import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';
import styles from './ProductShowcase.module.css';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Trending', 'New Arrivals', 'Best Sellers', 'All Collections'];

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { products, loaded } = useProducts();

  // Filter products based on active category
  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'Trending') return product.isTrending;
    if (activeCategory === 'New Arrivals') return product.isNew;
    return true; // Best Sellers and All Collections show all for now
  });

  // Fallback if no trending products are selected
  const displayProducts = filteredProducts.length > 0 
    ? filteredProducts 
    : products.slice(0, 6); // Show latest 6 products if empty

  useEffect(() => {
    // Only initialize GSAP when we have products and DOM is ready
    if (!loaded || displayProducts.length === 0 || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        let wrapperWidth = wrapperRef.current?.scrollWidth || 0;
        // Calculate the maximum scroll amount so the last card reaches the end of the container
        const maxScroll = -(wrapperWidth - window.innerWidth + 100);
        return Math.min(0, maxScroll); // Ensure we don't scroll positively if content is too small
      };

      // Only apply scroll trigger if content overflows
      if (wrapperRef.current && wrapperRef.current.scrollWidth > window.innerWidth) {
        gsap.to(wrapperRef.current, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded, displayProducts, activeCategory]);

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
        {!loaded ? (
          <div className="flex items-center justify-center h-[50vh] w-full text-zinc-500 font-mono text-sm uppercase tracking-widest">
            Loading Collections...
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="flex items-center justify-center h-[50vh] w-full text-zinc-500 font-mono text-sm uppercase tracking-widest">
            No Products Found
          </div>
        ) : (
          <div ref={wrapperRef} className={styles.wrapper}>
            {displayProducts.map((product) => (
              <div key={product.id} className={styles.card}>
                <Link href={`/products/${product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}`} className={styles.imageContainer}>
                  <img 
                    src={product.images[0] || '/images/chrono_watch.png'} 
                    alt={product.name} 
                    className={styles.image} 
                  />
                  <div className={styles.overlay}>
                    <button className={styles.quickAdd}>VIEW PRODUCT</button>
                  </div>
                </Link>
                <div className={styles.info}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.price}>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0
                    }).format(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
