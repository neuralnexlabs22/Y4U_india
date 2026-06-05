"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  // Hide global navbar entirely on product detail pages (it has its own back bar)
  if (pathname.includes('/products/')) {
    return null;
  }

  const isHome = pathname === '/';

  return (
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
    </nav>
  );
}

