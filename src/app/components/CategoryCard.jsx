import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

function CategoryCard({ id, name, image }) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    { from: "#1E5EFF", to: "#00B8D9" },
    { from: "#00B8D9", to: "#06B6D4" },
    { from: "#6366F1", to: "#1E5EFF" },
    { from: "#0EA5E9", to: "#1E5EFF" },
    { from: "#1E5EFF", to: "#6366F1" },
    { from: "#00B8D9", to: "#1E5EFF" },
  ];
  const accent = colors[(name?.charCodeAt(0) || 0) % colors.length];

  const initials = (name || "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

  return (
    <Link to={`/products?category=${id}`} className="block">
      <motion.div
        className="bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center text-center"
        style={{
          border: isHovered ? "1px solid #1E5EFF" : "1px solid #E2E8F0",
          boxShadow: isHovered
            ? "0 12px 28px rgba(30, 94, 255, 0.16)"
            : "0 2px 10px rgba(15, 23, 42, 0.05)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          width: "140px",
          height: "160px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Image area */}
        <div
          className="w-full flex items-center justify-center"
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${accent.from}18, ${accent.to}18)`
              : "#F8FAFC",
            padding: "20px 16px 16px",
            transition: "background 0.2s ease",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-16 h-16 object-contain transition-transform duration-200"
              style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-200"
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, ${accent.from}, ${accent.to})`
                  : "#EFF6FF",
                color: isHovered ? "white" : accent.from,
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <div
          className="w-full px-3 py-3"
          style={{ borderTop: "1px solid #F1F5F9" }}
        >
          <p
            className="text-xs font-semibold leading-snug transition-colors duration-200"
            style={{ color: isHovered ? "#1E5EFF" : "#0A2540" }}
          >
            {name}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export { CategoryCard };
