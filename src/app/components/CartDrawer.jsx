import { X, Plus, Minus, Trash2, Phone, Check, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { getSalesmen } from "../../services/salesmanService";
import { createOrder } from "../../services/orderService";

function OrderFormModal({ isOpen, onClose, onSubmit, salesmen, salesmenLoading, isSubmitting }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    notes: "",
    selectedSalesmanId: "",
  });

  const inputClassName =
    "w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors";
  const inputStyle = {
    backgroundColor: "#F8FAFC",
    border: "1px solid #E2E8F0",
    color: "#1F2937",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      customerName: "",
      companyName: "",
      email: "",
      phone: "",
      notes: "",
      selectedSalesmanId: "",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 max-h-[92vh]"
          >
            <div
              className="bg-white rounded-3xl mx-4 overflow-hidden"
              style={{ boxShadow: "0 24px 48px rgba(2, 12, 27, 0.2)" }}
            >
              <div
                className="px-6 md:px-8 py-5 border-b"
                style={{
                  borderColor: "#E2E8F0",
                  background:
                    "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)",
                }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 style={{ color: "#0A2540" }}>
                      {t("cart.orderForm.title")}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "#64748B" }}>
                      {t("cart.orderForm.subtitle")}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="hover:opacity-70 mt-1"
                    aria-label={t("common.close")}
                  >
                    <X className="w-5 h-5" style={{ color: "#6B7280" }} />
                  </button>
                </div>
              </div>

              <div className="px-6 md:px-8 py-6 overflow-y-auto max-h-[calc(92vh-86px)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div
                    className="p-4 rounded-2xl"
                    style={{
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <label
                      className="block text-sm mb-3"
                      style={{ color: "#1F2937" }}
                    >
                      {t("cart.orderForm.chooseSalesman")}
                    </label>

                    {salesmenLoading ? (
                      <div className="flex justify-center py-4">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
                          style={{ borderColor: "#1E5EFF", borderTopColor: "transparent" }}
                        />
                      </div>
                    ) : salesmen.length <= 3 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {salesmen.map((salesman) => (
                          <button
                            key={salesman._id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                selectedSalesmanId: salesman._id,
                              })
                            }
                            className="text-start p-4 rounded-xl transition-all hover:-translate-y-0.5"
                            style={{
                              border: `1px solid ${formData.selectedSalesmanId === salesman._id ? "#1E5EFF" : "#DCE4EF"}`,
                              backgroundColor:
                                formData.selectedSalesmanId === salesman._id
                                  ? "#EFF6FF"
                                  : "white",
                              boxShadow:
                                formData.selectedSalesmanId === salesman._id
                                  ? "0 6px 14px rgba(30, 94, 255, 0.15)"
                                  : "0 2px 8px rgba(15, 23, 42, 0.05)",
                            }}
                          >
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <p style={{ color: "#0A2540" }}>{salesman.name}</p>
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor:
                                    formData.selectedSalesmanId === salesman._id
                                      ? "#1E5EFF"
                                      : "#E2E8F0",
                                }}
                              >
                                <Check
                                  className="w-3.5 h-3.5"
                                  style={{ color: "white" }}
                                />
                              </span>
                            </div>
                            {salesman.specialty && (
                              <p className="text-sm" style={{ color: "#475569" }}>
                                {salesman.specialty}
                              </p>
                            )}
                            {salesman.phone && (
                              <p
                                className="text-sm mt-2 flex items-center gap-1.5"
                                style={{ color: "#1E5EFF" }}
                              >
                                <Phone className="w-3.5 h-3.5" />
                                {salesman.phone}
                              </p>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <select
                        value={formData.selectedSalesmanId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selectedSalesmanId: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #E2E8F0",
                          color: "#1F2937",
                        }}
                      >
                        <option value="">{t("cart.orderForm.selectSalesman", { defaultValue: "Select a salesman" })}</option>
                        {salesmen.map((salesman) => (
                          <option key={salesman._id} value={salesman._id}>
                            {salesman.name}{salesman.phone ? ` — ${salesman.phone}` : ""}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#1F2937" }}
                      >
                        {t("cart.orderForm.customerName")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            customerName: event.target.value,
                          })
                        }
                        className={inputClassName}
                        style={inputStyle}
                        onFocus={(event) =>
                          (event.currentTarget.style.borderColor = "#1E5EFF")
                        }
                        onBlur={(event) =>
                          (event.currentTarget.style.borderColor = "#E2E8F0")
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#1F2937" }}
                      >
                        {t("cart.orderForm.companyName")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            companyName: event.target.value,
                          })
                        }
                        className={inputClassName}
                        style={inputStyle}
                        onFocus={(event) =>
                          (event.currentTarget.style.borderColor = "#1E5EFF")
                        }
                        onBlur={(event) =>
                          (event.currentTarget.style.borderColor = "#E2E8F0")
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#1F2937" }}
                      >
                        {t("cart.orderForm.email")}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            email: event.target.value,
                          })
                        }
                        className={inputClassName}
                        style={inputStyle}
                        onFocus={(event) =>
                          (event.currentTarget.style.borderColor = "#1E5EFF")
                        }
                        onBlur={(event) =>
                          (event.currentTarget.style.borderColor = "#E2E8F0")
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#1F2937" }}
                      >
                        {t("cart.orderForm.phone")}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            phone: event.target.value,
                          })
                        }
                        className={inputClassName}
                        style={inputStyle}
                        onFocus={(event) =>
                          (event.currentTarget.style.borderColor = "#1E5EFF")
                        }
                        onBlur={(event) =>
                          (event.currentTarget.style.borderColor = "#E2E8F0")
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#1F2937" }}
                    >
                      {t("cart.orderForm.notes")}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(event) =>
                        setFormData({ ...formData, notes: event.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 resize-none transition-colors"
                      style={inputStyle}
                      onFocus={(event) =>
                        (event.currentTarget.style.borderColor = "#1E5EFF")
                      }
                      onBlur={(event) =>
                        (event.currentTarget.style.borderColor = "#E2E8F0")
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.selectedSalesmanId || isSubmitting}
                    className="w-full py-3.5 rounded-xl transition-all"
                    style={{
                      backgroundColor:
                        formData.selectedSalesmanId && !isSubmitting
                          ? "#1E5EFF"
                          : "#93C5FD",
                      color: "white",
                      cursor:
                        formData.selectedSalesmanId && !isSubmitting
                          ? "pointer"
                          : "not-allowed",
                      boxShadow:
                        formData.selectedSalesmanId && !isSubmitting
                          ? "0 8px 20px rgba(30, 94, 255, 0.3)"
                          : "none",
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        {t("common.submitting", { defaultValue: "Submitting..." })}
                      </span>
                    ) : t("cart.orderForm.submit")}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SuccessModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-[60] mx-4"
          >
            <div
              className="bg-white rounded-3xl p-8 text-center"
              style={{ boxShadow: "0 24px 48px rgba(2, 12, 27, 0.2)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: "#10B981" }} />
              </div>
              <h3 className="text-lg mb-2" style={{ color: "#0A2540" }}>
                {t("cart.orderSuccess.title", { defaultValue: "Thank You!" })}
              </h3>
              <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                {t("cart.orderSuccess.message", { defaultValue: "Your enquiry has been submitted successfully" })}
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: "#1E5EFF", color: "white" }}
              >
                {t("common.close", { defaultValue: "Close" })}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartDrawer() {
  const { t, i18n } = useTranslation();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [salesmen, setSalesmen] = useState([]);
  const [salesmenLoading, setSalesmenLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    if (showOrderForm && salesmen.length === 0) {
      setSalesmenLoading(true);
      getSalesmen()
        .then((data) => {
          const list = data?.data || data?.salesmen || data || [];
          setSalesmen(Array.isArray(list) ? list : []);
        })
        .catch(() => {})
        .finally(() => setSalesmenLoading(false));
    }
  }, [showOrderForm]);

  const handleSubmitOrder = async (formData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        salesmanId: formData.selectedSalesmanId,
        customerName: formData.customerName,
        companyName: formData.companyName,
        phone: formData.phone,
        items: cartItems.map((item) => {
          const orderItem = {
            productId: item.id,
            quantity: item.quantity,
          };
          if (item.size || item.color) {
            orderItem.variant = {};
            if (item.size) orderItem.variant.size = item.size;
            if (item.color) orderItem.variant.color = item.color;
          }
          return orderItem;
        }),
      };
      await createOrder(payload);
      clearCart();
      setShowOrderForm(false);
      setIsCartOpen(false);
      setShowSuccess(true);
    } catch {
      // error toast handled by axios interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} h-full w-full max-w-md bg-white z-50 flex flex-col`}
              style={{
                boxShadow: isRTL
                  ? "4px 0 20px rgba(0, 0, 0, 0.1)"
                  : "-4px 0 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="p-6 border-b" style={{ borderColor: "#E2E8F0" }}>
                <div className="flex justify-between items-center">
                  <h2 style={{ color: "#0A2540" }}>{t("cart.title")}</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="hover:opacity-70"
                    aria-label={t("common.close")}
                  >
                    <X className="w-6 h-6" style={{ color: "#6B7280" }} />
                  </button>
                </div>
                {cartItems.length > 0 && (
                  <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                    {t("cart.itemsCount", { count: subtotalItems })}
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div
                      className="w-20 h-20 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: "#E6F7FB" }}
                    >
                      <X className="w-10 h-10" style={{ color: "#00B8D9" }} />
                    </div>
                    <p className="mb-4" style={{ color: "#6B7280" }}>
                      {t("cart.empty")}
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-xl transition-all hover:opacity-90"
                      style={{ backgroundColor: "#1E5EFF", color: "white" }}
                    >
                      {t("cart.continueShopping")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cartItems.map((item) => {
                      const itemName = item.nameKey
                        ? t(item.nameKey)
                        : i18n.language.startsWith("ar") && item.arabic
                          ? item.arabic
                          : item.name;
                      const itemColor = item.color
                        ? t(`common.colors.${item.color}`, {
                            defaultValue: item.color,
                          })
                        : "";

                      return (
                        <div
                          key={item.cartItemId}
                          className="flex gap-4 p-5 rounded-2xl"
                          style={{
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={itemName}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4
                              className="mb-1 truncate"
                              style={{ color: "#0A2540" }}
                            >
                              {itemName}
                            </h4>
                            <p
                              className="text-xs mb-2"
                              style={{ color: "#6B7280" }}
                            >
                              {t("productCard.code", { code: item.code })}
                            </p>
                            {(item.size || item.color) && (
                              <p
                                className="text-xs mb-2"
                                style={{ color: "#6B7280" }}
                              >
                                {item.size
                                  ? t("cart.sizeValue", { value: item.size })
                                  : ""}
                                {item.size && item.color ? " | " : ""}
                                {item.color
                                  ? t("cart.colorValue", { value: itemColor })
                                  : ""}
                              </p>
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartItemId, item.quantity - 1)
                                }
                                className="w-6 h-6 rounded-lg flex items-center justify-center"
                                style={{
                                  backgroundColor: "white",
                                  border: "1px solid #E2E8F0",
                                }}
                              >
                                <Minus
                                  className="w-3 h-3"
                                  style={{ color: "#6B7280" }}
                                />
                              </button>
                              <span
                                className="text-sm w-8 text-center"
                                style={{ color: "#1F2937" }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartItemId, item.quantity + 1)
                                }
                                className="w-6 h-6 rounded-lg flex items-center justify-center"
                                style={{
                                  backgroundColor: "white",
                                  border: "1px solid #E2E8F0",
                                }}
                              >
                                <Plus
                                  className="w-3 h-3"
                                  style={{ color: "#6B7280" }}
                                />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="ml-auto hover:opacity-70"
                                aria-label={t("cart.remove")}
                              >
                                <Trash2
                                  className="w-4 h-4"
                                  style={{ color: "#6B7280" }}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div
                  className="p-6 border-t space-y-3"
                  style={{ borderColor: "#E2E8F0" }}
                >
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span style={{ color: "#6B7280" }}>
                      {t("cart.subtotal")}
                    </span>
                    <span style={{ color: "#0A2540" }}>
                      {t("cart.itemsCount", { count: subtotalItems })}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 rounded-xl transition-all hover:opacity-90"
                    style={{
                      backgroundColor: "#F8FAFC",
                      color: "#1F2937",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    {t("cart.continueShopping")}
                  </button>
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full py-3 rounded-xl transition-all hover:opacity-90"
                    style={{ backgroundColor: "#1E5EFF", color: "white" }}
                  >
                    {t("cart.orderForm.submit")}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <OrderFormModal
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        onSubmit={handleSubmitOrder}
        salesmen={salesmen}
        salesmenLoading={salesmenLoading}
        isSubmitting={isSubmitting}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}

export { CartDrawer };
