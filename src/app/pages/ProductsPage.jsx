import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

const getProductName = (product, language) => {
  if (language?.startsWith("ar") && product.arabic) return product.arabic;
  return product.name || "";
};

function ProductsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const isRTL = i18n.dir() === "rtl";

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

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        getProductName(p, i18n.language).toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
      );
    }
    filtered.sort((a, b) => {
      if (sortBy === "name") return getProductName(a, i18n.language).localeCompare(getProductName(b, i18n.language), i18n.language);
      if (sortBy === "code") return a.code.localeCompare(b.code);
      return 0;
    });
    return filtered;
  }, [products, i18n.language, debouncedQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (category === "all") { setSearchParams({}); return; }
    setSearchParams({ category });
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 68px)" }} className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 68px)" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E2E8F0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="mb-1" style={{ color: "#0A2540" }}>{t("products.title")}</h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>{t("products.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6" ref={searchRef}>
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isRTL ? "right-4" : "left-4"}`}
              style={{ color: "#94A3B8" }}
            />
            <input
              type="text"
              placeholder={t("products.searchPlaceholder")}
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
              onFocus2={(e) => (e.currentTarget.style.borderColor = "#1E5EFF")}
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

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar - desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div
              className="bg-white rounded-2xl p-5 sticky top-24"
              style={{
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
                maxHeight: "calc(100vh - 7rem)",
                overflowY: "auto",
              }}
            >
              <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: "1px solid #F1F5F9" }}>
                <SlidersHorizontal className="w-4 h-4" style={{ color: "#1E5EFF" }} />
                <span className="text-sm font-semibold" style={{ color: "#0A2540" }}>{t("products.sortBy")}</span>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#94A3B8" }}>
                  {t("common.categories")}
                </p>
                <div className="space-y-1" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                  {[{ id: "all", name: t("products.allProducts") }, ...categories].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className="w-full text-start px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
                      style={{
                        backgroundColor: selectedCategory === cat.id ? "#EFF6FF" : "transparent",
                        color: selectedCategory === cat.id ? "#1E5EFF" : "#475569",
                        fontWeight: selectedCategory === cat.id ? 600 : 400,
                        borderInlineStart: selectedCategory === cat.id ? "2px solid #1E5EFF" : "2px solid transparent",
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#94A3B8" }}>
                  {t("products.sortBy")}
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none"
                  style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", color: "#1F2937" }}
                >
                  <option value="name">{t("products.sortName")}</option>
                  <option value="code">{t("products.sortCode")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          <div className="lg:hidden mb-5">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 hide-scrollbar">
              {[{ id: "all", name: t("products.allProducts") }, ...categories].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-150"
                  style={{
                    background: selectedCategory === cat.id ? "linear-gradient(135deg, #1E5EFF, #2563EB)" : "white",
                    color: selectedCategory === cat.id ? "white" : "#475569",
                    border: `1px solid ${selectedCategory === cat.id ? "#1E5EFF" : "#E2E8F0"}`,
                    boxShadow: selectedCategory === cat.id ? "0 2px 8px rgba(30,94,255,0.25)" : "none",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{ backgroundColor: "white", border: "1px solid #E2E8F0", color: "#1F2937" }}
              >
                <option value="name">{t("products.sortName")}</option>
                <option value="code">{t("products.sortCode")}</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center" style={{ border: "1px solid #E2E8F0" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#F1F5F9" }}>
                  <Search className="w-6 h-6" style={{ color: "#94A3B8" }} />
                </div>
                <p className="font-medium mb-1" style={{ color: "#0A2540" }}>{t("products.noResults")}</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    {t("products.resultsCount", { count: filteredProducts.length })}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product, index) => (
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
      </div>
    </div>
  );
}

export { ProductsPage };
