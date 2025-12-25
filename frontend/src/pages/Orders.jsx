import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { getOrders } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(
    location.state?.orderSuccess
  );

  // Clear the success state after showing it once
  useEffect(() => {
    if (orderSuccess) {
      // Clear the state from location to prevent showing again
      window.history.replaceState({}, document.title);
      setOrderSuccess(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch {
      setError("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ACTIONS ---------------- */

  const handleTrackOrder = (order) => {
    alert(`Order status: ${(order.status || "pending").toUpperCase()}`);
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      const product = item.productId || item;
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        offerPrice: product.offerPrice,
        image: product.image,
        quantity: item.quantity,
      });
    });
    navigate("/cart");
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: "PUT",
      });

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
      );
    } catch {
      alert("Failed to cancel order");
    }
  };

  /* ---------------- HELPERS ---------------- */

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="container">
          <h3>{error}</h3>
          <button onClick={fetchOrders} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Orders</h1>
          <p>Track and manage your orders</p>
        </div>

        {orderSuccess && (
          <div className="success-message">
            <p>Order placed successfully.</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="no-orders">No orders found</div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>

                  <span className="status-text">
                    {(order.status || "pending").toUpperCase()}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="order-items">
                  {order.items.map((item, idx) => {
                    const product = item.productId || item;
                    return (
                      <div key={idx} className="order-item">
                        <img
                          src={
                            product.image ||
                            "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
                          }
                          alt={product.name}
                        />
                        <div className="item-info">
                          <h4>{product.name}</h4>
                          <p>Qty: {item.quantity}</p>
                          <p>₹{product.price}</p>
                        </div>
                        <strong>
                          ₹{(product.price * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    );
                  })}
                </div>

                {/* ACTIONS */}
                <div className="order-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleTrackOrder(order)}
                  >
                    Track
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </button>

                  {(order.status === "pending" || !order.status) && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- STYLES ---------------- */}
      <style jsx>{`
        .orders-page {
          padding: 2rem 0 4rem;
          background: #f9fafb;
        }

        .page-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: 2.2rem;
        }

        .success-message {
          background: #ecfdf5;
          border: 1px solid #d1fae5;
          padding: 1rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #065f46;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .order-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .status-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
        }

        .order-items {
          padding: 1.25rem;
        }

        .order-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f1f1;
        }

        .order-item:last-child {
          border-bottom: none;
        }

        .order-item img {
          width: 56px;
          height: 56px;
          border-radius: 6px;
          object-fit: cover;
        }

        .item-info h4 {
          margin-bottom: 0.2rem;
        }

        .order-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          padding: 1.25rem;
        }

        /* BUTTONS */
        .btn {
          padding: 8px 14px;
          font-size: 14px;
          border-radius: 6px;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .btn-primary {
          background: #2c3e50;
          color: white;
        }

        .btn-primary:hover {
          background: #34495e;
        }

        .btn-secondary {
          background: white;
          border: 1px solid #d1d5db;
          color: #374151;
        }

        .btn-secondary:hover {
          background: #f3f4f6;
        }

        .btn-danger {
          background: #dc2626;
          color: white;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        @media (max-width: 768px) {
          .order-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default Orders;
