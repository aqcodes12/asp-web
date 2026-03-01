import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Share2, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(
      {
        id: product.id,
        name: product.name,
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
          title: product.name,
          text: `Check out ${product.name} - ${product.code}`,
          url: window.location.origin + `/products/${product.id}`
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };
  return <Link to={`/products/${product.id}`}>
      <motion.div
    className="bg-white rounded-xl overflow-hidden cursor-pointer h-full flex flex-col"
    style={{
      border: isHovered ? "1px solid #00B8D9" : "1px solid #E2E8F0",
      boxShadow: isHovered ? "0 8px 20px rgba(30, 94, 255, 0.1)" : "0 2px 8px rgba(0, 0, 0, 0.05)"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
        {
    /* Product Image */
  }
        <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
          <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover"
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
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="mb-1" style={{ color: "#0A2540" }}>{product.name}</h3>
          <p className="text-sm mb-2" style={{ color: "#6B7280" }}>Code: {product.code}</p>
          <p className="text-xs mb-4 capitalize" style={{ color: "#00B8D9" }}>{product.category.replace("-", " ")}</p>

          <div className="mt-auto">
            {
    /* Quantity Selector */
  }
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm" style={{ color: "#6B7280" }}>Qty:</span>
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
    className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>;
}
export {
  ProductCard
};
