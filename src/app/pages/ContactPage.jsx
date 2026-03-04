import { useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Contact form submitted:", formData);
    alert(t("contact.form.success"));
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  return <div style={{ backgroundColor: "#F8FAFC" }}>
      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mx-auto text-center"
  >
            <h1 className="mb-6" style={{ color: "#0A2540" }}>{t("contact.hero.title")}</h1>
            <p className="text-lg" style={{ color: "#1F2937" }}>
              {t("contact.hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="grid md:grid-cols-2 gap-6 mb-8"
  >
          <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
              <Phone className="w-6 h-6" style={{ color: "#1E5EFF" }} />
            </div>
            <h3 className="mb-3" style={{ color: "#0A2540" }}>{t("contact.info.contactUs")}</h3>
            <div className="space-y-2" style={{ color: "#1F2937" }}>
              <p>{t("contact.info.telephone")}: +966-13-814 1130</p>
              <p>{t("contact.info.telefax")}: +966-13-814 4588</p>
              <p>{t("contact.info.email")}: info@aspksa.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
              <MapPin className="w-6 h-6" style={{ color: "#00B8D9" }} />
            </div>
            <h3 className="mb-3" style={{ color: "#0A2540" }}>{t("contact.info.visitUs")}</h3>
            <p style={{ color: "#1F2937" }}>
              {t("contact.info.address")}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
            <div className="bg-white p-8 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <h2 className="mb-6" style={{ color: "#0A2540" }}>{t("contact.form.title")}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      {t("contact.form.fullName")}
                    </label>
                    <input
    type="text"
    required
    value={formData.name}
    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      {t("contact.form.emailAddress")}
                    </label>
                    <input
    type="email"
    required
    value={formData.email}
    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      {t("contact.form.phoneNumber")}
                    </label>
                    <input
    type="tel"
    required
    value={formData.phone}
    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      {t("contact.form.company")}
                    </label>
                    <input
    type="text"
    required
    value={formData.company}
    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>
                </div>

                <div>
                  <label className="block mb-2" style={{ color: "#1F2937" }}>
                    {t("contact.form.subject")}
                  </label>
                  <input
    type="text"
    required
    value={formData.subject}
    onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: "#1F2937" }}>
                    {t("contact.form.message")}
                  </label>
                  <textarea
    required
    value={formData.message}
    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
    rows={6}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 resize-none"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <button
    type="submit"
    className="w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                  <Send className="w-5 h-5" />
                  <span>{t("contact.form.send")}</span>
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
            <div className="bg-white p-4 sm:p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <h3 className="mb-4" style={{ color: "#0A2540" }}>{t("contact.map.title")}</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.040854970368!2d50.1665878!3d26.389867699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e56c380d3d53%3A0x87225b79c2ee99a7!2sUltra%20Industrial%20Services%20(UIS)!5e0!3m2!1sen!2sin!4v1772381347110!5m2!1sen!2sin"
                style={{ border: 0, width: "100%", minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("contact.map.iframeTitle")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="mb-3" style={{ color: "#0A2540" }}>{t("contact.emergency.title")}</h3>
            <p className="mb-6" style={{ color: "#6B7280" }}>
              {t("contact.emergency.description")}
            </p>
            <a
    href="tel:+966138141130"
    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
              <Phone className="w-5 h-5" />
              <span className="text-lg">+966-13-814 1130</span>
            </a>
          </div>
        </div>
      </section>
    </div>;
}

export {
  ContactPage
};
