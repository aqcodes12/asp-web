import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Search, Tag } from "lucide-react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setShowSuggestions(searchQuery.length > 0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
      .filter((p) =>
        getProductName(p, i18n.language).toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [debouncedQuery, products, i18n.language]);

  const offerProducts = useMemo(() => {
    if (!debouncedQuery) return products;
    const query = debouncedQuery.toLowerCase();
    return products.filter((p) =>
      getProductName(p, i18n.language).toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query)
    );
  }, [products, debouncedQuery, i18n.language]);

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 68px)" }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-wide" style={{ backgroundColor: "rgba(251,191,36,0.15)", color: "#FCD34D" }}>
              <Tag className="w-3.5 h-3.5" />
              {t("nav.offers")}
            </div>
            <h1 className="mb-2 text-white">{t("offers.title")}</h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{t("offers.subtitle")}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8" ref={searchRef}>
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isRTL ? "right-4" : "left-4"}`}
              style={{ color: "#94A3B8" }}
            />
            <input
              type="text"
              placeholder={t("offers.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchQuery) setShowSuggestions(true); }}
              className={`w-full py-3.5 text-sm rounded-xl focus:outline-none ${isRTL ? "pr-11 pl-4" : "pl-11 pr-4"}`}
              style={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                color: "#1F2937",
                boxShadow: "0 1px 4px rgba(15,23,42,0.04)",
              }}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl overflow-hidden z-30"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 12px 32px rgba(15,23,42,0.12)" }}
              >
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    className="w-full flex items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-[#F8FAFC]"
                    onClick={() => { setShowSuggestions(false); navigate(`/products/${product.id}`); }}
                  >
                    {product.image && (
                      <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-contain flex-shrink-0" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }} />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "#0A2540" }}>
                        {getProductName(product, i18n.language)}
                      </p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{product.code}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
          </div>
        ) : offerProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center" style={{ border: "1px solid #E2E8F0" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#F1F5F9" }}>
              <Tag className="w-6 h-6" style={{ color: "#94A3B8" }} />
            </div>
            <p className="font-medium" style={{ color: "#0A2540" }}>{t("offers.noResults")}</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                {t("products.resultsCount", { count: offerProducts.length })}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {offerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
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
