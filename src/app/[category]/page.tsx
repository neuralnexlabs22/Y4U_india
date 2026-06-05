"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { brandOptionKey } from "@/lib/catalogHelpers";
import { useCatalog } from "@/context/CatalogContext";
import { ArrowRight, Search } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = use(params);
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, brands, loading } = useCatalog();

  const category = useMemo(
    () => categories.find((c) => c.slug === categorySlug),
    [categories, categorySlug]
  );

  const categoryBrands = useMemo(
    () =>
      brands.filter(
        (b) => b.category_id === categorySlug && b.is_active !== false
      ),
    [brands, categorySlug]
  );

  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return categoryBrands;
    const q = searchTerm.toLowerCase();
    return categoryBrands.filter((brand) =>
      brand.name.toLowerCase().includes(q)
    );
  }, [categoryBrands, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-bg">
        <div className="w-10 h-10 border-2 border-secondary-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-bg">
        <div className="text-center text-primary-accent">
          <h1 className="text-2xl font-bold mb-4">Not found</h1>
          <p className="text-text-brown/60">Category not found</p>
          <Link
            href="/shop"
            className="inline-block mt-4 px-6 py-2 border border-secondary-accent text-secondary-accent rounded-lg font-bold"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg text-primary-accent pt-36 pb-24">
      <div className="relative py-16 md:py-24 px-4 md:px-8 border-b border-primary-accent/10">
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase font-black text-secondary-accent mb-4">
            EXPLORE
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 italic">
            {category.name}
          </h1>
          <p className="text-lg text-text-brown max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-brown/40" />
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-secondary-bg border border-primary-accent/15 rounded-lg text-primary-accent placeholder:text-text-brown/30 focus:outline-none focus:border-secondary-accent/40"
          />
        </div>
        <p className="text-sm text-text-brown/60 mt-2">
          {filteredBrands.length} brand{filteredBrands.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <Link
                key={brandOptionKey(brand)}
                href={`/${categorySlug}/${brand.slug}`}
                className="group block h-full"
              >
                <div className="bg-secondary-bg border border-primary-accent/10 rounded-xl overflow-hidden hover:border-secondary-accent/40 transition-colors duration-200 h-full flex flex-col p-6 shadow-sm">
                  <h3 className="text-2xl font-black mb-2 group-hover:text-secondary-accent transition-colors uppercase italic">
                    {brand.name}
                  </h3>
                  <p className="text-text-brown text-sm mb-4 flex-1 line-clamp-2">
                    {brand.description}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary-accent inline-flex items-center gap-1">
                    Shop Brand <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-brown/60">
            No brands in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
