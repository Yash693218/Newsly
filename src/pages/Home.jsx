import React, { useEffect, useState } from "react";
import "./home.css";
import personalizedImg from "../assets/target-hit-aim-svgrepo-com.svg";
import alertsImg from "../assets/lightning-svgrepo-com.svg";
import topicsImg from "../assets/interactive-svgrepo-com.svg";
import communityImg from "../assets/chat-chat-svgrepo-com.svg";
import sportsImg from "../assets/sports-svgrepo-com.svg";
import financeImg from "../assets/finance-coin-businesswoman-career-svgrepo-com.svg";
import parliamentImg from "../assets/parliament-svgrepo-com.svg";
import techImg from "../assets/technology-digital-transformation-machinery-engineering-industry-svgrepo-com.svg";

const cards = [
  {
    tag: "Sports",
    title: "Local Team Wins Championship",
    desc: "After an intense season, the team brings home the trophy.",
    likes: 124,
    comments: 18,
    shares: 9,
  },
  {
    tag: "Technology",
    title: "AI Breakthrough in 2026",
    desc: "Researchers reveal a powerful new AI model changing industries.",
    likes: 256,
    comments: 34,
    shares: 22,
  },
  {
    tag: "Business",
    title: "Stock Market Hits Record High",
    desc: "Markets surge as investors gain confidence worldwide.",
    likes: 98,
    comments: 12,
    shares: 6,
  },
];

const features = [
  {
    title: "Personalised Feed",
    desc: "Curated stories based on your interests and reading habits.",
    image: personalizedImg,
  },
  {
    title: "Breaking Alerts",
    desc: "Get real-time updates on the headlines that matter most.",
    image: alertsImg,
  },
  {
    title: "Smart Topics",
    desc: "Explore trending categories with quick, focused summaries.",
    image: topicsImg,
  },
  {
    title: "Community Chat",
    desc: "Join discussions and share your take with other readers.",
    image: communityImg,
  },
];

const categories = [
  {
    title: "Politics",
    desc: "Policy updates, elections, and global affairs in one place.",
    image: parliamentImg,
  },
  {
    title: "Sports",
    desc: "Scores, highlights, and stories from your favorite teams.",
    image: sportsImg,
  },
  {
    title: "Finance",
    desc: "Market moves, personal finance tips, and business news.",
    image: financeImg,
  },
  {
    title: "Technology",
    desc: "Innovation, gadgets, and the latest in tech culture.",
    image: techImg,
  },
];


const Home = ({ onAuthNavigate }) => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % cards.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const card = cards[index];

  return (
    <>
      <div className="main_container">
        <div className="box_left">
          <h1 className="main_container_headline">
            Your Personalized <span className="news">News</span> Experience
          </h1>
          <p>
            Stay informed with topics that matter to you - sports, investments,
            current affairs and more
          </p>
          <div className="login_btn">
            <button
              className="btn_login"
              type="button"
              onClick={() => onAuthNavigate && onAuthNavigate('/login')}
            >
              Log In
            </button>
            <button
              className="btn_signup"
              type="button"
              onClick={() => onAuthNavigate && onAuthNavigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="box_right">
          <div className={`hero-card ${animate ? "swipe" : ""}`}>
            <span className="tag">{card.tag}</span>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>

            <div className="card_actions">
              <button className="card_action" type="button">
                Like <span className="count">{card.likes}</span>
              </button>
              <button className="card_action" type="button">
                Comment <span className="count">{card.comments}</span>
              </button>
              <button className="card_action" type="button">
                Share <span className="count">{card.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="second_container">
        <h1 className="second_container_headline">
          Why Choose <span className="news">Newsly</span>?
        </h1>

        <div className="interest_card">
          {features.map((feature) => (
            <div className="cards" key={feature.title}>
              <img
                className="feature_icon"
                src={feature.image}
                alt={feature.title}
              />
              <h3 className="feature_title">{feature.title}</h3>
              <p className="feature_text">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="third_container">
        <h1 className="second_container_headline">
          Explore <span className="news">Categories</span>
        </h1>

        <div className="category_section">
          {categories.map((category) => (
            <div className="category_card" key={category.title}>
              <img className="feature_icon" src={category.image} alt={category.title} />
              <h3 className="feature_title">{category.title}</h3>
              <p className="feature_text">{category.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <div className="footer">
        <div className="footer_brand">
          <h2 className="footer_logo">Newsly</h2>
          <p className="footer_tagline">Your daily source for curated, trusted stories.</p>
        </div>

        <div className="footer_links">
          <div className="footer_col">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Categories</a>
            <a href="#">Pricing</a>
          </div>
          <div className="footer_col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer_col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <p> 2026 Newsly. All rights reserved.</p>
      </div>
    </>
  );
};

export default Home;
