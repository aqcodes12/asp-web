import { X, Plus, Minus, Trash2, Phone, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";

const salesTeam = [
  {
    id: "ahmed",
    nameKey: "cart.sales.ahmed.name",
    specialtyKey: "cart.sales.ahmed.specialty",
    phone: "+966xxxx"
  },
  {
    id: "khalid",
    nameKey: "cart.sales.khalid.name",
    specialtyKey: "cart.sales.khalid.specialty",
    phone: "+966xxxx"
  },
  {
    id: "faisal",
    nameKey: "cart.sales.faisal.name",
    specialtyKey: "cart.sales.faisal.specialty",
    phone: "+966xxxx"
  }
];

function OrderFormModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    notes: "",
    selectedSalesman: ""
  });

  const inputClassName = "w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors";
  const inputStyle = {
    backgroundColor: "#F8FAFC",
    border: "1px solid #E2E8F0",
    color: "#1F2937"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedSalesman = salesTeam.find((salesman) => salesman.id === formData.selectedSalesman);
    onSubmit({
      ...formData,
      selectedSalesman
    });
    setFormData({
      customerName: "",
      companyName: "",
      email: "",
      phone: "",
      notes: "",
      selectedSalesman: ""
    });
  };

  return <AnimatePresence>
      {isOpen && <>
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
            <div className="bg-white rounded-3xl mx-4 overflow-hidden" style={{ boxShadow: "0 24px 48px rgba(2, 12, 27, 0.2)" }}>
              <div className="px-6 md:px-8 py-5 border-b" style={{ borderColor: "#E2E8F0", background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)" }}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 style={{ color: "#0A2540" }}>{t("cart.orderForm.title")}</h2>
                    <p className="text-sm mt-1" style={{ color: "#64748B" }}>{t("cart.orderForm.subtitle")}</p>
                  </div>
                  <button onClick={onClose} className="hover:opacity-70 mt-1" aria-label={t("common.close")}>
                    <X className="w-5 h-5" style={{ color: "#6B7280" }} />
                  </button>
                </div>
              </div>

              <div className="px-6 md:px-8 py-6 overflow-y-auto max-h-[calc(92vh-86px)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                    <label className="block text-sm mb-3" style={{ color: "#1F2937" }}>
                      {t("cart.orderForm.chooseSalesman")}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {salesTeam.map((salesman) => <button
    key={salesman.id}
    type="button"
    onClick={() => setFormData({ ...formData, selectedSalesman: salesman.id })}
    className="text-start p-4 rounded-xl transition-all hover:-translate-y-0.5"
    style={{
      border: `1px solid ${formData.selectedSalesman === salesman.id ? "#1E5EFF" : "#DCE4EF"}`,
      backgroundColor: formData.selectedSalesman === salesman.id ? "#EFF6FF" : "white",
      boxShadow: formData.selectedSalesman === salesman.id ? "0 6px 14px rgba(30, 94, 255, 0.15)" : "0 2px 8px rgba(15, 23, 42, 0.05)"
    }}
  >
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <p style={{ color: "#0A2540" }}>{t(salesman.nameKey)}</p>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: formData.selectedSalesman === salesman.id ? "#1E5EFF" : "#E2E8F0" }}>
                              <Check className="w-3.5 h-3.5" style={{ color: "white" }} />
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: "#475569" }}>{t(salesman.specialtyKey)}</p>
                          <p className="text-sm mt-2 flex items-center gap-1.5" style={{ color: "#1E5EFF" }}>
                            <Phone className="w-3.5 h-3.5" />
                            {salesman.phone}
                          </p>
                        </button>)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                        {t("cart.orderForm.customerName")}
                      </label>
                      <input
    type="text"
    required
    value={formData.customerName}
    onChange={(event) => setFormData({ ...formData, customerName: event.target.value })}
    className={inputClassName}
    style={inputStyle}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                    </div>

                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                        {t("cart.orderForm.companyName")}
                      </label>
                      <input
    type="text"
    required
    value={formData.companyName}
    onChange={(event) => setFormData({ ...formData, companyName: event.target.value })}
    className={inputClassName}
    style={inputStyle}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                    </div>

                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                        {t("cart.orderForm.email")}
                      </label>
                      <input
    type="email"
    required
    value={formData.email}
    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
    className={inputClassName}
    style={inputStyle}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                    </div>

                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                        {t("cart.orderForm.phone")}
                      </label>
                      <input
    type="tel"
    required
    value={formData.phone}
    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
    className={inputClassName}
    style={inputStyle}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                      {t("cart.orderForm.notes")}
                    </label>
                    <textarea
    value={formData.notes}
    onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
    rows={4}
    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 resize-none transition-colors"
    style={inputStyle}
    onFocus={(event) => event.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(event) => event.currentTarget.style.borderColor = "#E2E8F0"}
  />
                  </div>

                  <button
    type="submit"
    disabled={!formData.selectedSalesman}
    className="w-full py-3.5 rounded-xl transition-all"
    style={{
      backgroundColor: formData.selectedSalesman ? "#1E5EFF" : "#93C5FD",
      color: "white",
      cursor: formData.selectedSalesman ? "pointer" : "not-allowed",
      boxShadow: formData.selectedSalesman ? "0 8px 20px rgba(30, 94, 255, 0.3)" : "none"
    }}
  >
                    {t("cart.orderForm.submit")}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}

