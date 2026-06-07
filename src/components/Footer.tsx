import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandInfo}>
            <h2 className={styles.brandName}>Y4U INDIA</h2>
            <p className={styles.tagline}>~ WEAR UR STORY ~</p>
            <p className={styles.description}>
              Premium fashion designed for the modern storyteller. 
              Elevate your style with pieces that define you.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>SHOP</h4>
              <a href="/shop/hoodies" className={styles.link}>Hoodies</a>
              <a href="/shop/t-shirts" className={styles.link}>T-Shirts</a>
              <a href="/shop/bottoms" className={styles.link}>Bottoms</a>
              <a href="/shop/outerwear" className={styles.link}>Outerwear</a>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>ABOUT US</h4>
              <a href="#" className={styles.link}>Our Story</a>
              <a href="#" className={styles.link}>Careers</a>
              <a href="#" className={styles.link}>Sustainability</a>
              <a href="#" className={styles.link}>Journal</a>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>HELP</h4>
              <a href="#" className={styles.link}>Contact Us</a>
              <a href="#" className={styles.link}>Shipping & Returns</a>
              <a href="#" className={styles.link}>FAQ</a>
              <a href="#" className={styles.link}>Track Order</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.newsletter}>
            <h4 className={styles.groupTitle}>JOIN THE CLUB</h4>
            <p className={styles.newsletterText}>Get exclusive access to limited drops and events.</p>
            <form className={styles.form}>
              <input type="email" placeholder="Email Address" className={styles.input} />
              <button type="submit" className={styles.submitBtn}>SUBSCRIBE</button>
            </form>
          </div>

          <div className={styles.socials}>
            <a href="https://www.instagram.com/y4u_india/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
            <a href="#" className={styles.socialLink}>Twitter</a>
            <a href="#" className={styles.socialLink}>Tiktok</a>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Y4U INDIA. All Rights Reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
