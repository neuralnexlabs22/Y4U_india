"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    id: string;
    slug?: string;
    name: string;
    price: number;
    images: string[];
    isNew?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const productHref = `/products/${product.slug || product.id}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col cursor-pointer bg-secondary-bg border border-primary-accent/10 hover:border-primary-accent/30 rounded-2xl shadow-sm hover:shadow-[0_8px_40px_rgba(59,40,24,0.08)] transition-all duration-400 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#ede5d9]">
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-primary-accent text-primary-bg text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            New
          </span>
        )}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 p-2 text-primary-accent/70 hover:text-primary-accent bg-primary-bg/80 hover:bg-primary-bg backdrop-blur-md rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-md"
        >
          <Heart className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
        
        <Link href={productHref} className="absolute inset-0 block">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        </Link>

        {/* Quick View Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 hidden md:block">
          <Link href={productHref} className="block w-full">
            <button 
              className="w-full bg-primary-accent text-primary-bg py-3 text-xs md:text-sm font-black uppercase tracking-widest shadow-lg hover:bg-secondary-accent hover:text-primary-accent transition-colors duration-300 flex items-center justify-center space-x-2 rounded-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>QUICK VIEW</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <Link href={productHref} className="flex flex-col p-4 md:p-6 border-t border-primary-accent/5">
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-secondary-accent mb-1">
          STREETWEAR
        </span>
        <h3 className="text-sm md:text-base font-black text-primary-accent uppercase tracking-wide mb-2 group-hover:text-secondary-accent transition-colors line-clamp-1 italic">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-primary-accent/5">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary-accent/50 group-hover:text-secondary-accent transition-colors">
            Explore
          </span>
          <p className="text-sm md:text-base font-bold text-primary-accent">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
