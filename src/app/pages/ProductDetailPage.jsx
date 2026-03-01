import { useState } from "react";
import { useParams, Link } from "react-router";
import { Plus, Minus, Share2, ShoppingCart, ArrowLeft, Mail, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [shareMessage, setShareMessage] = useState("");
  const productImages = Array.isArray(product?.images) && product.images.length > 0 ? product.images : [product?.image].filter(Boolean);
  const [activeImage, setActiveImage] = useState(productImages[0]);
  if (!product) {
    return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>Product Not Found</h2>
          <Link
      to="/products"
      className="inline-flex items-center gap-2 text-sm"
      style={{ color: "#1E5EFF" }}
    >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>;
  }
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handleAddToCart = () => {
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
  const handleShareWhatsApp = () => {
    const text = `Check out ${product.name} (${product.code}) at ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };
  const handleShareEmail = () => {
    const subject = `Product Inquiry: ${product.name}`;
    const body = `I'm interested in ${product.name} (${product.code}).

Product Link: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Link copied!");
      setTimeout(() => setShareMessage(""), 2e3);
    } catch (err) {
      setShareMessage("Failed to copy");
      setTimeout(() => setShareMessage(""), 2e3);
    }
  };
  return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {
    /* Breadcrumb */
  }
        <div className="mb-8">
          <Link
    to="/products"
    className="inline-flex items-center gap-2 text-sm transition-colors"
    style={{ color: "#6B7280" }}
    onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"}
    onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}
  >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        {
    /* Product Details */
  }
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 mb-16">
          {
    /* Product Image */
  }
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
            <div className="bg-white rounded-2xl overflow-hidden sticky top-24 p-4" style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)" }}>
              <div className="aspect-[5/4] rounded-xl overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
                <img
    src={activeImage}
    alt={product.name}
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
                      <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>)}
                </div>}
            </div>
          </motion.div>

          {
    /* Product Info */
  }
          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
            <div className="bg-white rounded-2xl p-8" style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)" }}>
              <h1 className="mb-3" style={{ color: "#0A2540" }}>{product.name}</h1>
              <p className="text-sm mb-3" style={{ color: "#9CA3AF" }}>Product Code: {product.code}</p>
              <p className="inline-block px-3 py-1 rounded-lg text-sm mb-6 capitalize" style={{ backgroundColor: "#E6F7FB", color: "#00B8D9" }}>
                {product.category.replace("-", " ")}
              </p>

              <div className="mb-8">
                <h3 className="mb-3" style={{ color: "#0A2540" }}>Description</h3>
                <p style={{ color: "#1F2937", lineHeight: "1.7" }}>{product.description}</p>
              </div>

              {
    /* Quantity Selector */
  }
              <div className="mb-6">
                <label className="block mb-3" style={{ color: "#0A2540" }}>Quantity</label>
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

              {
    /* Add to Cart Button */
  }
              <button
    onClick={handleAddToCart}
    className="w-full py-4 rounded-xl flex items-center justify-center gap-3 mb-6 transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-lg">Add to Cart</span>
              </button>

              {
    /* Share Buttons */
  }
              <div>
                <label className="block mb-3" style={{ color: "#0A2540" }}>Share Product</label>
                <div className="flex gap-3">
                  <button
    onClick={handleShareWhatsApp}
    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
    style={{ backgroundColor: "#25D366", color: "white" }}
  >
                    <Share2 className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
    onClick={handleShareEmail}
    className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
    style={{ backgroundColor: "#00B8D9", color: "white" }}
  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
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

        {
    /* Related Products */
  }
        {relatedProducts.length > 0 && <section>
            <h2 className="mb-8" style={{ color: "#0A2540" }}>Related Products</h2>
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
