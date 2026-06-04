import { useState, useEffect } from "react";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { getSalesmen } from "../../services/salesmanService";

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
  const [salesmen, setSalesmen] = useState([]);

  useEffect(() => {
    getSalesmen()
      .then((data) => {
        const list = data?.data || data?.salesmen || data || [];
        setSalesmen(Array.isArray(list) ? list : []);
      })
      .catch(() => {});
  }, []);

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
          className="mb-12"
        >
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "#F1F5F9" }}>

              {/* Contact Us */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <Mail className="w-4 h-4" style={{ color: "#1E5EFF" }} />
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "#0A2540" }}>{t("contact.info.contactUs")}</h3>
                </div>
                <div style={{ borderTop: "1px solid #F1F5F9" }}>
                  {[
                    { label: t("contact.info.email"), value: "info@aspksa.com", href: "mailto:info@aspksa.com" },
                    { label: "Web", value: "www.aspksa.com", href: "https://www.aspksa.com" },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-2.5" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <span className="text-xs font-medium flex-shrink-0 w-16" style={{ color: "#94A3B8" }}>{label}</span>
                      <a href={href} target={href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-medium text-right hover:underline" style={{ color: "#0A2540" }}>
                        {value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales Team WhatsApp */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F0FDF4" }}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "#0A2540" }}>{t("contact.info.salesTeam", { defaultValue: "Sales Team" })}</h3>
                </div>
                <div style={{ borderTop: "1px solid #F1F5F9" }}>
                  {salesmen.length === 0 ? (
                    <p className="text-sm py-2.5" style={{ color: "#94A3B8" }}>—</p>
                  ) : salesmen.map((s) => (
                    <div key={s._id} className="flex items-center justify-between gap-4 py-2.5" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <span className="text-xs font-medium flex-shrink-0 truncate max-w-[90px]" style={{ color: "#94A3B8" }}>{s.name}</span>
                      <a
                        href={`https://wa.me/${(s.whatsapp || s.phone || "").replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-right hover:underline"
                        style={{ color: "#25D366" }}
                      >
                        {s.whatsapp || s.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visit Us */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E6F7FB" }}>
                    <MapPin className="w-4 h-4" style={{ color: "#00B8D9" }} />
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "#0A2540" }}>{t("contact.info.visitUs")}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{t("contact.info.address")}</p>
              </div>

            </div>
          </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.044692!2d50.1665781!3d26.3898625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e361d32276b3403%3A0xc8c2119535675e44!2sAdvanced%20Specialty%20Projects%20Trading%20Est.!5e0!3m2!1sen!2ssa!4v1747814400000!5m2!1sen!2ssa"
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
