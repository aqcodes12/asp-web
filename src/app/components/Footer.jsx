import { Link } from "react-router";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getCategories } from "../../services/categoryService";
import aspLogo from "../../assets/asp.png";

function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((list) => setCategories(list.slice(0, 5))).catch(() => {});
  }, []);

  return (
    <footer style={{ backgroundColor: "#0A2540" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="col-span-1">
            <img src={aspLogo} alt="ASP logo" className="h-9 w-auto object-contain mb-4 brightness-0 invert opacity-90" />
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase" style={{ color: "#CBD5E1" }}>
              {t("footer.quickLinks")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/products", label: t("nav.products") },
                { to: "/offers", label: t("nav.offers") },
                { to: "/about", label: t("footer.aboutUs") },
                { to: "/contact", label: t("nav.contact") },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                  style={{ color: "#64748B" }}
                >
                  {label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-px" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase" style={{ color: "#CBD5E1" }}>
              {t("common.categories")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                  style={{ color: "#64748B" }}
                >
                  {isArabic ? (cat.name_ar || cat.name) : cat.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-px" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase" style={{ color: "#CBD5E1" }}>
              {t("common.contactUs")}
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@aspksa.com" className="flex items-start gap-2.5 group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(0,184,217,0.12)" }}>
                  <Mail className="w-3.5 h-3.5" style={{ color: "#00B8D9" }} />
                </div>
                <span className="text-sm transition-colors duration-200 group-hover:text-white" style={{ color: "#64748B" }}>info@aspksa.com</span>
              </a>
              <a href="tel:+966138141130" className="flex items-start gap-2.5 group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(30,94,255,0.12)" }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: "#1E5EFF" }} />
                </div>
                <span className="text-sm transition-colors duration-200 group-hover:text-white" style={{ color: "#64748B" }}>+966-13-814 1130</span>
              </a>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(0,184,217,0.12)" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#00B8D9" }} />
                </div>
                <span className="text-sm" style={{ color: "#64748B" }}>{t("footer.location")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#475569" }}>
            © 2026 ASP. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            Developed by{" "}
            <a
              href="https://www.ex-ion.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "#1E5EFF" }}
            >
              Ex-ion
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
