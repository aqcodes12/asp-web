import { Link, NavLink } from "react-router";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import aspLogo from "../../assets/asp.png";

function Navbar() {
  const { t, i18n } = useTranslation();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isArabic = i18n.resolvedLanguage === "ar";

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  const getDesktopNavLinkClassName = ({ isActive }) =>
    `nav-link-hover relative py-1 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-[#1E5EFF] active-link" : "text-[#475569] hover:text-[#1E5EFF]"
    }`;

  const getMobileNavLinkClassName = ({ isActive }) =>
    `py-3 px-4 rounded-xl transition-all duration-200 ${
      isActive
        ? "font-semibold text-[#1E5EFF] bg-[#EFF6FF]"
        : "text-[#1F2937] hover:text-[#1E5EFF] hover:bg-[#F8FAFC]"
    }`;

  return (
    <nav className="bg-white border-b sticky top-0 z-50" style={{ borderColor: "#E2E8F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={aspLogo}
              alt="ASP logo"
              className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={getDesktopNavLinkClassName}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/products" className={getDesktopNavLinkClassName}>
              {t("nav.products")}
            </NavLink>
            <NavLink to="/offers" className={getDesktopNavLinkClassName}>
              {t("nav.offers")}
            </NavLink>
            <NavLink to="/about" className={getDesktopNavLinkClassName}>
              {t("nav.about")}
            </NavLink>
            <NavLink to="/contact" className={getDesktopNavLinkClassName}>
              {t("nav.contact")}
            </NavLink>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:shadow-sm mr-2"
              style={{ borderColor: "#BFDBFE", color: "#1E5EFF", backgroundColor: "#EFF6FF" }}
              aria-label={t("nav.toggleLanguage")}
            >
              {isArabic ? "EN" : "AR"}
            </button>
            <Link
              to="/products"
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F5F9] transition-colors duration-200"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" style={{ color: "#6B7280" }} />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F5F9] transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" style={{ color: "#6B7280" }} />
              {cartCount > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: "#1E5EFF" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F5F9] transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" style={{ color: "#1F2937" }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" style={{ color: "#1F2937" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div className="flex flex-col gap-1 py-3">
                <NavLink
                  to="/"
                  end
                  className={getMobileNavLinkClassName}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.home")}
                </NavLink>
                <NavLink
                  to="/products"
                  className={getMobileNavLinkClassName}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.products")}
                </NavLink>
                <NavLink
                  to="/offers"
                  className={getMobileNavLinkClassName}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.offers")}
                </NavLink>
                <NavLink
                  to="/about"
                  className={getMobileNavLinkClassName}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.about")}
                </NavLink>
                <NavLink
                  to="/contact"
                  className={getMobileNavLinkClassName}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.contact")}
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export {
  Navbar
};
