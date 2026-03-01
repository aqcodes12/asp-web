import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import healthcareIcon from "../../assets/healthcare.png";
function Footer() {
  return <footer className="bg-white border-t mt-16" style={{ borderColor: "#E2E8F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {
    /* Company Info */
  }
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={healthcareIcon} alt="ASP logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-lg font-semibold tracking-wide" style={{ color: "#1E5EFF" }}>ASP</span>
            </div>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Your trusted partner for healthcare essentials and medical supplies across Saudi Arabia.
            </p>
          </div>

          {
    /* Quick Links */
  }
          <div>
            <h4 className="mb-4" style={{ color: "#0A2540" }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                Home
              </Link>
              <Link to="/products" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                Products
              </Link>
              <Link to="/about" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                About Us
              </Link>
              <Link to="/contact" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                Contact
              </Link>
            </div>
          </div>

          {
    /* Categories */
  }
          <div>
            <h4 className="mb-4" style={{ color: "#0A2540" }}>Categories</h4>
            <div className="flex flex-col gap-2">
              <Link to="/products?category=surgical" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                Surgical Instruments
              </Link>
              <Link to="/products?category=diagnostic" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                Diagnostic Equipment
              </Link>
              <Link to="/products?category=ppe" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                PPE
              </Link>
              <Link to="/products?category=lab" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                Laboratory Supplies
              </Link>
            </div>
          </div>

          {
    /* Contact Info */
  }
          <div>
            <h4 className="mb-4" style={{ color: "#0A2540" }}>Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" style={{ color: "#00B8D9" }} />
                <span className="text-sm" style={{ color: "#6B7280" }}>info@medsupplypro.sa</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" style={{ color: "#00B8D9" }} />
                <span className="text-sm" style={{ color: "#6B7280" }}>+966 11 234 5678</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: "#00B8D9" }} />
                <span className="text-sm" style={{ color: "#6B7280" }}>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>

        {
    /* Bottom Bar */
  }
        <div className="border-t mt-8 pt-8" style={{ borderColor: "#E2E8F0" }}>
          <p className="text-sm text-center" style={{ color: "#6B7280" }}>
            © 2026 ASP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}
export {
  Footer
};
