import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "../components/ProductCard";
import { getOfferProducts } from "../../services/productService";

const getProductName = (product, language) => {
  if (language?.startsWith("ar") && product.arabic) return product.arabic;
  return product.name || "";
};

function OffersPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    setLoading(true);
    getOfferProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setShowSuggestions(searchQuery.length > 0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!debouncedQuery) return [];
    const query = debouncedQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          getProductName(p, i18n.language).toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [debouncedQuery, products, i18n.language]);

  const offerProducts = useMemo(() => {
    if (!debouncedQuery) return products;

    const query = debouncedQuery.toLowerCase();
    return products.filter(
      (p) =>
        getProductName(p, i18n.language).toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
    );
  }, [products, debouncedQuery, i18n.language]);

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: "#0A2540" }}>{t("offers.title")}</h1>
          <p style={{ color: "#6B7280" }}>{t("offers.subtitle")}</p>
        </div>

        <div className="mb-8" ref={searchRef}>
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isRTL ? "right-4" : "left-4"}`}
              style={{ color: "#6B7280" }}
            />
            <input
              type="text"
              placeholder={t("offers.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchQuery) setShowSuggestions(true); }}
              className={`w-full py-4 rounded-xl focus:outline-none focus:ring-2 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              style={{ backgroundColor: "white", border: "1px solid #E2E8F0", color: "#1F2937" }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl overflow-hidden z-30"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)" }}
              >
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    className="w-full flex items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-[#F8FAFC]"
                    onClick={() => {
                      setShowSuggestions(false);
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        style={{ backgroundColor: "#F1F5F9" }}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm truncate" style={{ color: "#0A2540" }}>
                        {getProductName(product, i18n.language)}
                      </p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>{product.code}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ backgroundColor: "#F8FAFC", minHeight: "200px" }} className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
          </div>
        ) : offerProducts.length === 0 ? (
          <div
            className="bg-white rounded-2xl p-12 text-center"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)" }}
          >
            <p style={{ color: "#6B7280" }}>{t("offers.noResults")}</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p style={{ color: "#6B7280" }}>
                {t("products.resultsCount", { count: offerProducts.length })}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {offerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { OffersPage };
