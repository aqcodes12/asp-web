import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import aspLogo from "../../assets/asp.png";

function Footer() {
  const { t } = useTranslation();

  return <footer className="bg-white border-t mt-16" style={{ borderColor: "#E2E8F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {
    /* Company Info */
  }
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={aspLogo} alt="ASP logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              {t("footer.tagline")}
            </p>
          </div>

          {
    /* Quick Links */
  }
          <div>
            <h4 className="mb-4" style={{ color: "#0A2540" }}>{t("footer.quickLinks")}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("nav.home")}
              </Link>
              <Link to="/products" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("nav.products")}
              </Link>
              <Link to="/about" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("footer.aboutUs")}
              </Link>
              <Link to="/contact" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {
    /* Categories */
  }
          <div>
            <h4 className="mb-4" style={{ color: "#0A2540" }}>{t("common.categories")}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/products?category=surgical" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("categories.surgical")}
              </Link>
              <Link to="/products?category=diagnostic" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("categories.diagnostic")}
              </Link>
              <Link to="/products?category=ppe" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("categories.ppe")}
              </Link>
              <Link to="/products?category=lab" className="text-sm transition-colors" style={{ color: "#6B7280" }} onMouseEnter={(e) => e.currentTarget.style.color = "#1E5EFF"} onMouseLeave={(e) => e.currentTarget.style.color = "#6B7280"}>
                {t("categories.lab")}
              </Link>
            </div>
          </div>

          {
    /* Contact Info */
  }
          <div>
            <h4 className="mb-4" style={{ color: "#0A2540" }}>{t("common.contactUs")}</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" style={{ color: "#00B8D9" }} />
                <span className="text-sm" style={{ color: "#6B7280" }}>info@aspksa.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" style={{ color: "#00B8D9" }} />
                <span className="text-sm" style={{ color: "#6B7280" }}>+966-13-814 1130</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: "#00B8D9" }} />
                <span className="text-sm" style={{ color: "#6B7280" }}>{t("footer.location")}</span>
              </div>
            </div>
          </div>
        </div>

        {
    /* Bottom Bar */
  }
        <div className="border-t mt-8 pt-8" style={{ borderColor: "#E2E8F0" }}>
          <p className="text-sm text-center" style={{ color: "#6B7280" }}>
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>;
}
export {
  Footer
};
