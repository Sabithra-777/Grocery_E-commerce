import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // ✅ Lazy initialization (NO useEffect setState)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // ✅ Side-effect ONLY syncing to localStorage (allowed)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("This product is out of stock!");
      return false;
    }

    let added = false;
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        // Check if adding another would exceed stock
        if (existing.quantity + 1 > product.stock) {
          alert(`Only ${product.stock} items available in stock!`);
          return prev;
        }
        added = true;
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      added = true;
      return [...prev, { ...product, quantity: 1 }];
    });
    return added;
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i._id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) => {
      const item = prev.find((item) => item._id === productId);
      if (item && qty > item.stock) {
        alert(`Only ${item.stock} items available in stock!`);
        return prev;
      }

      return prev.map((item) =>
        item._id === productId ? { ...item, quantity: qty } : item
      );
    });
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.offerPrice || item.price) * item.quantity,
      0
    );

  const getCartItemsCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
