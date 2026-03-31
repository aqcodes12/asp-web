import axios from "axios";

const COLOR_MAP = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#EF4444",
  blue: "#3B82F6",
  green: "#22C55E",
  yellow: "#EAB308",
  orange: "#F97316",
  purple: "#A855F7",
  pink: "#EC4899",
  gray: "#6B7280",
  grey: "#6B7280",
  brown: "#92400E",
  navy: "#1E3A5F",
  beige: "#F5F0E8",
  cream: "#FFFDD0",
  gold: "#F59E0B",
  silver: "#C0C0C0",
  maroon: "#800000",
  teal: "#14B8A6",
  cyan: "#06B6D4",
};

const normalizeColors = (colors) => {
  if (!Array.isArray(colors)) return [];
  return colors
    .map((color) => {
      if (typeof color === "string") {
        const key = color.toLowerCase().trim();
        return { id: key, name: color, hex: COLOR_MAP[key] || color };
      }
      if (color && (color.id || color._id) && color.name) {
        const key = String(color.name).toLowerCase().trim();
        return {
          id: String(color.id || color._id),
          name: String(color.name),
          hex: color.hex || COLOR_MAP[key] || "#CCCCCC",
        };
      }
      return null;
    })
    .filter(Boolean);
};

export const normalizeProduct = (product) => {
  const category = product.categoryId;
  const categoryName = category?.name_en || "Other";
  const categoryId = category?._id || "other";

  const sizes = product.variants?.sizes || [];
  const colors = normalizeColors(product.variants?.colors || []);
  const images = Array.isArray(product.images) ? product.images : [];
  const image = images[0] || "";

  return {
    id: product._id,
    code: product.productCode || product.code || "",
    name: product.name_en || product.name || "",
    arabic: product.name_ar || "",
    category: categoryId,
    categoryName,
    categoryName_ar: category?.name_ar || categoryName,
    description: product.description_en || product.description || "",
    description_ar: product.description_ar || "",
    image,
    images,
    sizes,
    colors,
    hasVariants: sizes.length > 0 || colors.length > 0,
    featured: product.featured ?? false,
    badge: product.badge || "NEW",
  };
};

export const getProducts = async () => {
  const response = await axios.get("/api/v1/product/getPublicProducts", {
    params: { status: "ACTIVE" },
  });
  const list = response.data?.data || [];
  return Array.isArray(list) ? list.map(normalizeProduct) : [];
};

export const getFeaturedProducts = async () => {
  const response = await axios.get("/api/v1/product/getPublicProducts", {
    params: { badge: "FEATURED" },
  });
  const list = response.data?.data || [];
  return Array.isArray(list) ? list.map(normalizeProduct) : [];
};

export const getOfferProducts = async () => {
  const response = await axios.get("/api/v1/product/getPublicProducts", {
    params: { badge: "OFFER" },
  });
  const list = response.data?.data || [];
  return Array.isArray(list) ? list.map(normalizeProduct) : [];
};

export const getProductById = async (id) => {
  const response = await axios.get(
    `/api/v1/product/getPublicProductByID/${id}`,
  );
  const product =
    response.data?.data || response.data?.product || response.data;
  return product ? normalizeProduct(product) : null;
};
