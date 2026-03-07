import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Share2, Eye, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { getProductName } from "../data/products";

function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const productName = getProductName(product, i18n.language) || t(product.nameKey);
  const categoryLabel = product.categoryName || t(`categories.${product.category}`, { defaultValue: product.category });
  const badgeLabel = t(`productCard.badges.${(product.badge || "NEW").toLowerCase()}`, {
    defaultValue: product.badge || "NEW"
  });

  const badgeStyles = {
    new: { backgroundColor: "#DBEAFE", color: "#1D4ED8" },
    offer: { backgroundColor: "#FFEDD5", color: "#C2410C" },
    featured: { backgroundColor: "#F3E8FF", color: "#7C3AED" }
  };
  const badgeType = (product.badge || "NEW").toLowerCase();
  const currentBadgeStyle = badgeStyles[badgeType] || badgeStyles.new;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.hasVariants) {
      navigate(`/products/${product.id}`);
      return;
    }

    addToCart(
      {
        id: product.id,
        nameKey: product.nameKey,
        name: product.name,
        arabic: product.arabic,
        code: product.code,
        category: product.category,
        image: product.image
      },
      1
    );
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: t("productCard.shareText", { productName, code: product.code }),
          url: window.location.origin + `/products/${product.id}`
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <motion.div
        className="bg-white rounded-2xl cursor-pointer h-full flex flex-col group"
        style={{
          border: isHovered ? "1px solid #00B8D9" : "1px solid #E2E8F0",
          boxShadow: isHovered
            ? "0 14px 32px rgba(30, 94, 255, 0.14)"
            : "0 4px 14px rgba(15, 23, 42, 0.06)",
          overflow: "visible",
          position: "relative",
          zIndex: isHovered ? 10 : undefined
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {/* Product Image */}
        <div
          className="relative aspect-[4/3] p-2 overflow-hidden rounded-t-2xl"
          style={{ backgroundColor: "#F8FAFC" }}
        >
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-contain object-center"
          />
          <span
            className="absolute top-3 left-3 z-10 text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={currentBadgeStyle}
          >
            {badgeLabel}
          </span>
          <motion.button
            onClick={handleShare}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.14)" }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4" style={{ color: "#6B7280" }} />
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="relative group/tooltip">
            <h3 className="mb-1 line-clamp-2" style={{ color: "#0A2540" }}>{productName}</h3>
            <div className="absolute left-0 top-full mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {productName}
            </div>
          </div>
          <p className="text-sm mb-2" style={{ color: "#6B7280" }}>{t("productCard.code", { code: product.code })}</p>
          <p className="text-xs mb-4 capitalize" style={{ color: "#00B8D9" }}>{categoryLabel}</p>

          <div className="mt-auto">
            <div className="grid grid-cols-2 gap-2">
              <Link
                to={`/products/${product.id}`}
                className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-[0.97] md:hidden"
                style={{ backgroundColor: "#F8FAFC", color: "#1F2937", border: "1px solid #E2E8F0" }}
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                to={`/products/${product.id}`}
                className="w-full py-2 rounded-lg text-sm font-medium hidden md:flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: "#F8FAFC", color: "#1F2937", border: "1px solid #E2E8F0" }}
              >
                {t("productCard.viewDetails", { defaultValue: "View Details" })}
              </Link>
              <button
                onClick={handleAddToCart}
                className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.97] md:hidden"
                style={{ backgroundColor: "#1E5EFF", color: "white" }}
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full py-2 rounded-lg text-sm font-medium hidden md:flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: "#1E5EFF", color: "white" }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t("common.addToCart")}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export {
  ProductCard
};
