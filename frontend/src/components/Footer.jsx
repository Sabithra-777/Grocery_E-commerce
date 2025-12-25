import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="brand-icon">🛒</span>
              <h3>GroceryMart</h3>
            </div>
            <p>
              Your trusted partner for fresh, organic groceries delivered right
              to your doorstep.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li>
                <span>Help Center</span>
              </li>
              <li>
                <span>Contact Us</span>
              </li>
              <li>
                <span>FAQ</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <p>support@grocerymart.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 GroceryMart Groceries. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          margin-top: auto;
        }

        .footer-content {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          padding: 1.5rem 0;
        }

        .footer-section {
          flex: 1;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 1rem;
          color: white;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .brand-icon {
          font-size: 2rem;
        }

        .footer-section p {
          color: #bdc3c7;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          font-size: 1.2rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: #bdc3c7;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-section ul li a:hover {
          color: white;
        }

        .footer-section ul li span {
          color: #bdc3c7;
          cursor: default;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .contact-icon {
          font-size: 1.1rem;
          margin-top: 0.1rem;
        }

        .contact-item p {
          margin: 0;
          color: #bdc3c7;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 10px 12px;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .newsletter-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .newsletter-btn {
          background: linear-gradient(135deg, #9dcdb6ff 0%, #9ac5bbff 100%);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(11, 84, 147, 0.4);
        }

        .app-download p {
          margin-bottom: 0.5rem;
          color: #bdc3c7;
        }

        .app-links {
          display: flex;
          gap: 0.5rem;
        }

        .app-link {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: default;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom p {
          color: #bdc3c7;
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links span {
          color: #bdc3c7;
          font-size: 0.9rem;
          cursor: default;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 0;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .app-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            padding: 1.5rem 0;
          }

          .social-links {
            justify-content: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
