import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Scissors,
  Stethoscope,
  ShieldCheck,
  TestTube,
  Syringe,
  Heart
} from "lucide-react";
import { useState } from "react";
const iconMap = {
  Scissors,
  Stethoscope,
  ShieldCheck,
  TestTube,
  Syringe,
  Heart
};
function CategoryCard({ id, name, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[icon] || Heart;
  return <Link to={`/products?category=${id}`}>
      <motion.div
    className="bg-white rounded-xl p-6 cursor-pointer"
    style={{
      border: "1px solid #E2E8F0",
      boxShadow: isHovered ? "0 8px 20px rgba(30, 94, 255, 0.1)" : "0 2px 8px rgba(0, 0, 0, 0.05)"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
        <div className="flex flex-col items-center text-center gap-4">
          <div
    className="w-16 h-16 rounded-xl flex items-center justify-center transition-all"
    style={{
      backgroundColor: isHovered ? "#1E5EFF" : "#E6F7FB"
    }}
  >
            <Icon
    className="w-8 h-8"
    style={{ color: isHovered ? "white" : "#00B8D9" }}
  />
          </div>
          <h3
    className="text-sm transition-colors"
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
