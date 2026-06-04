import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Plus, Minus, Share2, ShoppingCart, ArrowLeft, Mail, Copy, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { getProductById, getProducts } from "../../services/productService";
import { ProductCard } from "../components/ProductCard";

const getProductName = (product, language) => {
  if (language?.startsWith("ar") && product.arabic) return product.arabic;
  return product.name || "";
};

function ProductDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [shareMessage, setShareMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [variantError, setVariantError] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    setLoading(true);
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setActiveImage("");
    getProductById(id)
      .then((prod) => {
        setProduct(prod);
        if (prod) {
          const images = [...new Set([prod.image, ...prod.images].filter(Boolean))];
          setActiveImage(images[0] || "");
          getProducts()
            .then((all) =>
              setRelatedProducts(
                all.filter((p) => p.category === prod.category && p.id !== prod.id).slice(0, 4)
              )
            )
            .catch(() => {});
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedSize, selectedColor]);

  const sizeOptions = Array.isArray(product?.sizes) ? product.sizes : [];
  const colorOptions = Array.isArray(product?.colors) ? product.colors : [];
  const requiresSize = sizeOptions.length > 0;
  const requiresColor = colorOptions.length > 0;

  if (loading) {
    return (
      <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 68px)" }} className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 68px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>{t("productDetail.notFound")}</h2>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#1E5EFF" }}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span>{t("common.backToProducts")}</span>
          </Link>
        </div>
      </div>
    );
  }

  const productName = getProductName(product, i18n.language);
  const isArabic = i18n.language.startsWith("ar");
  const productDescription = isArabic
    ? (product.description_ar || product.description || "")
    : (product.description || "");
  const productCategory = isArabic
    ? (product.categoryName_ar || product.categoryName)
    : (product.categoryName || t(`categories.${product.category}`, { defaultValue: product.category }));

  const productImages = [...new Set([product.image, ...product.images].filter(Boolean))].slice(0, 5);

  const handleAddToCart = () => {
    if (requiresSize && !selectedSize) { setVariantError(t("productDetail.selectSize")); return; }
    if (requiresColor && !selectedColor) { setVariantError(t("productDetail.selectColor")); return; }
    setVariantError("");
    addToCart(
      {
        id: product.id,
        name: product.name,
        arabic: product.arabic,
        code: product.code,
        category: product.category,
        image: product.image,
        size: selectedSize || undefined,
        color: selectedColor || undefined,
      },
      quantity
    );
  };

  const handleShareWhatsApp = () => {
    const text = t("productDetail.shareWhatsappText", { productName, code: product.code, url: window.location.href });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    setShareMessage(t("productDetail.whatsappSent", { defaultValue: "Shared successfully" }));
    setTimeout(() => setShareMessage(""), 2000);
  };

  const handleShareEmail = () => {
    const subject = t("productDetail.shareEmailSubject", { productName });
    const body = t("productDetail.shareEmailBody", { productName, code: product.code, url: window.location.href });
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage(t("productDetail.linkCopied"));
      setTimeout(() => setShareMessage(""), 2000);
    } catch {
      setShareMessage(t("productDetail.copyFailed"));
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 68px)" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E2E8F0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#1E5EFF]"
            style={{ color: "#6B7280" }}
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span>{t("common.backToProducts")}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden sticky top-24 p-4" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,0.07)" }}>
              <div className="aspect-[5/4] rounded-xl overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
                <img src={activeImage} alt={productName} className="w-full h-full object-contain p-4" />
              </div>
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {productImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setActiveImage(image)}
                      className="aspect-square rounded-xl overflow-hidden border-2 transition-all duration-150"
                      style={{
                        borderColor: activeImage === image ? "#1E5EFF" : "#E2E8F0",
                        boxShadow: activeImage === image ? "0 0 0 2px rgba(30,94,255,0.15)" : "none",
                      }}
                    >
                      <img src={image} alt="" className="w-full h-full object-contain p-1" style={{ backgroundColor: "#F8FAFC" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-7" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,0.07)" }}>
              {/* Badge & Category */}
              <div className="flex items-center gap-2 mb-3">
                {product.badge && product.badge.toLowerCase() !== "none" && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#FEF3C7", color: "#B45309" }}
                  >
                    <Tag className="w-3 h-3" />
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#E6F7FB", color: "#00B8D9" }}>
                  {productCategory}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-snug" style={{ color: "#0A2540" }}>{productName}</h1>
              <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>
                {t("productDetail.productCode", { code: product.code })}
              </p>

              {productDescription && (
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: "#0A2540" }}>{t("common.description")}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{productDescription}</p>
                </div>
              )}

              {/* Sizes */}
              {requiresSize && (
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-2.5" style={{ color: "#0A2540" }}>{t("common.size")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setVariantError(""); }}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                        style={{
                          background: selectedSize === size ? "linear-gradient(135deg, #1E5EFF, #2563EB)" : "#F8FAFC",
                          color: selectedSize === size ? "white" : "#475569",
                          border: selectedSize === size ? "1px solid #1E5EFF" : "1px solid #E2E8F0",
                          boxShadow: selectedSize === size ? "0 2px 8px rgba(30,94,255,0.25)" : "none",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {requiresColor && (
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-2.5" style={{ color: "#0A2540" }}>{t("common.color")}</h3>
                  <div className="flex items-center gap-2.5">
                    {colorOptions.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => { setSelectedColor(color.id); setVariantError(""); }}
                        className="w-9 h-9 rounded-full p-0.5 transition-all duration-150"
                        style={{
                          border: selectedColor === color.id ? "2px solid #1E5EFF" : "2px solid #E2E8F0",
                          boxShadow: selectedColor === color.id ? "0 0 0 3px rgba(30,94,255,0.15)" : "none",
                        }}
                        title={color.name}
                        aria-label={color.name}
                      >
                        <span
                          className="block w-full h-full rounded-full"
                          style={{
                            backgroundColor: color.hex,
                            border: color.id === "white" ? "1px solid #D1D5DB" : "none",
                          }}
                        />
                      </button>
                    ))}
                    {selectedColor && (
                      <span className="text-xs ml-1" style={{ color: "#64748B" }}>
                        {colorOptions.find((c) => c.id === selectedColor)?.name}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #F1F5F9" }}>
                <h3 className="text-sm font-semibold mb-2.5" style={{ color: "#0A2540" }}>{t("common.quantity")}</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0" }}
                  >
                    <Minus className="w-4 h-4" style={{ color: "#475569" }} />
                  </button>
                  <span className="text-xl font-semibold w-10 text-center" style={{ color: "#0A2540" }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0" }}
                  >
                    <Plus className="w-4 h-4" style={{ color: "#475569" }} />
                  </button>
                </div>
              </div>

              {variantError && (
                <p className="text-xs mb-3 font-medium" style={{ color: "#DC2626" }}>{variantError}</p>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 mb-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #1E5EFF, #2563EB)",
                  color: "white",
                  boxShadow: "0 4px 14px rgba(30,94,255,0.3)",
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t("common.addToCart")}</span>
              </button>

              {/* Share */}
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#0A2540" }}>{t("productDetail.shareProduct")}</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{ backgroundColor: "#25D366", color: "white" }}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{t("productDetail.whatsapp")}</span>
                  </button>
                  <button
                    onClick={handleShareEmail}
                    className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{ backgroundColor: "#00B8D9", color: "white" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{t("productDetail.email")}</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="py-2.5 px-4 rounded-xl flex items-center justify-center transition-all hover:bg-[#F1F5F9] active:scale-[0.97]"
                    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", color: "#475569" }}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {shareMessage && (
                  <p className="text-xs mt-2 text-center font-medium" style={{ color: "#00B8D9" }}>{shareMessage}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <h2 style={{ color: "#0A2540" }}>{t("productDetail.relatedProducts")}</h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#E2E8F0" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export { ProductDetailPage };
