const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Us</h1>

        <p className="intro">
          Welcome to <strong>GroceryMart Groceries</strong> – your trusted online
          grocery delivery platform.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>🌱 Our Mission</h3>
            <p>
              Our mission is to make fresh, quality groceries easily accessible
              to everyone with fast delivery and affordable prices.
            </p>
          </div>

          <div className="about-card">
            <h3>🛒 What We Offer</h3>
            <ul>
              <li>Fresh vegetables & fruits</li>
              <li>Dairy & daily essentials</li>
              <li>Easy online ordering</li>
              <li>Secure checkout</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>⭐ Why Choose Us?</h3>
            <p>
              We focus on quality, convenience, and customer satisfaction. Built
              using the MERN stack, our platform ensures a smooth and reliable
              shopping experience.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          padding: 4rem 1rem;
          background: linear-gradient(to bottom, #f9fafb, #eef6ea);
        }

        .container {
          max-width: 1100px;
          margin: auto;
        }

        .page-title {
          text-align: center;
          font-size: 2.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .intro {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
          font-size: 1.1rem;
          color: #555;
          line-height: 1.7;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .about-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
        }

        .about-card h3 {
          margin-bottom: 0.8rem;
          font-size: 1.3rem;
          color: #2c3e50;
        }

        .about-card p {
          color: #666;
          line-height: 1.6;
        }

        .about-card ul {
          padding-left: 1.2rem;
        }

        .about-card li {
          margin-bottom: 0.5rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.2rem;
          }

          .intro {
            font-size: 1rem;
          }

          .about-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
