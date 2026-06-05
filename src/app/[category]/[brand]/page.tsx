"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCatalog } from "@/context/CatalogContext";
import ProductCard from "@/components/ProductCard";

export default function BrandPage({
  params,
}: {
  params: Promise<{ category: string; brand: string }>;
}) {
  const { category: categorySlug, brand: brandSlug } = use(params);
  const { products, loaded: productsLoaded } = useProducts();
  const { categories, brands, loading: catalogLoading } = useCatalog();
  const [sortBy, setSortBy] = useState("newest");

  const category = useMemo(
    () => categories.find((c) => c.slug === categorySlug),
    [categories, categorySlug]
  );

  const brand = useMemo(
    () =>
      brands.find(
        (b) => b.slug === brandSlug && b.category_id === categorySlug
      ),
    [brands, brandSlug, categorySlug]
  );

  const brandProducts = useMemo(() => {
    if (!brand) return [];
    return products.filter((p) => p.brand === brand.name);
  }, [products, brand]);

  const sortedProducts = useMemo(() => {
    const list = [...brandProducts];
    if (sortBy === "price-low") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return list.sort((a, b) => b.price - a.price);
    return list;
  }, [brandProducts, sortBy]);

  if (catalogLoading || !productsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-bg">
        <div className="w-10 h-10 border-2 border-secondary-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!brand || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-bg text-primary-accent">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not found</h1>
          <Link href="/shop" className="text-secondary-accent font-bold">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg text-primary-accent pt-36 pb-24">
      <div className="relative py-16 md:py-20 px-4 md:px-8 border-b border-primary-accent/10 mb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-secondary-accent text-sm tracking-widest uppercase font-black mb-2">
            {category.name}
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic">{brand.name}</h1>
          <p className="text-lg text-text-brown max-w-2xl mt-4">{brand.description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-secondary-bg border border-primary-accent/20 rounded text-primary-accent text-sm font-bold focus:outline-none focus:border-secondary-accent/40"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
        <p className="text-sm text-text-brown/60 self-end">
          {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-secondary-bg border border-primary-accent/10 rounded-xl shadow-sm">
            <h3 className="text-xl font-black text-primary-accent mb-2 uppercase italic">No Products Available</h3>
            <p className="text-text-brown/60">
              We don&apos;t have any products listed under {brand.name} at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
