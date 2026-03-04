import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Users, Package, Headset } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { categories, products } from "../data/products";
import heroImage from "../../assets/hero.jpeg";

function HomePage() {
  const { t, i18n } = useTranslation();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 8);
  const isRTL = i18n.dir() === "rtl";

  const aboutHighlights = [
    {
      title: t("home.aboutPreview.quality.title"),
      description: t("home.aboutPreview.quality.description")
    },
    {
      title: t("home.aboutPreview.delivery.title"),
      description: t("home.aboutPreview.delivery.description")
    },
    {
      title: t("home.aboutPreview.support.title"),
      description: t("home.aboutPreview.support.description")
    }
  ];

  return <div style={{ backgroundColor: "#F8FAFC" }}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #F8FCFF 0%, #EFF6FF 100%)" }} />
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: "#93C5FD" }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-35 blur-3xl" style={{ backgroundColor: "#67E8F9" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.span
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium mb-5"
    style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}
  >
                {t("home.hero.badge")}
              </motion.span>
              <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl lg:text-[56px] leading-tight mb-6"
    style={{ color: "#0A2540" }}
  >
                {t("home.hero.title")}
              </motion.h1>
              <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-lg md:text-xl mb-8 max-w-2xl"
    style={{ color: "#475569" }}
  >
                {t("home.hero.description")}
              </motion.p>
              <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex flex-wrap gap-4"
  >
                <Link
    to="/products"
    className="px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                  <span>{t("home.hero.viewProducts")}</span>
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
                <Link
    to="/contact"
    className="px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg border"
    style={{ borderColor: "#BFDBFE", backgroundColor: "#EFF6FF", color: "#1E5EFF" }}
  >
                  <span>{t("home.hero.contactUs")}</span>
                </Link>
              </motion.div>

              <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="mt-8 flex flex-wrap gap-6"
  >
                <div>
                  <p className="text-2xl font-semibold" style={{ color: "#0A2540" }}>2000+</p>
                  <p className="text-sm" style={{ color: "#64748B" }}>{t("home.stats.medicalProducts")}</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold" style={{ color: "#0A2540" }}>500+</p>
                  <p className="text-sm" style={{ color: "#64748B" }}>{t("home.stats.healthcareClients")}</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold" style={{ color: "#0A2540" }}>24/7</p>
                  <p className="text-sm" style={{ color: "#64748B" }}>{t("home.stats.supportTeam")}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.65, delay: 0.15 }}
    className="relative"
  >
              <div className="absolute -inset-3 rounded-[28px]" style={{ background: "linear-gradient(135deg, rgba(30,94,255,0.15), rgba(0,184,217,0.1))" }} />
              <img
    src={heroImage}
    alt={t("home.hero.imageAlt")}
    className="relative w-full h-[280px] sm:h-[360px] lg:h-[430px] rounded-3xl object-cover shadow-xl"
  />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>{t("home.categories.title")}</h2>
          <p style={{ color: "#6B7280" }}>{t("home.categories.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => <motion.div
    key={category.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
              <CategoryCard {...category} name={t(category.nameKey)} />
            </motion.div>)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>{t("home.featured.title")}</h2>
          <p style={{ color: "#6B7280" }}>{t("home.featured.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => <motion.div
    key={product.id}
    className="h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
              <ProductCard product={product} />
            </motion.div>)}
        </div>

        <div className="text-center mt-12">
          <Link
    to="/products"
    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
            <span>{t("home.featured.viewAll")}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6" style={{ color: "#0A2540" }}>
                {t("home.aboutPreview.title")}
              </h2>
              <p className="mb-6" style={{ color: "#1F2937" }}>
                {t("home.aboutPreview.description")}
              </p>
              <div className="space-y-4">
                {aboutHighlights.map((item) => <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: "#00B8D9" }} />
                    <div>
                      <h4 className="mb-1" style={{ color: "#0A2540" }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: "#6B7280" }}>{item.description}</p>
                    </div>
                  </div>)}
              </div>
              <Link
    to="/about"
    className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                <span>{t("home.aboutPreview.learnMore")}</span>
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl text-center" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}>
                <Users className="w-12 h-12 mx-auto mb-4" style={{ color: "#1E5EFF" }} />
                <div className="text-3xl mb-2" style={{ color: "#0A2540" }}>500+</div>
                <p className="text-sm" style={{ color: "#6B7280" }}>{t("home.aboutPreview.cards.clients")}</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}>
                <Package className="w-12 h-12 mx-auto mb-4" style={{ color: "#00B8D9" }} />
                <div className="text-3xl mb-2" style={{ color: "#0A2540" }}>2000+</div>
                <p className="text-sm" style={{ color: "#6B7280" }}>{t("home.aboutPreview.cards.products")}</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-center col-span-2" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}>
                <Headset className="w-12 h-12 mx-auto mb-4" style={{ color: "#1E5EFF" }} />
                <div className="text-3xl mb-2" style={{ color: "#0A2540" }}>24/7</div>
                <p className="text-sm" style={{ color: "#6B7280" }}>{t("home.aboutPreview.cards.support")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center" style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)" }}>
          <h2 className="mb-4" style={{ color: "#0A2540" }}>
            {t("home.cta.title")}
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            {t("home.cta.description")}
          </p>
          <Link
    to="/contact"
    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
            <span>{t("home.cta.button")}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </section>
    </div>;
}

export {
  HomePage
};
