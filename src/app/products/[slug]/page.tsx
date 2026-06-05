"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Brand, Category, Product, ProductImage, ProductVariant } from "@/types/database";
import { products as localProducts } from "@/data/products";
import {
  ArrowLeft,
  Heart,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

type ProductDetail = Product & {
  brands?: Brand | null;
  categories?: Category | null;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
};

export default function SupabaseProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        let foundProduct: ProductDetail | null = null;

        if (supabase) {
          const { data, error: productError } = await supabase
            .from("products")
            .select("*, brands(*), categories(*), product_images(*), product_variants(*)")
            .eq("slug", slug)
            .eq("is_active", true)
            .maybeSingle();

          if (data) {
            foundProduct = {
              ...data,
              product_images: [...(data.product_images || [])].sort(
                (a: ProductImage, b: ProductImage) => a.display_order - b.display_order
              ),
            };
          }
        }

        if (!foundProduct) {
          // Fallback to local products list
          const local = localProducts.find(p => p.id === slug || p.name.toLowerCase().replace(/\s+/g, "-") === slug);
          if (local) {
            foundProduct = {
              id: local.id,
              slug: local.id,
              name: local.name,
              brand_id: "local-brand",
              category_id: "local-category",
              sku: `SKU-${local.id}`,
              discount_price: local.price,
              original_price: local.price,
              short_description: local.description,
              full_description: local.description,
              featured: local.isNew,
              tags: local.isTrending ? ["trending"] : [],
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              brands: { id: "local-brand", name: local.brand, slug: local.brand.toLowerCase(), category_id: "local-category", description: "", is_active: true, created_at: "", updated_at: "" },
              categories: { id: "local-category", name: local.category, slug: local.category.toLowerCase(), description: "", is_active: true, created_at: "", updated_at: "" },
              product_images: local.images.map((img, idx) => ({ id: idx, product_id: local.id, image_url: img, display_order: idx, is_main: idx === 0, created_at: "" })),
              product_variants: local.sizes.flatMap((size) => local.colors.map((color) => ({ id: `${size}-${color}`, product_id: local.id, size, color, sku: `SKU-${size}-${color}`, stock_quantity: local.stock, stock_status: "in_stock", created_at: "", updated_at: "" })))
            } as any;
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
          setError("");
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-bg text-primary-accent font-sans">
        <div className="w-10 h-10 border-2 border-primary-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-bg px-4 text-center text-primary-accent font-sans">
        <div>
          <h1 className="mb-3 text-2xl font-black uppercase tracking-wider text-primary-accent">Product not found</h1>
          <p className="mb-6 text-sm text-primary-accent/40">{error}</p>
          <Link href="/shop" className="text-sm font-black uppercase tracking-widest text-secondary-accent hover:text-primary-accent">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.product_images || [];
  const active = images[activeImage] || images[0];

  return (
    <div className="min-h-screen bg-primary-accent text-primary-bg font-sans">
      {/* Sticky top navigation strip */}
      <div className="sticky top-0 z-40 bg-[#28160c]/75 backdrop-blur-md border-b border-primary-bg/10 flex justify-between items-center px-4 md:px-12 py-4 h-14">
        <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-bg/50 hover:text-secondary-accent transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to shop
        </Link>
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-primary-bg/30 hidden sm:flex">
          <Link href="/shop" className="hover:text-secondary-accent">{product.categories?.name}</Link>
          <span>/</span>
          <span className="text-secondary-accent">{product.brands?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-56px)]">
        {/* Left Column: Images sticky */}
        <div className="md:col-span-7 bg-[#1a0c05] relative h-[60vh] md:h-[calc(100vh-56px)] md:sticky md:top-14 overflow-hidden flex flex-col justify-end">
          {product.featured && (
            <span className="absolute top-6 left-6 z-10 bg-secondary-accent text-primary-accent text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              Featured
            </span>
          )}

          {active ? (
            <img
              src={active.image_url}
              alt={product.name}
              className="h-full w-full object-cover opacity-60 hover:opacity-75 transition-opacity duration-700"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-primary-bg/25">
              <ShoppingBag className="h-16 w-16" />
            </div>
          )}

          {/* Thumbnail strip on the image */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-6 z-10 flex gap-2 overflow-x-auto max-w-full py-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square w-12 shrink-0 overflow-hidden rounded-lg border-2 bg-zinc-950 ${
                    activeImage === index
                      ? "border-secondary-accent"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={image.thumbnail_url || image.image_url}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details scrollable */}
        <div className="md:col-span-5 bg-primary-bg text-primary-accent flex flex-col gap-6 p-6 md:p-14 overflow-y-auto">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary-accent mb-2">
              {product.brands?.name}
            </p>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wide leading-none italic text-primary-accent">
              {product.name}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-accent/40 mt-2">
              {product.categories?.name} {product.product_type ? `/ ${product.product_type}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-4 border-b border-primary-accent/10 pb-6">
            <span className="text-2xl font-black text-primary-accent">
              Rs. {Number(product.discount_price).toLocaleString("en-IN")}
            </span>
            {product.original_price !== product.discount_price && (
              <>
                <span className="text-sm text-primary-accent/30 line-through">
                  Rs. {Number(product.original_price).toLocaleString("en-IN")}
                </span>
                <span className="bg-primary-accent text-primary-bg text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Save
                </span>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed text-text-brown border-b border-primary-accent/5 pb-6">
            {product.full_description || product.short_description}
          </p>

          {/* Tags */}
          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2 pb-6 border-b border-primary-accent/5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary-accent/10 bg-primary-accent/5 px-3.5 py-1 text-[10px] font-bold text-primary-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {product.product_variants && product.product_variants.length > 0 && (
            <div className="space-y-6">
              {/* Sizes */}
              {Array.from(new Set(product.product_variants.map(v => v.size).filter(Boolean))).length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary-accent/50">
                    <span>Size</span>
                    {selectedSize && <span className="text-secondary-accent font-bold">{selectedSize}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(product.product_variants.map(v => v.size).filter(Boolean))).map((size) => (
                      <button
                        key={size as string}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size as string)}
                        className={`flex h-11 min-w-[3.5rem] items-center justify-center rounded-lg border px-4 text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "border-primary-accent bg-primary-accent text-primary-bg shadow-lg"
                            : "border-primary-accent/20 bg-transparent text-primary-accent hover:border-primary-accent"
                        }`}
                      >
                        {size as string}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {Array.from(new Set(product.product_variants.map(v => v.color).filter(Boolean))).length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary-accent/50">
                    <span>Color</span>
                    {selectedColor && <span className="text-secondary-accent font-bold">{selectedColor}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(product.product_variants.map(v => v.color).filter(Boolean))).map((color) => (
                      <button
                        key={color as string}
                        onClick={() => setSelectedColor(selectedColor === color ? null : color as string)}
                        className={`flex h-11 items-center justify-center rounded-lg border px-4 text-xs font-bold transition-all ${
                          selectedColor === color
                            ? "border-primary-accent bg-primary-accent text-primary-bg shadow-lg"
                            : "border-primary-accent/20 bg-transparent text-primary-accent hover:border-primary-accent"
                        }`}
                      >
                        {color as string}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <button className="flex min-h-[3.5rem] w-full items-center justify-center gap-2 rounded-xl bg-primary-accent text-xs font-black uppercase tracking-widest text-primary-bg hover:bg-secondary-accent hover:text-primary-accent transition-colors duration-300 shadow-md">
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            
            <a 
              href={`https://wa.me/919353812197?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} - Rs. ${product.discount_price}.${selectedSize && selectedSize !== "One Size" ? ` Size: ${selectedSize}.` : ""}${selectedColor && selectedColor !== "Default" ? ` Color: ${selectedColor}.` : ""} Please share details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[3.5rem] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-black uppercase tracking-widest text-black hover:brightness-110 transition-all shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Inquiry
            </a>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-4 border-t border-primary-accent/10 pt-8 mt-4 text-center text-[9px] font-black tracking-wider text-text-brown">
            <div className="rounded-xl border border-primary-accent/5 bg-secondary-bg p-3 flex flex-col items-center">
              <Truck className="mb-2 h-4 w-4 text-secondary-accent" />
              FAST DELIVERY
            </div>
            <div className="rounded-xl border border-primary-accent/5 bg-secondary-bg p-3 flex flex-col items-center">
              <RefreshCw className="mb-2 h-4 w-4 text-secondary-accent" />
              PAN INDIA SHIPPING
            </div>
            <div className="rounded-xl border border-primary-accent/5 bg-secondary-bg p-3 flex flex-col items-center">
              <ShieldCheck className="mb-2 h-4 w-4 text-secondary-accent" />
              SECURE CHECKOUT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
