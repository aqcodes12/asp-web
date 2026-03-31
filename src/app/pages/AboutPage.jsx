import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="mb-3" style={{ color: "#0A2540" }}>{title}</h2>
      <div className="w-10 h-0.5 mx-auto mb-4 rounded-full" style={{ background: "linear-gradient(90deg, #1E5EFF, #00B8D9)" }} />
      {subtitle && <p style={{ color: "#6B7280" }}>{subtitle}</p>}
    </div>
  );
}

function AboutPage() {
  const { t } = useTranslation();

  const whyChooseItems = [1, 2, 3, 4, 5, 6].map((index) => ({
    title: t(`about.whyChoose.items.${index}.title`),
    description: t(`about.whyChoose.items.${index}.description`),
  }));

  const stats = [
    { value: "15+", label: t("about.stats.yearsInBusiness"), color: "#1E5EFF" },
    { value: "500+", label: t("about.stats.healthcareClients"), color: "#00B8D9" },
    { value: "2000+", label: t("about.stats.productsAvailable"), color: "#1E5EFF" },
    { value: "99%", label: t("about.stats.clientSatisfaction"), color: "#00B8D9" },
  ];

  return (
    <div style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "rgba(30,94,255,0.2)", color: "#93C5FD" }}>
              {t("nav.about")}
            </span>
            <h1 className="mb-5 text-white">{t("about.hero.title")}</h1>
            <p className="text-lg" style={{ color: "#94A3B8" }}>
              {t("about.hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "#EFF6FF", color: "#1E5EFF" }}>
              {t("about.mission.title")}
            </span>
            <h2 className="mb-5" style={{ color: "#0A2540" }}>{t("about.mission.title")}</h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#475569" }}>
              {t("about.mission.paragraph1")}
            </p>
            <p className="leading-relaxed" style={{ color: "#475569" }}>
              {t("about.mission.paragraph2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Award, color: "#1E5EFF", bg: "#EFF6FF", key: "certified" },
              { icon: Users, color: "#00B8D9", bg: "#E6F7FB", key: "expertTeam" },
            ].map(({ icon: Icon, color, bg, key }) => (
              <motion.div
                key={key}
                className="bg-white p-6 rounded-2xl"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(30,94,255,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="mb-2 text-sm font-semibold" style={{ color: "#0A2540" }}>{t(`about.mission.cards.${key}.title`)}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{t(`about.mission.cards.${key}.description`)}</p>
              </motion.div>
            ))}
            <motion.div
              className="bg-white p-6 rounded-2xl col-span-2"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
              whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(30,94,255,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#EFF6FF" }}>
                <TrendingUp className="w-6 h-6" style={{ color: "#1E5EFF" }} />
              </div>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: "#0A2540" }}>{t("about.mission.cards.growingNetwork.title")}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{t("about.mission.cards.growingNetwork.description")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("about.values.title")} subtitle={t("about.values.subtitle")} />
          <div className="grid md:grid-cols-3 gap-6">
            {["qualityFirst", "customerFocus", "reliability"].map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="text-center p-8 rounded-2xl"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                  style={{ background: index % 2 === 0 ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)" : "linear-gradient(135deg, #E6F7FB, #CFFAFE)" }}
                >
                  <CheckCircle2 className="w-8 h-8" style={{ color: index % 2 === 0 ? "#1E5EFF" : "#00B8D9" }} />
                </div>
                <h3 className="mb-3" style={{ color: "#0A2540" }}>{t(`about.values.items.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {t(`about.values.items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, color }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color }}>{value}</div>
                <div className="w-6 h-0.5 mx-auto mb-2 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
                <p className="text-sm" style={{ color: "#94A3B8" }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle title={t("about.whyChoose.title")} />
        <div className="grid md:grid-cols-2 gap-4">
          {whyChooseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="bg-white p-6 rounded-2xl flex gap-4"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.04)" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E6F7FB" }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: "#00B8D9" }} />
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "#0A2540" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { AboutPage };
