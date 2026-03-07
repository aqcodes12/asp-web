import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Armchair,
  Bed,
  Accessibility,
  Hand,
  Bandage,
  User
} from "lucide-react";
import { useState } from "react";
const iconMap = {
  Armchair,
  Bed,
  Accessibility,
  Hand,
  Bandage,
  User
};
function CategoryCard({ id, name, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[icon] || User;
  return <Link to={`/products?category=${id}`} className="block h-full">
      <motion.div
    className="bg-white rounded-xl p-6 cursor-pointer h-full"
    style={{
      border: isHovered ? "1px solid #00B8D9" : "1px solid #E2E8F0",
      boxShadow: isHovered ? "0 14px 30px rgba(30, 94, 255, 0.14)" : "0 4px 14px rgba(15, 23, 42, 0.06)",
      transition: "border-color 0.22s ease, box-shadow 0.22s ease"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
  >
        <div className="flex flex-col items-center text-center gap-4">
          <div
    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center transition-all"
    style={{
      backgroundColor: isHovered ? "#1E5EFF" : "#E6F7FB"
    }}
  >
            <Icon
    className="w-9 h-9"
    style={{ color: isHovered ? "white" : "#00B8D9" }}
  />
          </div>
          <h3
    className="text-sm transition-colors min-h-10 flex items-center justify-center leading-snug"
    style={{ color: isHovered ? "#1E5EFF" : "#0A2540" }}
  >
            {name}
          </h3>
        </div>
      </motion.div>
    </Link>;
}
export {
  CategoryCard
};
