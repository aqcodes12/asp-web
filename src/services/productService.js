import axios from "axios";

const normalizeColors = (colors) => {
  if (!Array.isArray(colors)) return [];
  return colors
    .map((color) => {
      if (typeof color === "string")
        return { id: color.toLowerCase(), name: color, hex: "#FFFFFF" };
      if (color && (color.id || color._id) && color.name)
        return {
          id: String(color.id || color._id),
          name: String(color.name),
          hex: color.hex || "#FFFFFF",
        };
      return null;
    })
    .filter(Boolean);
};

export const normalizeProduct = (product) => {
  const category = product.categoryId;
  const categoryName = category?.name_en || "Other";
  const categoryId =
    category?.slug ||
    categoryName
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") ||
    "other";

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
    description: product.description || "",
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
  const response = await axios.get(`/api/v1/product/getPublicProductByID/${id}`);
  const product =
    response.data?.data || response.data?.product || response.data;
  return product ? normalizeProduct(product) : null;
};
