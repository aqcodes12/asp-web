import { createContext, useContext, useState } from "react";
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addToCart = (item, quantity) => {
    setCartItems((prev) => {
      const cartItemId = `${item.id}__${item.size || ""}__${item.color || ""}`;
      const existingItem = prev.find((i) => i.cartItemId === cartItemId);
      if (existingItem) {
        return prev.map(
          (i) => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [{ ...item, cartItemId, quantity }, ...prev];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(
      (prev) => prev.map((item) => item.cartItemId === cartItemId ? { ...item, quantity } : item)
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
