import React, { useEffect, useState } from 'react'
import './Post.css'
import aiImage from '../assets/ai-chip-image.jpg'
import marketImage from '../assets/market_rally.jpg'
import sportsImage from '../assets/championship_image.jpg'
import healthcareImage from '../assets/healthcare_image.jpg'
import cityCouncilImage from '../assets/city_council.jpg'
import spaceImage from '../assets/sapce_mission.jpg'

const fallbackArticles = [
  {
    title: 'AI Policy Debate Shapes the Next Wave of Products',
    category: 'Technology',
    source: 'Newsly Picks',
    summary: 'Lawmakers and builders are debating how safety rules should work for fast-moving AI systems.',
    image: aiImage,
  },
  {
    title: 'Markets Rally as Investors Watch Fresh Data',
    category: 'Business',
    source: 'Market Desk',
    summary: 'Global indexes gained after new numbers pointed to stronger earnings and steady demand.',
    image: marketImage,
  },
  {
    title: 'Championship Preview: Rivalry Returns',
    category: 'Sports',
    source: 'Sports Wire',
    summary: 'Two long-time rivals meet again with momentum, injuries, and history all in focus.',
    image: sportsImage,
  },
  {
    title: 'Healthcare Startups Push Faster Diagnostics',
    category: 'Health',
    source: 'Health Brief',
    summary: 'New tools are helping clinics shorten wait times and improve early screening workflows.',
    image: healthcareImage,
  },
  {
    title: 'City Council Approves Smart Transit Plan',
    category: 'Politics',
    source: 'Civic Today',
    summary: 'The plan adds data-driven routing, upgraded stops, and better commuter information.',
    image: cityCouncilImage,
  },
  {
    title: 'Satellite Mission Targets Climate Signals',
    category: 'Science',
    source: 'Science Daily',
    summary: 'A new orbiting sensor is built to track ocean temperatures and atmospheric changes.',
    image: spaceImage,
  },
]

const buildNewsQuery = (interests) => {
  const activeInterests = interests.length > 0 ? interests : ['technology', 'business', 'sports']
  return activeInterests.map((interest) => `"${interest}"`).join(' OR ')
}

const normalizeNewsArticle = (article) => ({
  title: article.title || 'Untitled story',
  category: article.source?.name || 'NewsAPI',
  source: article.source?.name || 'Unknown source',
  summary: article.description || article.content || 'Open the story to read the latest details.',
  image: article.urlToImage || null,
  url: article.url,
  publishedAt: article.publishedAt,
})

const Posts = () => {
  const [interests, setInterests] = useState([])
  const [articles, setArticles] = useState(fallbackArticles)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedInterests = window.localStorage.getItem('newsly_interests')

    if (savedInterests) {
      setInterests(JSON.parse(savedInterests))
    }
  }, [])

  useEffect(() => {
    const fetchPersonalizedNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY

      if (!apiKey) {
        setError('Add VITE_NEWS_API_KEY in .env to load live NewsAPI stories.')
        setArticles(fallbackArticles)
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          q: buildNewsQuery(interests),
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: '30',
          apiKey,
        })

        const response = await fetch(`https://newsapi.org/v2/everything?${params}`)
        const payload = await response.json()

        if (!response.ok || payload.status === 'error') {
          throw new Error(payload.message || 'Unable to fetch news right now.')
        }

        const nextArticles = (payload.articles || [])
          .filter((article) => article.title && article.url)
          .map(normalizeNewsArticle)

        setArticles(nextArticles.length > 0 ? nextArticles : fallbackArticles)
      } catch (requestError) {
        setError(requestError.message)
        setArticles(fallbackArticles)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPersonalizedNews()
  }, [interests])

  const visibleArticles = articles.length > 0 ? articles : fallbackArticles

  return (
    <main className="space_page">
      <section className="space_hero">
        <div>
          <p className="space_kicker">Your Space</p>
          <h1>News tuned to your selected interests</h1>
          <p>
            This page is ready for NewsAPI results filtered by the categories
            saved during onboarding.
          </p>
        </div>

        <div className="space_interest_box">
          <span>Active interests</span>
          <div>
            {(interests.length > 0 ? interests : ['Technology', 'Business', 'Sports']).map(
              (interest) => (
                <span className="space_chip" key={interest}>
                  {interest}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="space_feed_shell" aria-labelledby="space-feed-title">
        <div className="space_feed_header">
          <div>
            <p className="space_feed_label">Personalized Feed</p>
            <h2 id="space-feed-title">Latest for you</h2>
          </div>
          <span>{isLoading ? 'Loading' : `${visibleArticles.length} stories`}</span>
        </div>

        {error ? <p className="space_feed_notice">{error}</p> : null}

        <div className="space_feed" tabIndex="0">
          {visibleArticles.map((article) => (
            <article className="space_card" key={article.title}>
              {article.image ? (
                <img src={article.image} alt="" className="space_image" />
              ) : (
                <div className="space_image space_image_fallback">{article.source}</div>
              )}
              <div className="space_card_body">
                <div className="space_card_meta">
                  <span>{article.category}</span>
                  <span className="post_dot" />
                  <span>{article.source}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <button
                  className="space_read"
                  type="button"
                  onClick={() => article.url && window.open(article.url, '_blank', 'noopener,noreferrer')}
                >
                  Read Story
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Posts
