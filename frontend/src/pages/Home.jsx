import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const heroSlides = [
    {
      title: "Fresh Vegetables Daily",
      subtitle: "Farm fresh vegetables delivered to your doorstep",
      image: "🥬",
      color: "#2c3e50",
    },
    {
      title: "Premium Dairy Products",
      subtitle: "Pure and nutritious dairy products for your family",
      image: "🥛",
      color: "#34495e",
    },
    {
      title: "Special Offers",
      subtitle: "Up to 30% off on selected items",
      image: "🎉",
      color: "#2c3e50",
    },
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await getProducts();
      setFeaturedProducts(products.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ background: slide.color }}
            >
              <div className="container">
                <div className="hero-content">
                  <div className="hero-text">
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    <Link to="/products" className="btn btn-hero">
                      Shop Now
                    </Link>
                  </div>
                  <div className="hero-image">
                    <span className="hero-emoji">{slide.image}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link
              to="/products?category=vegetables"
              className="category-card vegetables"
            >
              <div className="category-icon">🥕</div>
              <h3>Fresh Vegetables</h3>
              <p>Farm fresh & organic</p>
            </Link>
            <Link to="/products?category=dairy" className="category-card dairy">
              <div className="category-icon">🧀</div>
              <h3>Dairy Products</h3>
              <p>Pure & nutritious</p>
            </Link>
            <Link
              to="/products?category=fruits"
              className="category-card fruits"
            >
              <div className="category-icon">🍎</div>
              <h3>Fresh Fruits</h3>
              <p>Sweet & juicy</p>
            </Link>
            <Link
              to="/products?category=grains"
              className="category-card grains"
            >
              <div className="category-icon">🌾</div>
              <h3>Grains & Cereals</h3>
              <p>Healthy & wholesome</p>
            </Link>
            <Link
              to="/products?category=beverages"
              className="category-card beverages"
            >
              <div className="category-icon">🥤</div>
              <h3>Beverages</h3>
              <p>Refreshing drinks</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>Free delivery on orders above ₹500</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Fresh & Organic</h3>
              <p>100% fresh and organic products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices with great offers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Assured</h3>
              <p>Premium quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home {
          min-height: 100vh;
        }

        .hero {
          position: relative;
          height: 70vh;
          overflow: hidden;
        }

        .hero-slider {
          position: relative;
          height: 100%;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.8s ease-in-out;
          display: flex;
          align-items: center;
        }

        .hero-slide.active {
          opacity: 1;
          transform: translateX(0);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 2rem;
          height: 100%;
        }

        .hero-text {
          color: white;
          animation: fadeIn 1s ease-out 0.5s both;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .btn-hero {
          background: white;
          color: #333;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-hero:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-image {
          text-align: center;
          animation: fadeIn 1s ease-out 0.8s both;
        }

        .hero-emoji {
          font-size: 15rem;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .hero-indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 3rem;
          color: #333;
          position: relative;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: #2c3e50;
          border-radius: 2px;
        }

        .categories {
          padding: 5rem 0;
          background: #f8f9fa;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .category-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          text-decoration: none;
          color: #333;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .category-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #2c3e50;
        }

        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .category-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .category-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .category-card p {
          color: #666;
          font-size: 1rem;
        }

        .featured-products {
          padding: 5rem 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .features {
          padding: 5rem 0;
          background: #f8f8f8;
          color: #333;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e8e8e8;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          color: #666;
        }

        @media (max-width: 768px) {
          .hero {
            height: 60vh;
          }

          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-emoji {
            font-size: 8rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .categories-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-emoji {
            font-size: 6rem;
          }

          .category-card,
          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
