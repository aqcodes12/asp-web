import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "../components/ProductCard";
import { products, getProductName } from "../data/products";

function OffersPage() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const isRTL = i18n.dir() === "rtl";

  const offerProducts = useMemo(() => {
    let filtered = products.filter((p) => p.badge === "OFFER");

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          getProductName(p, i18n.language).toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [i18n.language, searchQuery]);

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: "#0A2540" }}>{t("offers.title")}</h1>
          <p style={{ color: "#6B7280" }}>{t("offers.subtitle")}</p>
        </div>

        <div className="mb-8">
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
              className={`w-full py-4 rounded-xl focus:outline-none focus:ring-2 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              style={{ backgroundColor: "white", border: "1px solid #E2E8F0", color: "#1F2937" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#1E5EFF")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
            />
          </div>
        </div>

        {offerProducts.length === 0 ? (
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
