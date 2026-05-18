import { Link, NavLink } from "react-router";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import aspLogo from "../../assets/asp.png";
import fullLogo from "../../assets/fulllogo.png";

function Navbar() {
  const { t, i18n } = useTranslation();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isArabic = i18n.resolvedLanguage === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  const getDesktopNavLinkClassName = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 group ${
      isActive ? "text-[#1E5EFF]" : "text-[#475569] hover:text-[#1E5EFF]"
    }`;

  const getMobileNavLinkClassName = ({ isActive }) =>
    `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "font-semibold text-[#1E5EFF] bg-[#EFF6FF]"
        : "text-[#475569] hover:text-[#1E5EFF] hover:bg-[#F8FAFC]"
    }`;

  return (
    <nav
      className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-shadow duration-300"
      style={{
        borderBottom: "1px solid #E2E8F0",
        boxShadow: scrolled ? "0 4px 20px rgba(10, 37, 64, 0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[68px]">
          <Link to="/" className="flex items-center group">
            <img
              src={fullLogo}
              alt="ASP logo"
              className="hidden md:block h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
            <img
              src={aspLogo}
              alt="ASP logo"
              className="md:hidden h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {[
              { to: "/", end: true, label: t("nav.home") },
              { to: "/products", label: t("nav.products") },
              { to: "/offers", label: t("nav.offers") },
              { to: "/about", label: t("nav.about") },
              { to: "/contact", label: t("nav.contact") },
            ].map(({ to, end, label }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={getDesktopNavLinkClassName}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-all duration-200"
                      style={{
                        background: "linear-gradient(90deg, #1E5EFF, #00B8D9)",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                      }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wide transition-all duration-200 hover:shadow-sm mr-1"
              style={{
                borderColor: "#BFDBFE",
                color: "#1E5EFF",
                backgroundColor: "#EFF6FF",
              }}
              aria-label={t("nav.toggleLanguage")}
            >
              {isArabic ? "EN" : "AR"}
            </button>
            <Link
              to="/products"
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F5F9] transition-colors duration-200"
              aria-label="Search products"
            >
              <Search
                className="w-[18px] h-[18px]"
                style={{ color: "#64748B" }}
              />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F5F9] transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingCart
                className="w-[18px] h-[18px]"
                style={{ color: "#64748B" }}
              />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1E5EFF, #00B8D9)",
                  }}
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
                {[
                  { to: "/", end: true, label: t("nav.home") },
                  { to: "/products", label: t("nav.products") },
                  { to: "/offers", label: t("nav.offers") },
                  { to: "/about", label: t("nav.about") },
                  { to: "/contact", label: t("nav.contact") },
                ].map(({ to, end, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={getMobileNavLinkClassName}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export { Navbar };
