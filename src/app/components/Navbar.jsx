import { Link, NavLink } from "react-router";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import healthcareIcon from "../../assets/healthcare.png";
function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getDesktopNavLinkClassName = ({ isActive }) => `transition-colors ${isActive ? "font-semibold text-[#1E5EFF]" : "text-[#1F2937] hover:text-[#00B8D9]"}`;
  const getMobileNavLinkClassName = ({ isActive }) => `py-2 transition-colors ${isActive ? "font-semibold text-[#1E5EFF]" : "text-[#1F2937] hover:text-[#00B8D9]"}`;
  return <nav className="bg-white border-b sticky top-0 z-50" style={{ borderColor: "#E2E8F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {
    /* Logo */
  }
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <img src={healthcareIcon} alt="ASP logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xl font-semibold tracking-wide" style={{ color: "#1E5EFF" }}>ASP</span>
            </div>
          </Link>

          {
    /* Desktop Menu */
  }
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={getDesktopNavLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/products" className={getDesktopNavLinkClassName}>
              Products
            </NavLink>
            <NavLink to="/about" className={getDesktopNavLinkClassName}>
              About
            </NavLink>
            <NavLink to="/contact" className={getDesktopNavLinkClassName}>
              Contact
            </NavLink>
          </div>

          {
    /* Right Icons */
  }
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:opacity-80 transition-opacity">
              <Search className="w-5 h-5" style={{ color: "#6B7280" }} />
            </Link>
            <button
    onClick={() => setIsCartOpen(true)}
    className="relative hover:opacity-80 transition-opacity"
  >
              <ShoppingCart className="w-5 h-5" style={{ color: "#6B7280" }} />
              {cartCount > 0 && <span
    className="absolute -top-2.5 -right-2.5 min-w-5 h-5 px-1 rounded-full text-white text-xs font-semibold flex items-center justify-center"
    style={{ backgroundColor: "#1E5EFF" }}
  >
                  {cartCount}
                </span>}
            </button>
            <button
    className="md:hidden"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
              <Menu className="w-6 h-6" style={{ color: "#1F2937" }} />
            </button>
          </div>
        </div>

        {
    /* Mobile Menu */
  }
        {mobileMenuOpen && <div className="md:hidden py-4 border-t" style={{ borderColor: "#E2E8F0" }}>
            <div className="flex flex-col gap-4">
              <NavLink
    to="/"
    end
    className={getMobileNavLinkClassName}
    onClick={() => setMobileMenuOpen(false)}
  >
                Home
              </NavLink>
              <NavLink
    to="/products"
    className={getMobileNavLinkClassName}
    onClick={() => setMobileMenuOpen(false)}
  >
                Products
              </NavLink>
              <NavLink
    to="/about"
    className={getMobileNavLinkClassName}
    onClick={() => setMobileMenuOpen(false)}
  >
                About
              </NavLink>
              <NavLink
    to="/contact"
    className={getMobileNavLinkClassName}
    onClick={() => setMobileMenuOpen(false)}
  >
                Contact
              </NavLink>
            </div>
          </div>}
      </div>
    </nav>;
}
export {
  Navbar
};
