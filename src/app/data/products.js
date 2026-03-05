import rawProducts from "../../data/products.json";
import fallbackProductImage from "../../assets/fallback.png";

const iconNames = ["Scissors", "Stethoscope", "ShieldCheck", "TestTube", "Syringe", "Heart"];

const toCategoryId = (value) => {
  const normalized = value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "other";
};

const resolveImage = (imagePath) => {
  if (!imagePath) {
    return fallbackProductImage;
  }

  const segments = imagePath.split("/");
  const fileName = segments.pop();

  if (!fileName) {
    return fallbackProductImage;
  }

  const encodedFileName = encodeURIComponent(fileName);
  return [...segments, encodedFileName].join("/");
};

const normalizeBadge = (badgeValue, product, isFeatured) => {
  if (typeof badgeValue === "string" && badgeValue.trim()) {
    return badgeValue.trim().toUpperCase();
  }

  if ((product.code || "").includes("#2+1") || (product.name || "").includes("2+1")) {
    return "OFFER";
  }

  if (isFeatured) {
    return "FEATURED";
  }

  return "NEW";
};

const normalizeColors = (colors) => {
  if (!Array.isArray(colors)) {
    return [];
  }

  return colors
    .map((color) => {
      if (typeof color === "string") {
        return { id: color.toLowerCase(), name: color, hex: "#FFFFFF" };
      }

      if (color && typeof color === "object" && color.id && color.name) {
        return {
          id: String(color.id),
          name: String(color.name),
          hex: color.hex || "#FFFFFF"
        };
      }

      return null;
    })
    .filter(Boolean);
};

const products = rawProducts.map((product, index) => {
  const isFeatured = product.featured ?? index < 8;
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = normalizeColors(product.colors);

  return {
    id: String(product.id),
    code: product.code,
    name: product.name,
    arabic: product.arabic,
    category: toCategoryId(product.category || "other"),
    categoryName: product.category || "Other",
    description: product.description || "",
    images: Array.isArray(product.images) ? product.images.map((imagePath) => resolveImage(imagePath)) : [],
    image: resolveImage(product.image),
    sizes,
    colors,
    hasVariants: sizes.length > 0 || colors.length > 0,
    featured: isFeatured,
    badge: normalizeBadge(product.badge, product, isFeatured)
  };
});

const categories = Array.from(new Map(products.map((product) => [product.category, product.categoryName])).entries()).map(
  ([id, name], index) => ({
    id,
    name,
    icon: iconNames[index % iconNames.length]
  })
);

const getProductName = (product, language) => {
  if (language?.startsWith("ar") && product.arabic) {
    return product.arabic;
  }

  return product.name || "";
};

export {
  categories,
  products,
  getProductName
};
