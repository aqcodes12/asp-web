import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Users, Package, Headset } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { getFeaturedProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import heroImage from "../../assets/hero.jpeg";

function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#EFF6FF", color: "#1E5EFF" }}>
          {label}
        </span>
      )}
      <h2 className="mb-3" style={{ color: "#0A2540" }}>{title}</h2>
      <div className="w-10 h-0.5 mx-auto mb-4 rounded-full" style={{ background: "linear-gradient(90deg, #1E5EFF, #00B8D9)" }} />
      {subtitle && <p className="max-w-xl mx-auto" style={{ color: "#6B7280" }}>{subtitle}</p>}
    </div>
  );
}

function HomePage() {
  const { t, i18n } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFeaturedProducts()
      .then(setFeaturedProducts)
      .catch(() => {})
      .finally(() => setLoading(false));

    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const homepageCategories = categories.slice(0, 6);
  const isRTL = i18n.dir() === "rtl";

  const aboutHighlights = [
    { title: t("home.aboutPreview.quality.title"), description: t("home.aboutPreview.quality.description") },
    { title: t("home.aboutPreview.delivery.title"), description: t("home.aboutPreview.delivery.description") },
    { title: t("home.aboutPreview.support.title"), description: t("home.aboutPreview.support.description") },
  ];

  return (
    <div style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #F0F7FF 0%, #E8F4FF 50%, #EFF6FF 100%)" }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ backgroundColor: "#93C5FD" }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none" style={{ backgroundColor: "#67E8F9" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide mb-5"
                style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}
              >
                {t("home.hero.badge")}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-[54px] leading-tight mb-5"
                style={{ color: "#0A2540" }}
              >
                {t("home.hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg mb-8 max-w-lg leading-relaxed"
                style={{ color: "#475569" }}
              >
                {t("home.hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                  style={{ background: "linear-gradient(135deg, #1E5EFF, #2563EB)", color: "white", boxShadow: "0 4px 14px rgba(30,94,255,0.35)" }}
                >
                  <span>{t("home.hero.viewProducts")}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
                  style={{ borderColor: "#BFDBFE", backgroundColor: "white", color: "#1E5EFF", border: "1.5px solid #BFDBFE" }}
                >
                  <span>{t("home.hero.contactUs")}</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-wrap gap-8"
              >
                {[
                  { value: "2000+", label: t("home.stats.medicalProducts") },
                  { value: "500+", label: t("home.stats.healthcareClients") },
                  { value: "24/7", label: t("home.stats.supportTeam") },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-bold" style={{ color: "#0A2540" }}>{value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[32px]" style={{ background: "linear-gradient(135deg, rgba(30,94,255,0.12), rgba(0,184,217,0.08))" }} />
              <img
                src={heroImage}
                alt={t("home.hero.imageAlt")}
                className="relative w-full h-[280px] sm:h-[360px] lg:h-[440px] rounded-3xl object-cover"
                style={{ boxShadow: "0 24px 48px rgba(10,37,64,0.18)" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle
          label={t("common.categories")}
          title={t("home.categories.title")}
          subtitle={t("home.categories.subtitle")}
        />
        <div className="flex flex-wrap justify-center gap-4">
          {homepageCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <CategoryCard {...category} name={category.name} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label={t("home.featured.title")}
            title={t("home.featured.title")}
            subtitle={t("home.featured.subtitle")}
          />

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, #1E5EFF, #2563EB)", color: "white", boxShadow: "0 4px 14px rgba(30,94,255,0.3)" }}
            >
              <span>{t("home.featured.viewAll")}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "#E6F7FB", color: "#00B8D9" }}>
                {t("nav.about")}
              </span>
              <h2 className="mb-5" style={{ color: "#0A2540" }}>
                {t("home.aboutPreview.title")}
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: "#475569" }}>
                {t("home.aboutPreview.description")}
              </p>
              <div className="space-y-4 mb-8">
                {aboutHighlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E6F7FB" }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: "#00B8D9" }} />
                    </div>
                    <div>
                      <h4 className="mb-0.5 text-sm font-semibold" style={{ color: "#0A2540" }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: "#6B7280" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                style={{ background: "linear-gradient(135deg, #1E5EFF, #2563EB)", color: "white", boxShadow: "0 4px 14px rgba(30,94,255,0.3)" }}
              >
                <span>{t("home.aboutPreview.learnMore")}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, color: "#1E5EFF", bg: "#EFF6FF", value: "500+", label: t("home.aboutPreview.cards.clients") },
                { icon: Package, color: "#00B8D9", bg: "#E6F7FB", value: "2000+", label: t("home.aboutPreview.cards.products") },
              ].map(({ icon: Icon, color, bg, value, label }) => (
                <motion.div
                  key={label}
                  className="bg-white p-6 rounded-2xl text-center"
                  style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(30,94,255,0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: bg }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: "#0A2540" }}>{value}</div>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{label}</p>
                </motion.div>
              ))}
              <motion.div
                className="bg-white p-6 rounded-2xl text-center col-span-2"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(30,94,255,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#EFF6FF" }}>
                  <Headset className="w-6 h-6" style={{ color: "#1E5EFF" }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: "#0A2540" }}>24/7</div>
                <p className="text-xs" style={{ color: "#6B7280" }}>{t("home.aboutPreview.cards.support")}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)" }}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: "#1E5EFF" }} />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: "#00B8D9" }} />
          <div className="relative">
            <h2 className="mb-4 text-white">{t("home.cta.title")}</h2>
            <p className="mb-8 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
              {t("home.cta.description")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
              style={{ backgroundColor: "#1E5EFF", color: "white", boxShadow: "0 4px 20px rgba(30,94,255,0.4)" }}
            >
              <span>{t("home.cta.button")}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export { HomePage };
