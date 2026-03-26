import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Search } from "lucide-react";
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

    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter((product) => getProductName(product, i18n.language).toLowerCase().includes(query) || product.code.toLowerCase().includes(query) || product.categoryName.toLowerCase().includes(query));
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return getProductName(a, i18n.language).localeCompare(getProductName(b, i18n.language), i18n.language);
      }

      if (sortBy === "code") {
        return a.code.localeCompare(b.code);
      }

      return 0;
    });

    return filtered;
  }, [products, i18n.language, debouncedQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }} className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: "#0A2540" }}>{t("products.title")}</h1>
          <p style={{ color: "#6B7280" }}>{t("products.subtitle")}</p>
        </div>

        <div className="mb-8" ref={searchRef}>
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isRTL ? "right-4" : "left-4"}`} style={{ color: "#6B7280" }} />
            <input
              type="text"
              placeholder={t("products.searchPlaceholder")}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => { if (searchQuery) setShowSuggestions(true); }}
              className={`w-full py-4 rounded-xl focus:outline-none focus:ring-2 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              style={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                color: "#1F2937"
              }}
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

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <div
    className="bg-white rounded-2xl p-6 sticky top-24"
    style={{
      border: "1px solid #E2E8F0",
      boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
      maxHeight: "calc(100vh - 7.5rem)",
      overflowY: "auto"
    }}
  >
              <div className="mb-6">
                <h3 className="mb-4" style={{ color: "#0A2540" }}>{t("common.categories")}</h3>
                <div className="space-y-2" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                  <button
    onClick={() => handleCategoryChange("all")}
    className="w-full text-start px-4 py-2.5 rounded-lg transition-colors"
    style={{
      backgroundColor: selectedCategory === "all" ? "#EAF2FF" : "transparent",
      color: selectedCategory === "all" ? "#2F6FED" : "#1F2937",
      fontWeight: selectedCategory === "all" ? 600 : 400,
      borderInlineStart: selectedCategory === "all" ? "3px solid #2F6FED" : "3px solid transparent"
    }}
  >
                    {t("products.allProducts")}
                  </button>
                  {categories.map((category) => <button
    key={category.id}
    onClick={() => handleCategoryChange(category.id)}
    className="w-full text-start px-4 py-2.5 rounded-lg transition-colors"
    style={{
      backgroundColor: selectedCategory === category.id ? "#EAF2FF" : "transparent",
      color: selectedCategory === category.id ? "#2F6FED" : "#1F2937",
      fontWeight: selectedCategory === category.id ? 600 : 400,
      borderInlineStart: selectedCategory === category.id ? "3px solid #2F6FED" : "3px solid transparent"
    }}
  >
                      {category.name}
                    </button>)}
                </div>
              </div>

              <div>
                <h3 className="mb-4" style={{ color: "#0A2540" }}>{t("products.sortBy")}</h3>
                <select
    value={sortBy}
    onChange={(event) => setSortBy(event.target.value)}
    className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
  >
                  <option value="name">{t("products.sortName")}</option>
                  <option value="code">{t("products.sortCode")}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 hide-scrollbar">
              <button
                onClick={() => handleCategoryChange("all")}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: selectedCategory === "all" ? "#1E5EFF" : "white",
                  color: selectedCategory === "all" ? "white" : "#1F2937",
                  border: "1px solid #E2E8F0"
                }}
              >
                {t("products.allProducts")}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: selectedCategory === category.id ? "#1E5EFF" : "white",
                    color: selectedCategory === category.id ? "white" : "#1F2937",
                    border: "1px solid #E2E8F0"
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  color: "#1F2937"
                }}
              >
                <option value="name">{t("products.sortName")}</option>
                <option value="code">{t("products.sortCode")}</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? <div className="bg-white rounded-2xl p-12 text-center" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)" }}>
                <p style={{ color: "#6B7280" }}>{t("products.noResults")}</p>
              </div> : <>
                <div className="mb-6">
                  <p style={{ color: "#6B7280" }}>
                    {t("products.resultsCount", { count: filteredProducts.length })}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => <motion.div
    key={product.id}
    className="h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.03 }}
  >
                      <ProductCard product={product} />
                    </motion.div>)}
                </div>
              </>}
          </div>
        </div>
      </div>
    </div>;
}

export {
  ProductsPage
};
