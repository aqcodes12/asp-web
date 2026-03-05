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

const products = rawProducts.map((product, index) => ({
  id: String(product.id),
  code: product.code,
  name: product.name,
  arabic: product.arabic,
  category: toCategoryId(product.category || "other"),
  categoryName: product.category || "Other",
  description: product.description || "",
  image: resolveImage(product.image),
  featured: index < 8
}));

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
