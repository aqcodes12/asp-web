import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "../components/ProductCard";
import { products, categories, getProductName } from "../data/products";

function ProductsPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("name");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isRTL = i18n.dir() === "rtl";

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
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
  }, [i18n.language, searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: "#0A2540" }}>{t("products.title")}</h1>
          <p style={{ color: "#6B7280" }}>{t("products.subtitle")}</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isRTL ? "right-4" : "left-4"}`} style={{ color: "#6B7280" }} />
            <input
    type="text"
    placeholder={t("products.searchPlaceholder")}
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
    className={`w-full py-4 rounded-xl focus:outline-none focus:ring-2 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
    style={{
      backgroundColor: "white",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
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

          <div className="lg:hidden mb-8">
            <button
    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl"
    style={{ backgroundColor: "white", border: "1px solid #E2E8F0", color: "#1F2937" }}
  >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{t("products.filtersAndSort")}</span>
            </button>

            {mobileFiltersOpen && <div className="mt-4 bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)" }}>
                <div className="mb-6">
                  <h3 className="mb-4" style={{ color: "#0A2540" }}>{t("common.categories")}</h3>
                  <div className="space-y-2" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                    <button
    onClick={() => {
      handleCategoryChange("all");
      setMobileFiltersOpen(false);
    }}
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
    onClick={() => {
      handleCategoryChange(category.id);
      setMobileFiltersOpen(false);
    }}
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
              </div>}
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
