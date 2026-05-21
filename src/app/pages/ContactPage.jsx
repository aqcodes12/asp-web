import { useState } from "react";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const inputBase = {
  backgroundColor: "#F8FAFC",
  border: "1px solid #E2E8F0",
  color: "#1F2937",
};

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", subject: "", message: "",
  });

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleFocus = (e) => (e.currentTarget.style.borderColor = "#1E5EFF");
  const handleBlur  = (e) => (e.currentTarget.style.borderColor = "#E2E8F0");

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = [
      `*${t("contact.form.subject")}:* ${formData.subject}`,
      `*${t("contact.form.fullName")}:* ${formData.name}`,
      `*${t("contact.form.emailAddress")}:* ${formData.email}`,
      `*${t("contact.form.phoneNumber")}:* ${formData.phone}`,
      `*${t("contact.form.company")}:* ${formData.company}`,
      "",
      `*${t("contact.form.message")}:*`,
      formData.message,
    ].join("\n");

    window.open(`https://wa.me/966138141130?text=${encodeURIComponent(text)}`, "_blank");

    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors";

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
              {t("nav.contact")}
            </span>
            <h1 className="mb-5 text-white">{t("contact.hero.title")}</h1>
            <p className="text-lg" style={{ color: "#94A3B8" }}>
              {t("contact.hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-5 mb-12"
        >
          {[
            {
              icon: Phone, color: "#1E5EFF", bg: "#EFF6FF",
              title: t("contact.info.contactUs"),
              lines: [
                `${t("contact.info.telephone")}: +966-13-8100344 / 8144770 / 8141130`,
                `${t("contact.info.telefax")}: +966-13-8144588`,
                `${t("contact.info.email")}: info@aspksa.com`,
                `Web: www.aspksa.com`,
              ],
            },
            {
              icon: MapPin, color: "#00B8D9", bg: "#E6F7FB",
              title: t("contact.info.visitUs"),
              lines: [t("contact.info.address")],
            },
          ].map(({ icon: Icon, color, bg, title, lines }) => (
            <div key={title} className="bg-white p-6 rounded-2xl flex gap-4" style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold" style={{ color: "#0A2540" }}>{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-sm" style={{ color: "#475569" }}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-2xl" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,0.06)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1E5EFF, #00B8D9)" }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 style={{ color: "#0A2540" }}>{t("contact.form.title")}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField label={t("contact.form.fullName")}>
                    <input type="text" required value={formData.name} onChange={set("name")}
                      className={inputCls} style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
                  </FormField>
                  <FormField label={t("contact.form.emailAddress")}>
                    <input type="email" required value={formData.email} onChange={set("email")}
                      className={inputCls} style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
                  </FormField>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField label={t("contact.form.phoneNumber")}>
                    <input type="tel" required value={formData.phone} onChange={set("phone")}
                      className={inputCls} style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
                  </FormField>
                  <FormField label={t("contact.form.company")}>
                    <input type="text" required value={formData.company} onChange={set("company")}
                      className={inputCls} style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
                  </FormField>
                </div>

                <FormField label={t("contact.form.subject")}>
                  <input type="text" required value={formData.subject} onChange={set("subject")}
                    className={inputCls} style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
                </FormField>

                <FormField label={t("contact.form.message")}>
                  <textarea required value={formData.message} onChange={set("message")} rows={5}
                    className={`${inputCls} resize-none`} style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
                </FormField>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                  style={{ background: "linear-gradient(135deg, #1E5EFF, #2563EB)", color: "white", boxShadow: "0 4px 14px rgba(30,94,255,0.3)" }}
                >
                  <Send className="w-4 h-4" />
                  <span>{t("contact.form.send")}</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-4 rounded-2xl" style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(15,23,42,0.06)" }}>
              <h3 className="mb-4 text-sm font-semibold px-2" style={{ color: "#0A2540" }}>{t("contact.map.title")}</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.040854970368!2d50.1665878!3d26.389867699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e56c380d3d53%3A0x87225b79c2ee99a7!2sAdvanced%20Specialty%20Projects%20Trading%20Est.!5e0!3m2!1sen!2sin!4v1772381347110!5m2!1sen!2sin"
                style={{ border: 0, width: "100%", minHeight: "420px", borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("contact.map.iframeTitle")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section style={{ background: "linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center">
            <h3 className="mb-2 text-white">{t("contact.emergency.title")}</h3>
            <p className="mb-7 text-sm" style={{ color: "#94A3B8" }}>
              {t("contact.emergency.description")}
            </p>
            <a
              href="tel:+966138141130"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
              style={{ backgroundColor: "#1E5EFF", color: "white", boxShadow: "0 4px 20px rgba(30,94,255,0.4)" }}
            >
              <Phone className="w-5 h-5" />
              <span>+966-13-814 1130</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ContactPage };
