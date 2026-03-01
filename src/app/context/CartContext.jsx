import { createContext, useContext, useState } from "react";
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addToCart = (item, quantity) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map(
          (i) => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(
      (prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return <CartContext.Provider
    value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}
  >
      {children}
    </CartContext.Provider>;
};
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export {
  CartProvider,
  useCart
};
