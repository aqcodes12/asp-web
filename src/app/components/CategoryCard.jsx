import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

function CategoryCard({ id, name }) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a consistent accent from the name
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
        className="relative bg-white rounded-2xl overflow-hidden cursor-pointer"
        style={{
          border: isHovered ? "1px solid #1E5EFF" : "1px solid #E2E8F0",
          boxShadow: isHovered
            ? "0 12px 28px rgba(30, 94, 255, 0.16)"
            : "0 2px 10px rgba(15, 23, 42, 0.05)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          minWidth: "120px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
            opacity: isHovered ? 1 : 0.5,
            transition: "opacity 0.2s ease",
          }}
        />

        <div className="px-5 py-4 flex items-center gap-3">
          {/* Initials bubble */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-200"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${accent.from}, ${accent.to})`
                : "#EFF6FF",
              color: isHovered ? "white" : accent.from,
            }}
          >
            {initials}
          </div>

          <p
            className="text-sm font-semibold leading-tight transition-colors duration-200"
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
