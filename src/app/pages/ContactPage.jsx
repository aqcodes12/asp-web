import { useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for your inquiry! We will get back to you within 24 hours.");
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
      {
    /* Hero Section */
  }
      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mx-auto text-center"
  >
            <h1 className="mb-6" style={{ color: "#0A2540" }}>Get in Touch</h1>
            <p className="text-lg" style={{ color: "#1F2937" }}>
              Have questions about our products or services? Our team is here to help you find the right medical supplies for your healthcare facility.
            </p>
          </motion.div>
        </div>
      </section>

      {
    /* Contact Info & Form */
  }
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
            <h3 className="mb-3" style={{ color: "#0A2540" }}>Contact us</h3>
            <div className="space-y-2" style={{ color: "#1F2937" }}>
              <p>Telephone: +966-13-814 1130</p>
              <p>TeleFax: +966-13-814 4588</p>
              <p>E-mail: info@aspksa.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
              <MapPin className="w-6 h-6" style={{ color: "#00B8D9" }} />
            </div>
            <h3 className="mb-3" style={{ color: "#0A2540" }}>Visit us</h3>
            <p style={{ color: "#1F2937" }}>
              No. 2, Ultra Business Center, Saud Faisal Road, Khalidiyah, Dammam-32225, KSA.
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
              <h2 className="mb-6" style={{ color: "#0A2540" }}>Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      Full Name *
                    </label>
                    <input
    type="text"
    required
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      Email Address *
                    </label>
                    <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      Phone Number *
                    </label>
                    <input
    type="tel"
    required
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>

                  <div>
                    <label className="block mb-2" style={{ color: "#1F2937" }}>
                      Company/Organization *
                    </label>
                    <input
    type="text"
    required
    value={formData.company}
    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>
                </div>

                <div>
                  <label className="block mb-2" style={{ color: "#1F2937" }}>
                    Subject *
                  </label>
                  <input
    type="text"
    required
    value={formData.subject}
    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: "#1F2937" }}>
                    Message *
                  </label>
                  <textarea
    required
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    rows={6}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 resize-none"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <button
    type="submit"
    className="w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
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
              <h3 className="mb-4" style={{ color: "#0A2540" }}>Location Map</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.040854970368!2d50.1665878!3d26.389867699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e56c380d3d53%3A0x87225b79c2ee99a7!2sUltra%20Industrial%20Services%20(UIS)!5e0!3m2!1sen!2sin!4v1772381347110!5m2!1sen!2sin"
                style={{ border: 0, width: "100%", minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ASP location map"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {
    /* Emergency Contact */
  }
      <section style={{ backgroundColor: "#E6F7FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="mb-3" style={{ color: "#0A2540" }}>Need Urgent Medical Supplies?</h3>
            <p className="mb-6" style={{ color: "#6B7280" }}>
              For urgent orders and emergency supply requests, please call our hotline
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
