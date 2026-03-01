import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
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
        <div className="grid lg:grid-cols-3 gap-8">
          {
    /* Contact Information */
  }
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="lg:col-span-1 space-y-6"
  >
            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
                <Phone className="w-6 h-6" style={{ color: "#1E5EFF" }} />
              </div>
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Phone</h3>
              <p style={{ color: "#1F2937" }}>+966 11 234 5678</p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Monday - Saturday, 8AM - 6PM
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
                <Mail className="w-6 h-6" style={{ color: "#00B8D9" }} />
              </div>
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Email</h3>
              <p style={{ color: "#1F2937" }}>info@medsupplypro.sa</p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                We'll respond within 24 hours
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
                <MapPin className="w-6 h-6" style={{ color: "#1E5EFF" }} />
              </div>
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Address</h3>
              <p style={{ color: "#1F2937" }}>
                Medical Supplies District<br />
                King Fahd Road<br />
                Riyadh 12345, Saudi Arabia
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#E6F7FB" }}>
                <Clock className="w-6 h-6" style={{ color: "#00B8D9" }} />
              </div>
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Business Hours</h3>
              <p style={{ color: "#1F2937" }}>
                Monday - Thursday: 8:00 AM - 6:00 PM<br />
                Friday: Closed<br />
                Saturday: 9:00 AM - 3:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </motion.div>

          {
    /* Contact Form */
  }
          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="lg:col-span-2"
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
    href="tel:+966112345678"
    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
              <Phone className="w-5 h-5" />
              <span className="text-lg">+966 11 234 5678</span>
            </a>
          </div>
        </div>
      </section>
    </div>;
}
export {
  ContactPage
};
