import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
function OrderFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    notes: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      customerName: "",
      companyName: "",
      email: "",
      phone: "",
      notes: ""
    });
  };
  return <AnimatePresence>
      {isOpen && <>
          {
    /* Backdrop */
  }
          <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-black/50 z-50"
  />

          {
    /* Modal */
  }
          <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
  >
            <div className="bg-white rounded-2xl p-8 mx-4" style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 style={{ color: "#0A2540" }}>Submit Order Inquiry</h2>
                <button onClick={onClose} className="hover:opacity-70">
                  <X className="w-5 h-5" style={{ color: "#6B7280" }} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                    Customer Name *
                  </label>
                  <input
    type="text"
    required
    value={formData.customerName}
    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
    className="w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                    Company Name *
                  </label>
                  <input
    type="text"
    required
    value={formData.companyName}
    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
    className="w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                    Email *
                  </label>
                  <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                    Phone *
                  </label>
                  <input
    type="tel"
    required
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    className="w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#1F2937" }}>
                    Notes (Optional)
                  </label>
                  <textarea
    value={formData.notes}
    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
    rows={3}
    className="w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 resize-none"
    style={{
      backgroundColor: "#F8FAFC",
      border: "1px solid #E2E8F0",
      color: "#1F2937"
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#1E5EFF"}
    onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
  />
                </div>

                <button
    type="submit"
    className="w-full py-3 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                  Submit Order Inquiry
                </button>
              </form>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}
function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const subtotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleSubmitOrder = (formData) => {
    console.log("Order submitted:", { formData, items: cartItems });
    alert("Order inquiry submitted successfully! We will contact you shortly.");
    clearCart();
    setShowOrderForm(false);
    setIsCartOpen(false);
  };
  return <>
      <AnimatePresence>
        {isCartOpen && <>
            {
    /* Backdrop */
  }
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsCartOpen(false)}
    className="fixed inset-0 bg-black/50 z-40"
  />

            {
    /* Drawer */
  }
            <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col"
    style={{ boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)" }}
  >
              {
    /* Header */
  }
              <div className="p-6 border-b" style={{ borderColor: "#E2E8F0" }}>
                <div className="flex justify-between items-center">
                  <h2 style={{ color: "#0A2540" }}>Your Cart</h2>
                  <button onClick={() => setIsCartOpen(false)} className="hover:opacity-70">
                    <X className="w-6 h-6" style={{ color: "#6B7280" }} />
                  </button>
                </div>
                {cartItems.length > 0 && <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                  </p>}
              </div>

              {
    /* Cart Items */
  }
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: "#E6F7FB" }}>
                      <X className="w-10 h-10" style={{ color: "#00B8D9" }} />
                    </div>
                    <p style={{ color: "#6B7280" }}>Your cart is empty</p>
                  </div> : <div className="space-y-5">
                    {cartItems.map((item) => <div
    key={item.id}
    className="flex gap-4 p-5 rounded-2xl"
    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)" }}
  >
                        <img
    src={item.image}
    alt={item.name}
    className="w-20 h-20 rounded-lg object-cover"
  />
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 truncate" style={{ color: "#0A2540" }}>{item.name}</h4>
                          <p className="text-xs mb-2" style={{ color: "#6B7280" }}>Code: {item.code}</p>
                          {(item.size || item.color) && <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
                              {item.size ? `Size: ${item.size}` : ""}
                              {item.size && item.color ? " | " : ""}
                              {item.color ? `Color: ${item.color}` : ""}
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
  >
                              <Trash2 className="w-4 h-4" style={{ color: "#6B7280" }} />
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>

              {
    /* Footer */
  }
              {cartItems.length > 0 && <div className="p-6 border-t" style={{ borderColor: "#E2E8F0" }}>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span style={{ color: "#6B7280" }}>Subtotal</span>
                    <span style={{ color: "#0A2540" }}>{subtotalItems} item{subtotalItems !== 1 ? "s" : ""}</span>
                  </div>
                  <button
    onClick={() => setShowOrderForm(true)}
    className="w-full py-3 rounded-xl transition-all hover:opacity-90"
    style={{ backgroundColor: "#1E5EFF", color: "white" }}
  >
                    Submit Order Inquiry
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
