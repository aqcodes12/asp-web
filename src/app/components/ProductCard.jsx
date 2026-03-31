import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Share2, Eye, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { getProductName } from "../data/products";

const badgeStyles = {
  new:      { backgroundColor: "#DBEAFE", color: "#1D4ED8" },
  offer:    { backgroundColor: "#FEF3C7", color: "#B45309" },
  featured: { backgroundColor: "#EDE9FE", color: "#6D28D9" },
};

function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const checkTitleTruncation = () => {
    if (titleRef.current) {
      setIsTitleTruncated(titleRef.current.scrollHeight > titleRef.current.clientHeight);
    }
  };

  const productName = getProductName(product, i18n.language) || t(product.nameKey);
  const categoryLabel = product.categoryName || t(`categories.${product.category}`, { defaultValue: product.category });
  const badgeKey = (product.badge || "NEW").toLowerCase();
  const badgeLabel = t(`productCard.badges.${badgeKey}`, { defaultValue: product.badge || "NEW" });
  const currentBadgeStyle = badgeStyles[badgeKey] || badgeStyles.new;

  const handleAddToCart = () => {
    if (product.hasVariants) {
      navigate(`/products/${product.id}`);
      return;
    }
    addToCart(
      {
        id: product.id,
        name: product.name,
        arabic: product.arabic,
        code: product.code,
        category: product.category,
        image: product.image,
      },
      1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: t("productCard.shareText", { productName, code: product.code }),
          url: window.location.origin + `/products/${product.id}`,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <div className="block h-full">
      <motion.div
        className="bg-white rounded-2xl h-full flex flex-col overflow-hidden"
        style={{
          border: isHovered ? "1px solid #1E5EFF" : "1px solid #E2E8F0",
          boxShadow: isHovered
            ? "0 16px 36px rgba(30, 94, 255, 0.14)"
            : "0 2px 12px rgba(15, 23, 42, 0.06)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          position: "relative",
          zIndex: isHovered ? 10 : undefined,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Image */}
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          style={{ backgroundColor: "#F8FAFC" }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-contain p-3 transition-transform duration-300"
            style={{ transform: isHovered ? "scale(1.04)" : "scale(1)" }}
          />

          {/* Badge */}
          <span
            className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide"
            style={currentBadgeStyle}
          >
            {badgeLabel}
          </span>

          {/* Share */}
          <motion.button
            onClick={handleShare}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Share product"
          >
            <Share2 className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="relative group/title mb-1" onMouseEnter={checkTitleTruncation}>
            <h3
              ref={titleRef}
              className="text-sm font-semibold line-clamp-2 leading-snug"
              style={{ color: "#0A2540" }}
            >
              {productName}
            </h3>
            {isTitleTruncated && (
              <div className="absolute left-0 top-full mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/title:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {productName}
              </div>
            )}
          </div>

          <p className="text-xs mb-1" style={{ color: "#94A3B8" }}>
            {t("productCard.code", { code: product.code })}
          </p>
          <p className="text-xs font-medium mb-4 capitalize" style={{ color: "#00B8D9" }}>
            {categoryLabel}
          </p>

          <div className="mt-auto grid grid-cols-2 gap-2">
            {/* View Details - mobile icon only, desktop text */}
            <Link
              to={`/products/${product.id}`}
              className="py-2.5 rounded-xl text-xs font-medium flex items-center justify-center transition-all duration-200 hover:bg-[#F1F5F9] md:hidden"
              style={{ backgroundColor: "#F8FAFC", color: "#475569", border: "1px solid #E2E8F0" }}
            >
              <Eye className="w-4 h-4" />
            </Link>
            <Link
              to={`/products/${product.id}`}
              className="py-2.5 rounded-xl text-xs font-medium hidden md:flex items-center justify-center transition-all duration-200 hover:bg-[#F1F5F9]"
              style={{ backgroundColor: "#F8FAFC", color: "#475569", border: "1px solid #E2E8F0" }}
            >
              {t("productCard.viewDetails", { defaultValue: "View Details" })}
            </Link>

            {/* Add to Cart - mobile icon only, desktop text */}
            <button
              onClick={handleAddToCart}
              className="py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 hover:opacity-90 active:scale-[0.97] md:hidden"
              style={{ background: "linear-gradient(135deg, #1E5EFF, #2563EB)", color: "white" }}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="py-2.5 rounded-xl text-xs font-medium hidden md:flex items-center justify-center gap-1.5 transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, #1E5EFF, #2563EB)", color: "white" }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{t("common.addToCart")}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export { ProductCard };
