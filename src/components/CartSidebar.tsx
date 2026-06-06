"use client";

import { useCart } from "@/context/CartContext";
import { useContactInfo } from "@/context/ContactInfoContext";
import styles from "./CartSidebar.module.css";
import { X, Trash2, ShoppingBag, Send } from "lucide-react";
import Image from "next/image";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function CartSidebar() {
  const {
    items,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();
  const { contactInfo } = useContactInfo();
  const whatsappNumber = contactInfo?.whatsapp_number || "919353812197";



  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = "Hello, I'd like to place an order from my cart:\n\n";

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      if (item.size) message += `   Size: ${item.size}\n`;
      if (item.color) message += `   Color: ${item.color}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ${currency.format(item.price)}\n\n`;
    });

    message += `*Order Subtotal: ${currency.format(subtotal)}*\n\n`;
    message += "Please provide payment and shipping details.";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      /\D/g,
      ""
    )}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ""}`}
        onClick={toggleCart}
      />
      <div
        className={`${styles.sidebar} ${isCartOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button onClick={toggleCart} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <div>
                    <div className={styles.itemHeader}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className={styles.itemRemove}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className={styles.itemVariants}>
                      {item.size && <span>Size: {item.size}</span>}
                      {item.size && item.color && <span> | </span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                  </div>
                  <div className={styles.itemFooter}>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        className={styles.qtyBtn}
                      >
                        -
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                        className={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.itemPrice}>
                      {currency.format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <button onClick={handleCheckout} className={styles.checkoutBtn}>
              <Send size={18} />
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