function CartDrawer() {
  const { t, i18n } = useTranslation();
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const subtotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isRTL = i18n.dir() === "rtl";

  const handleSubmitOrder = (formData) => {
    console.log("Order submitted:", { formData, items: cartItems });
    alert(t("cart.orderSubmitted"));
    clearCart();
    setShowOrderForm(false);
    setIsCartOpen(false);
  };

  return <>
      <AnimatePresence>
        {isCartOpen && <>
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
    style={{ boxShadow: isRTL ? "4px 0 20px rgba(0, 0, 0, 0.1)" : "-4px 0 20px rgba(0, 0, 0, 0.1)" }}
  >
              <div className="p-6 border-b" style={{ borderColor: "#E2E8F0" }}>
                <div className="flex justify-between items-center">
                  <h2 style={{ color: "#0A2540" }}>{t("cart.title")}</h2>
                  <button onClick={() => setIsCartOpen(false)} className="hover:opacity-70" aria-label={t("common.close")}>
                    <X className="w-6 h-6" style={{ color: "#6B7280" }} />
                  </button>
                </div>
                {cartItems.length > 0 && <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                    {t("cart.itemsCount", { count: subtotalItems })}
                  </p>}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: "#E6F7FB" }}>
                      <X className="w-10 h-10" style={{ color: "#00B8D9" }} />
                    </div>
                    <p style={{ color: "#6B7280" }}>{t("cart.empty")}</p>
                  </div> : <div className="space-y-5">
                    {cartItems.map((item) => {
                const itemName = item.nameKey ? t(item.nameKey) : i18n.language.startsWith("ar") && item.arabic ? item.arabic : item.name;
                const itemColor = item.color ? t(`common.colors.${item.color}`, { defaultValue: item.color }) : "";

                return <div
      key={item.id}
      className="flex gap-4 p-5 rounded-2xl"
      style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)" }}
    >
                          <img
      src={item.image}
      alt={itemName}
      className="w-20 h-20 rounded-lg object-cover"
    />
                          <div className="flex-1 min-w-0">
                            <h4 className="mb-1 truncate" style={{ color: "#0A2540" }}>{itemName}</h4>
                            <p className="text-xs mb-2" style={{ color: "#6B7280" }}>{t("productCard.code", { code: item.code })}</p>
                            {(item.size || item.color) && <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
                                {item.size ? t("cart.sizeValue", { value: item.size }) : ""}
                                {item.size && item.color ? " | " : ""}
                                {item.color ? t("cart.colorValue", { value: itemColor }) : ""}
                              </p>}

                            <div className="flex items-center gap-2">
                              <button
      onClick={() => updateQuantity(item.id, item.quantity - 1)}
      className="w-6 h-6 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: "white", border: "1px solid #E2E8F0" }}
    >
                                <Minus className="w-3 h-3" style={{ color: "#6B7280" }} />
                              </button>
                              <span className="text-sm w-8 text-center" style={{ color: "#1F2937" }}>
                                {item.quantity}
                              </span>
                              <button
      onClick={() => updateQuantity(item.id, item.quantity + 1)}
      className="w-6 h-6 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: "white", border: "1px solid #E2E8F0" }}
    >
                                <Plus className="w-3 h-3" style={{ color: "#6B7280" }} />
                              </button>
                              <button
      onClick={() => removeFromCart(item.id)}
      className="ml-auto hover:opacity-70"
      aria-label={t("cart.remove")}
    >
                                <Trash2 className="w-4 h-4" style={{ color: "#6B7280" }} />
                              </button>
                            </div>
                          </div>
                        </div>;
              })}
                  </div>}
              </div>

              {cartItems.length > 0 && <div className="p-6 border-t" style={{ borderColor: "#E2E8F0" }}>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span style={{ color: "#6B7280" }}>{t("cart.subtotal")}</span>
                    <span style={{ color: "#0A2540" }}>{t("cart.itemsCount", { count: subtotalItems })}</span>
                  </div>
                  <button
    onClick={() => setShowOrderForm(true)}
    className="w-full py-3 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                    {t("cart.orderForm.submit")}
                  </button>
                </div>}
            </motion.div>
          </>}
      </AnimatePresence>

      <OrderFormModal
    isOpen={showOrderForm}
    onClose={() => setShowOrderForm(false)}
    onSubmit={handleSubmitOrder}
  />
    </>;
}

export {
  CartDrawer
};
