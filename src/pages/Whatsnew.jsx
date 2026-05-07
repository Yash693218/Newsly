import React from 'react'
import './Whatsnew.css'
import latestNews from '../assets/latest_news.jpg'

const Whatsnew = () => {
  return (
    <div className="whatsnew_page">
      <section className="whatsnew_hero">
        <div>
          <p className="feed_kicker">What’s New</p>
          <h1 className="whatsnew_title">Fresh updates across the <span className="news">Newsly</span> platform</h1>
          <p className="whatsnew_subtitle">
            Explore new features, curated collections, and product improvements
            designed to keep you ahead of the news cycle.
          </p>
        </div>
        <img className="whatsnew_hero_image" src={latestNews} alt="Latest news" />
      </section>

      <section className="update_grid">
        {[
          "AI-Powered Summaries",
          "New Morning Brief",
          "Deeper Topic Filters",
        ].map((title) => (
          <article className="update_card" key={title}>
            <div className="update_badge">New</div>
            <h3>{title}</h3>
            <p>
              A quick highlight of how this update improves the reading
              experience and helps you move faster.
            </p>
          </article>
        ))}
      </section>

      <section className="timeline_section">
        <h2>Release Timeline</h2>
        <div className="timeline">
          {[
            { date: "Feb 2026", title: "Personalized alerts", desc: "Choose alerts per topic and follow breaking news in real time." },
            { date: "Jan 2026", title: "Publisher trust badges", desc: "Visual indicators for verified sources and editorial standards." },
            { date: "Dec 2025", title: "Reading mode refresh", desc: "Cleaner typography with less distraction for long reads." },
          ].map((item) => (
            <div className="timeline_item" key={item.title}>
              <span className="timeline_date">{item.date}</span>
              <div className="timeline_content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="whatsnew_cta">
        <div>
          <h2>Want early access?</h2>
          <p>
            Join the preview list to test new features and shape what we build
            next.
          </p>
        </div>
        <button className="primary_btn" type="button">Join Preview</button>
      </section>
    </div>
  )
}

export default Whatsnew
