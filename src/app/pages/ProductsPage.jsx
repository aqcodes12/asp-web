import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";
function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("name");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(query) || p.code.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "code") {
        return a.code.localeCompare(b.code);
      }
      return 0;
    });
    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  return <div style={{ backgroundColor: "#F8FAFC", minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {
    /* Page Header */
  }
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: "#0A2540" }}>Our Products</h1>
          <p style={{ color: "#6B7280" }}>Browse our comprehensive range of medical supplies</p>
        </div>

        {
    /* Search Bar */
  }
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#6B7280" }} />
            <input
    type="text"
    placeholder="Search by product name, code, or category..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "white",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {
    /* Sidebar - Desktop */
  }
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 sticky top-24" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)" }}>
              {
    /* Categories */
  }
              <div className="mb-6">
                <h3 className="mb-4" style={{ color: "#0A2540" }}>Categories</h3>
                <div className="space-y-2">
                  <button
    onClick={() => handleCategoryChange("all")}
    className="w-full text-left px-4 py-2.5 rounded-lg transition-colors"
    style={{
      backgroundColor: selectedCategory === "all" ? "#E6F7FB" : "transparent",
      color: selectedCategory === "all" ? "#1E5EFF" : "#1F2937"
    }}
  >
                    All Products
                  </button>
                  {categories.map((category) => <button
    key={category.id}
    onClick={() => handleCategoryChange(category.id)}
    className="w-full text-left px-4 py-2.5 rounded-lg transition-colors"
    style={{
      backgroundColor: selectedCategory === category.id ? "#E6F7FB" : "transparent",
      color: selectedCategory === category.id ? "#1E5EFF" : "#1F2937"
    }}
  >
                      {category.name}
                    </button>)}
                </div>
              </div>

              {
    /* Sort */
  }
              <div>
                <h3 className="mb-4" style={{ color: "#0A2540" }}>Sort By</h3>
                <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
  >
                  <option value="name">Name (A-Z)</option>
                  <option value="code">Product Code</option>
                </select>
              </div>
            </div>
          </div>

          {
    /* Mobile Filters Button */
  }
          <div className="lg:hidden mb-8">
            <button
    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl"
    style={{ backgroundColor: "white", border: "1px solid #E2E8F0", color: "#1F2937" }}
  >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters & Sort</span>
            </button>

            {mobileFiltersOpen && <div className="mt-4 bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)" }}>
                {
    /* Categories */
  }
                <div className="mb-6">
                  <h3 className="mb-4" style={{ color: "#0A2540" }}>Categories</h3>
                  <div className="space-y-2">
                    <button
    onClick={() => {
      handleCategoryChange("all");
      setMobileFiltersOpen(false);
    }}
    className="w-full text-left px-4 py-2.5 rounded-lg transition-colors"
    style={{
      backgroundColor: selectedCategory === "all" ? "#E6F7FB" : "transparent",
      color: selectedCategory === "all" ? "#1E5EFF" : "#1F2937"
    }}
  >
                      All Products
                    </button>
                    {categories.map((category) => <button
    key={category.id}
    onClick={() => {
      handleCategoryChange(category.id);
      setMobileFiltersOpen(false);
    }}
    className="w-full text-left px-4 py-2.5 rounded-lg transition-colors"
    style={{
      backgroundColor: selectedCategory === category.id ? "#E6F7FB" : "transparent",
      color: selectedCategory === category.id ? "#1E5EFF" : "#1F2937"
    }}
  >
                        {category.name}
                      </button>)}
                  </div>
                </div>

                {
    /* Sort */
  }
                <div>
                  <h3 className="mb-4" style={{ color: "#0A2540" }}>Sort By</h3>
                  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
  >
                    <option value="name">Name (A-Z)</option>
                    <option value="code">Product Code</option>
                  </select>
                </div>
              </div>}
          </div>

          {
    /* Products Grid */
  }
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? <div className="bg-white rounded-2xl p-12 text-center" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)" }}>
                <p style={{ color: "#6B7280" }}>No products found matching your criteria.</p>
              </div> : <>
                <div className="mb-6">
                  <p style={{ color: "#6B7280" }}>
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
