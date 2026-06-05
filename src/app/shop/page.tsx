"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { Filter, SlidersHorizontal } from "lucide-react";

export default function Shop() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-primary-bg min-h-screen text-primary-accent pb-24">
      {/* Hero Header */}
      <div className="relative text-center flex flex-col justify-center items-center min-h-[50vh] pt-36 pb-20 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary-accent/20 rounded-full blur-[90px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-3xl px-4 flex flex-col items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary-accent">
            EXPLORE THE RANGE
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
            THE COLLECTION
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-accent/40 mt-2">
            {filteredProducts.length} ITEMS AVAILABLE
          </p>
        </div>
      </div>

      {/* Sticky Filters bar */}
      <div className="bg-secondary-bg z-40 border-t border-b border-primary-accent/10 h-14 sticky top-0 flex items-center justify-between px-4 md:px-10">
        <div className="flex items-center h-full overflow-x-auto scrollbar-hide shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`uppercase tracking-[0.2em] text-[10px] md:text-xs font-black h-full px-4 border-b-2 transition-all ${
                activeCategory === cat 
                  ? "border-secondary-accent text-primary-accent" 
                  : "border-transparent text-primary-accent/40 hover:text-primary-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-primary-accent/40 pr-2">
          <button className="flex items-center space-x-2 hover:text-primary-accent transition-colors">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-primary-accent transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-primary-accent/40 uppercase tracking-widest font-black text-xs">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
