import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Plus, Minus, Share2, ShoppingCart, ArrowLeft, Mail, Copy } from "lucide-react";
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

  const sizeOptions = Array.isArray(product?.sizes) ? product.sizes : [];
  const colorOptions = Array.isArray(product?.colors) ? product.colors : [];
  const requiresSize = sizeOptions.length > 0;
  const requiresColor = colorOptions.length > 0;

  if (loading) {
    return (
      <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }} className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!product) {
    return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>{t("productDetail.notFound")}</h2>
          <Link
      to="/products"
      className="inline-flex items-center gap-2 text-sm"
      style={{ color: "#1E5EFF" }}
    >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span>{t("common.backToProducts")}</span>
          </Link>
        </div>
      </div>;
  }

  const productName = getProductName(product, i18n.language);
  const productDescription = product.description || "";
  const productCategory = product.categoryName || t(`categories.${product.category}`, { defaultValue: product.category });

  const productImages = [...new Set([product.image, ...product.images].filter(Boolean))].slice(0, 5);

  const handleAddToCart = () => {
    if (requiresSize && !selectedSize) {
      setVariantError(t("productDetail.selectSize"));
      return;
    }

    if (requiresColor && !selectedColor) {
      setVariantError(t("productDetail.selectColor"));
      return;
    }

    setVariantError("");
    addToCart(
      {
        id: product.id,
        nameKey: product.nameKey,
        name: product.name,
        arabic: product.arabic,
        code: product.code,
        category: product.category,
        image: product.image,
        size: selectedSize || undefined,
        color: selectedColor || undefined
      },
      quantity
    );
  };

  const handleShareWhatsApp = () => {
    const text = t("productDetail.shareWhatsappText", {
      productName,
      code: product.code,
      url: window.location.href
    });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    setShareMessage(t("productDetail.whatsappSent", { defaultValue: "Message sent successfully" }));
    setTimeout(() => setShareMessage(""), 2000);
  };

  const handleShareEmail = () => {
    const subject = t("productDetail.shareEmailSubject", { productName });
    const body = t("productDetail.shareEmailBody", {
      productName,
      code: product.code,
      url: window.location.href
    });
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage(t("productDetail.linkCopied"));
      setTimeout(() => setShareMessage(""), 2000);
    } catch (error) {
      setShareMessage(t("productDetail.copyFailed"));
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
    to="/products"
    className="inline-flex items-center gap-2 text-sm transition-colors"
    style={{ color: "#6B7280" }}
    onMouseEnter={(event) => event.currentTarget.style.color = "#1E5EFF"}
    onMouseLeave={(event) => event.currentTarget.style.color = "#6B7280"}
  >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span>{t("common.backToProducts")}</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 mb-24">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
            <div className="bg-white rounded-2xl overflow-hidden sticky top-24 p-4" style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)" }}>
              <div className="aspect-[5/4] rounded-xl overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
                <img
    src={activeImage}
    alt={productName}
    className="w-full h-full object-cover"
  />
              </div>
              {productImages.length > 1 && <div className="grid grid-cols-4 gap-3 mt-4">
                  {productImages.map((image, index) => <button
      key={`${image}-${index}`}
      onClick={() => setActiveImage(image)}
      className="aspect-square rounded-lg overflow-hidden border-2 transition-colors"
      style={{ borderColor: activeImage === image ? "#1E5EFF" : "#E2E8F0" }}
    >
                      <img src={image} alt={t("productDetail.imageAlt", { productName, index: index + 1 })} className="w-full h-full object-cover" />
                    </button>)}
                </div>}
            </div>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
            <div className="bg-white rounded-2xl p-8" style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)" }}>
              <h1 className="text-3xl md:text-4xl mb-3" style={{ color: "#0A2540" }}>{productName}</h1>
              <p className="text-sm mb-3" style={{ color: "#9CA3AF" }}>{t("productDetail.productCode", { code: product.code })}</p>
              <p className="inline-block px-3 py-1 rounded-lg text-sm mb-6 capitalize" style={{ backgroundColor: "#E6F7FB", color: "#00B8D9" }}>
                {productCategory}
              </p>

              <div className="mb-8">
                <h3 className="mb-3" style={{ color: "#0A2540" }}>{t("common.description")}</h3>
                <p style={{ color: "#1F2937", lineHeight: "1.7" }}>{productDescription}</p>
              </div>

              <div className="mb-6" style={{ borderTop: "1px solid #E5E7EB" }} />

              {requiresSize && <div className="mb-6">
                <h3 className="mb-3" style={{ color: "#0A2540" }}>{t("common.size")}</h3>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => <button
    key={size}
    onClick={() => {
      setSelectedSize(size);
      setVariantError("");
    }}
    className="px-4 py-2 rounded-lg text-sm transition-colors"
    style={{
      backgroundColor: selectedSize === size ? "#EAF2FF" : "#F8FAFC",
      color: selectedSize === size ? "#2F6FED" : "#1F2937",
      border: selectedSize === size ? "1px solid #2F6FED" : "1px solid #E2E8F0",
      fontWeight: selectedSize === size ? 600 : 500
    }}
  >
                    {size}
                  </button>)}
                </div>
              </div>}

              {requiresColor && <div className="mb-6">
                <h3 className="mb-3" style={{ color: "#0A2540" }}>{t("common.color")}</h3>
                <div className="flex items-center gap-3">
                  {colorOptions.map((color) => <button
    key={color.id}
    onClick={() => {
      setSelectedColor(color.id);
      setVariantError("");
    }}
    className="w-9 h-9 rounded-full p-0.5 transition-all"
    style={{
      border: selectedColor === color.id ? "2px solid #2F6FED" : "2px solid #E2E8F0",
      boxShadow: selectedColor === color.id ? "0 0 0 2px #EAF2FF" : "none"
    }}
    title={color.name}
    aria-label={color.name}
  >
                    <span
      className="block w-full h-full rounded-full"
      style={{
        backgroundColor: color.hex,
        border: color.id === "white" ? "1px solid #D1D5DB" : "none"
      }}
    />
                  </button>)}
                </div>
              </div>}

              <div className="mb-6">
                <label className="block mb-3" style={{ color: "#0A2540" }}>{t("common.quantity")}</label>
                <div className="flex items-center gap-4">
                  <button
    onClick={() => setQuantity(Math.max(1, quantity - 1))}
    className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors"
    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
  >
                    <Minus className="w-5 h-5" style={{ color: "#6B7280" }} />
                  </button>
                  <span className="text-3xl w-20 text-center" style={{ color: "#1F2937" }}>{quantity}</span>
                  <button
    onClick={() => setQuantity(quantity + 1)}
    className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors"
    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
  >
                    <Plus className="w-5 h-5" style={{ color: "#6B7280" }} />
                  </button>
                </div>
              </div>

              {variantError && <p className="text-sm mb-3" style={{ color: "#DC2626" }}>{variantError}</p>}
              <button
    onClick={handleAddToCart}
    className="w-full py-4 rounded-xl flex items-center justify-center gap-3 mb-6 transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-lg">{t("common.addToCart")}</span>
              </button>

              <div>
                <label className="block mb-3" style={{ color: "#0A2540" }}>{t("productDetail.shareProduct")}</label>
                <div className="flex gap-3">
                  <button
    onClick={handleShareWhatsApp}
    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
    style={{ backgroundColor: "#25D366", color: "white" }}
  >
                    <Share2 className="w-4 h-4" />
                    <span>{t("productDetail.whatsapp")}</span>
                  </button>
                  <button
    onClick={handleShareEmail}
    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
    style={{ backgroundColor: "#00B8D9", color: "white" }}
  >
                    <Mail className="w-4 h-4" />
                    <span>{t("productDetail.email")}</span>
                  </button>
                  <button
    onClick={handleCopyLink}
    className="py-3 px-4 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", color: "#1F2937" }}
  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {shareMessage && <p className="text-sm mt-2 text-center" style={{ color: "#00B8D9" }}>
                    {shareMessage}
                  </p>}
              </div>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && <section>
            <h2 className="mb-8" style={{ color: "#0A2540" }}>{t("productDetail.relatedProducts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => <motion.div
    key={relatedProduct.id}
    className="h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
                  <ProductCard product={relatedProduct} />
                </motion.div>)}
            </div>
          </section>}
      </div>
    </div>;
}

export {
  ProductDetailPage
};
