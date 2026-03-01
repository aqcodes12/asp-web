import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
function AboutPage() {
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
            <h1 className="mb-6" style={{ color: "#0A2540" }}>About MedSupply Pro</h1>
            <p className="text-lg" style={{ color: "#1F2937" }}>
              Your trusted partner in medical supplies, serving healthcare professionals across Saudi Arabia for over 15 years.
            </p>
          </motion.div>
        </div>
      </section>

      {
    /* Mission Section */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
            <h2 className="mb-6" style={{ color: "#0A2540" }}>Our Mission</h2>
            <p className="mb-4" style={{ color: "#1F2937" }}>
              At MedSupply Pro, we are committed to providing healthcare facilities with the highest quality medical supplies and equipment. Our mission is to support healthcare professionals by ensuring they have access to reliable, certified products when they need them most.
            </p>
            <p style={{ color: "#1F2937" }}>
              We understand the critical nature of medical supplies in saving lives and improving patient care. That's why we maintain rigorous quality standards and work only with certified manufacturers and suppliers.
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
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Certified</h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>ISO certified quality standards</p>
            </div>
            <div className="bg-white p-6 rounded-xl" style={{ border: "1px solid #E2E8F0" }}>
              <Users className="w-12 h-12 mb-4" style={{ color: "#00B8D9" }} />
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Expert Team</h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>Experienced medical supply professionals</p>
            </div>
            <div className="bg-white p-6 rounded-xl col-span-2" style={{ border: "1px solid #E2E8F0" }}>
              <TrendingUp className="w-12 h-12 mb-4" style={{ color: "#1E5EFF" }} />
              <h3 className="mb-2" style={{ color: "#0A2540" }}>Growing Network</h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>Serving 500+ healthcare facilities across Saudi Arabia</p>
            </div>
          </motion.div>
        </div>
      </section>

      {
    /* Values Section */
  }
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{ color: "#0A2540" }}>Our Core Values</h2>
            <p style={{ color: "#6B7280" }}>The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E6F7FB" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#1E5EFF" }} />
                </div>
                <h3 className="mb-3" style={{ color: "#0A2540" }}>Quality First</h3>
                <p style={{ color: "#6B7280" }}>
                  We never compromise on quality. Every product meets or exceeds international medical standards.
                </p>
              </div>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E6F7FB" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#00B8D9" }} />
                </div>
                <h3 className="mb-3" style={{ color: "#0A2540" }}>Customer Focus</h3>
                <p style={{ color: "#6B7280" }}>
                  Your needs are our priority. We provide personalized service and support to every client.
                </p>
              </div>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E6F7FB" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#1E5EFF" }} />
                </div>
                <h3 className="mb-3" style={{ color: "#0A2540" }}>Reliability</h3>
                <p style={{ color: "#6B7280" }}>
                  Count on us for consistent quality, timely delivery, and dependable service every time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Stats Section */
  }
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
              <p style={{ color: "#6B7280" }}>Years in Business</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#00B8D9" }}>500+</div>
              <p style={{ color: "#6B7280" }}>Healthcare Clients</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#1E5EFF" }}>2000+</div>
              <p style={{ color: "#6B7280" }}>Products Available</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="text-center"
  >
              <div className="text-4xl md:text-5xl mb-2" style={{ color: "#00B8D9" }}>99%</div>
              <p style={{ color: "#6B7280" }}>Client Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Why Choose Us */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4" style={{ color: "#0A2540" }}>Why Choose MedSupply Pro?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
    {
      title: "Comprehensive Product Range",
      description: "From surgical instruments to diagnostic equipment, we offer a complete range of medical supplies."
    },
    {
      title: "Certified Quality",
      description: "All products meet international standards and come with proper certifications."
    },
    {
      title: "Fast & Reliable Delivery",
      description: "Efficient logistics ensuring your supplies arrive when you need them."
    },
    {
      title: "Competitive Pricing",
      description: "Quality products at fair prices with volume discounts for bulk orders."
    },
    {
      title: "Expert Support",
      description: "Our knowledgeable team is always ready to help with product selection and technical queries."
    },
    {
      title: "Flexible Payment Terms",
      description: "We offer flexible payment options for registered healthcare institutions."
    }
  ].map((item, index) => <motion.div
    key={index}
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
