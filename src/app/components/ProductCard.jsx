import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Share2, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { getProductName } from "../data/products";

function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const productName = getProductName(product, i18n.language) || t(product.nameKey);
  const categoryLabel = product.categoryName || t(`categories.${product.category}`, { defaultValue: product.category });

  const handleAddToCart = (e) => {
    e.preventDefault();
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
      quantity
    );
  };
  const handleShare = async (e) => {
    e.preventDefault();
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
  return <Link to={`/products/${product.id}`} className="block h-full">
      <motion.div
    className="bg-white rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col group"
    style={{
      border: isHovered ? "1px solid #00B8D9" : "1px solid #E2E8F0",
      boxShadow: isHovered ? "0 14px 32px rgba(30, 94, 255, 0.14)" : "0 4px 14px rgba(15, 23, 42, 0.06)"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
  >
        {
    /* Product Image */
  }
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
          <img
    src={product.image}
    alt={productName}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
          <button
    onClick={handleShare}
    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
  >
            <Share2 className="w-4 h-4" style={{ color: "#6B7280" }} />
          </button>
        </div>

        {
    /* Product Info */
  }
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="mb-1" style={{ color: "#0A2540" }}>{productName}</h3>
          <p className="text-sm mb-2" style={{ color: "#6B7280" }}>{t("productCard.code", { code: product.code })}</p>
          <p className="text-xs mb-4 capitalize" style={{ color: "#00B8D9" }}>{categoryLabel}</p>

          <div className="mt-auto">
            {
    /* Quantity Selector */
  }
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm" style={{ color: "#6B7280" }}>{t("common.qty")}</span>
              <div className="flex items-center gap-2">
                <button
    onClick={(e) => {
      e.preventDefault();
      setQuantity(Math.max(1, quantity - 1));
    }}
    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
  >
                  <Minus className="w-4 h-4" style={{ color: "#6B7280" }} />
                </button>
                <span className="w-8 text-center" style={{ color: "#1F2937" }}>{quantity}</span>
                <button
    onClick={(e) => {
      e.preventDefault();
      setQuantity(quantity + 1);
    }}
    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
  >
                  <Plus className="w-4 h-4" style={{ color: "#6B7280" }} />
                </button>
              </div>
            </div>

            {
    /* Add to Cart Button */
  }
            <button
    onClick={handleAddToCart}
    className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
              <ShoppingCart className="w-4 h-4" />
              <span>{t("common.addToCart")}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>;
}
export {
  ProductCard
};
