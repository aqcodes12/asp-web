import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

function AboutPage() {
  const { t } = useTranslation();

  const whyChooseItems = [1, 2, 3, 4, 5, 6].map((index) => ({
    title: t(`about.whyChoose.items.${index}.title`),
    description: t(`about.whyChoose.items.${index}.description`)
  }));

  return <div style={{ backgroundColor: "#F8FAFC" }}>
      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mx-auto text-center"
  >
            <h1 className="mb-6" style={{ color: "#0A2540" }}>{t("about.hero.title")}</h1>
            <p className="text-lg" style={{ color: "#1F2937" }}>
              {t("about.hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
            <h2 className="mb-6" style={{ color: "#0A2540" }}>{t("about.mission.title")}</h2>
            <p className="mb-4" style={{ color: "#1F2937" }}>
              {t("about.mission.paragraph1")}
            </p>
            <p style={{ color: "#1F2937" }}>
              {t("about.mission.paragraph2")}
            </p>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-2 gap-4"
  >
            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <Award className="w-12 h-12 mb-4" style={{ color: "#1E5EFF" }} />
              <h3 className="mb-2" style={{ color: "#0A2540" }}>{t("about.mission.cards.certified.title")}</h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>{t("about.mission.cards.certified.description")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <Users className="w-12 h-12 mb-4" style={{ color: "#00B8D9" }} />
              <h3 className="mb-2" style={{ color: "#0A2540" }}>{t("about.mission.cards.expertTeam.title")}</h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>{t("about.mission.cards.expertTeam.description")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl col-span-2" style={{ border: "1px solid #E2E8F0" }}>
              <TrendingUp className="w-12 h-12 mb-4" style={{ color: "#1E5EFF" }} />
              <h3 className="mb-2" style={{ color: "#0A2540" }}>{t("about.mission.cards.growingNetwork.title")}</h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>{t("about.mission.cards.growingNetwork.description")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{ color: "#0A2540" }}>{t("about.values.title")}</h2>
            <p style={{ color: "#6B7280" }}>{t("about.values.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {["qualityFirst", "customerFocus", "reliability"].map((key, index) => <motion.div
    key={key}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
  >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E6F7FB" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: index % 2 === 0 ? "#1E5EFF" : "#00B8D9" }} />
                  </div>
                  <h3 className="mb-3" style={{ color: "#0A2540" }}>{t(`about.values.items.${key}.title`)}</h3>
                  <p style={{ color: "#6B7280" }}>
                    {t(`about.values.items.${key}.description`)}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#1E5EFF" }}>15+</div>
              <p style={{ color: "#6B7280" }}>{t("about.stats.yearsInBusiness")}</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#00B8D9" }}>500+</div>
              <p style={{ color: "#6B7280" }}>{t("about.stats.healthcareClients")}</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#1E5EFF" }}>2000+</div>
              <p style={{ color: "#6B7280" }}>{t("about.stats.productsAvailable")}</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#00B8D9" }}>99%</div>
              <p style={{ color: "#6B7280" }}>{t("about.stats.clientSatisfaction")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>{t("about.whyChoose.title")}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {whyChooseItems.map((item, index) => <motion.div
    key={item.title}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-white p-6 rounded-xl flex gap-4"
    style={{ border: "1px solid #E2E8F0" }}
  >
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "#00B8D9" }} />
              <div>
                <h3 className="mb-2" style={{ color: "#0A2540" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>{item.description}</p>
              </div>
            </motion.div>)}
        </div>
      </section>
    </div>;
}

export {
  AboutPage
};
