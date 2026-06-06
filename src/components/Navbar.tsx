"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  // Hide global navbar entirely on product detail pages (it has its own back bar)
  if (pathname.includes('/products/')) {
    return null;
  }

  const isHome = pathname === '/';

  return (
    <>
      <nav className={`${styles.navbar} ${!isHome ? styles.absoluteNav : ''}`}>
        <div className={styles.logoContainer}>
          <img src="/y4u_logo_round_1780316201558.png" alt="Y4U" className={styles.logoIcon} />
          <Link href="/" className={styles.logoText}>Y4U.</Link>
        </div>
        <div className={styles.links}>
          <Link href="/">HOME</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/about">ABOUT US</Link>
          <Link href="/contact">CONTACT US</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.cartBtn} onClick={toggleCart} aria-label="Open Cart">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>
          <button 
            className={styles.hamburger} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ zIndex: 200 }}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileLinks}>
          <Link href="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>SHOP</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link>
        </div>
      </div>
    </>
  );
}


