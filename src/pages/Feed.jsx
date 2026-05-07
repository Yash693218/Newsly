import React, { useEffect, useState } from 'react'
import './Feed.css'
import marketRally from '../assets/market_rally.jpg'
import satelliteImage from '../assets/sapce_mission.jpg'
import championshipImage from '../assets/championship_image.jpg'
import streamingPlatform from '../assets/streaming_platform.jpg'
import healthcareImage from '../assets/healthcare_image.jpg'
import cityCouncil from '../assets/city_council.jpg'

const fallbackArticles = [
  {
    title: 'Markets Rally on Fresh Economic Data',
    image: marketRally,
    source: 'Market Desk',
    summary: 'Markets move higher as investors react to fresh economic numbers.',
    url: '',
    publishedAt: '',
  },
  {
    title: 'New Satellite Mission Targets Climate Insights',
    image: satelliteImage,
    source: 'Science Daily',
    summary: 'A new mission aims to collect better climate and ocean data.',
    url: '',
    publishedAt: '',
  },
  {
    title: 'Championship Preview: Rivalry Reignites',
    image: championshipImage,
    source: 'Sports Wire',
    summary: 'A major rivalry returns with a trophy and momentum on the line.',
    url: '',
    publishedAt: '',
  },
  {
    title: 'Streaming Platforms Pivot to Live News',
    image: streamingPlatform,
    source: 'Culture Brief',
    summary: 'Streaming platforms are expanding into live news and daily coverage.',
    url: '',
    publishedAt: '',
  },
  {
    title: 'Healthcare Startups See Record Funding',
    image: healthcareImage,
    source: 'Health Brief',
    summary: 'Healthcare startups attract new funding for diagnostics and patient tools.',
    url: '',
    publishedAt: '',
  },
  {
    title: 'City Council Approves Smart Transit Plan',
    image: cityCouncil,
    source: 'Civic Today',
    summary: 'A smart transit plan brings new commuter data and upgraded routes.',
    url: '',
    publishedAt: '',
  },
]

const feedFilters = ['All', 'Politics', 'Technology', 'Business', 'Sports', 'Culture', 'Science']

const normalizeFeedArticle = (article) => ({
  title: article.title || 'Untitled story',
  image: article.urlToImage || null,
  source: article.source?.name || 'Unknown source',
  summary: article.description || article.content || 'Open the story to read the latest details.',
  url: article.url || '',
  publishedAt: article.publishedAt || '',
})

const formatPublishedTime = (publishedAt) => {
  if (!publishedAt) return 'Latest'

  const publishedTime = new Date(publishedAt).getTime()
  const diffInMinutes = Math.max(1, Math.round((Date.now() - publishedTime) / 60000))

  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.round(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`

  return `${Math.round(diffInHours / 24)}d ago`
}

const Feed = () => {
  const [articles, setArticles] = useState(fallbackArticles)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchFeedArticles = async (query = 'latest news') => {
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
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: '24',
        apiKey,
      })

      const response = await fetch(`https://newsapi.org/v2/everything?${params}`)
      const payload = await response.json()

      if (!response.ok || payload.status === 'error') {
        throw new Error(payload.message || 'Unable to fetch feed articles right now.')
      }

      const nextArticles = (payload.articles || [])
        .filter((article) => article.title && article.url)
        .map(normalizeFeedArticle)

      setArticles(nextArticles.length > 0 ? nextArticles : fallbackArticles)
    } catch (requestError) {
      setError(requestError.message)
      setArticles(fallbackArticles)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedArticles()
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    const nextQuery = searchTerm.trim() || 'latest news'
    setActiveFilter('All')
    fetchFeedArticles(nextQuery)
  }

  const handleFilter = (filter) => {
    setActiveFilter(filter)
    setSearchTerm(filter === 'All' ? '' : filter)
    fetchFeedArticles(filter === 'All' ? 'latest news' : filter)
  }

  return (
    <div className="feed_page">
      <section className="feed_header">
        <div>
          <p className="feed_kicker">Live Feed</p>
          <h1 className="feed_title">Today&apos;s Headlines, Curated for You</h1>
          <p className="feed_subtitle">
            Track the latest stories, filter by category, and search any topic
            you want to follow.
          </p>
        </div>
        <form className="feed_search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search cricket, AI, stocks..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="primary_btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Searching' : 'Search'}
          </button>
        </form>
      </section>

      <section className="feed_filters" aria-label="News filters">
        {feedFilters.map((item) => (
          <button
            key={item}
            className={`chip_btn ${activeFilter === item ? 'is_active' : ''}`}
            type="button"
            onClick={() => handleFilter(item)}
          >
            {item}
          </button>
        ))}
      </section>

      {error ? <p className="feed_notice">{error}</p> : null}

      <section className="feed_layout">
        <div className="feed_grid">
          {articles.map((item, index) => (
            <article className="feed_card" key={`${item.title}-${index}`}>
              {item.image ? (
                <img className="feed_card_image" src={item.image} alt="" />
              ) : (
                <div className="feed_card_image feed_card_image_fallback">{item.source}</div>
              )}
              <div className="feed_card_body">
                <span className="feed_tag">{item.source}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="feed_meta">
                  <span>{formatPublishedTime(item.publishedAt)}</span>
                  <span className="post_dot" />
                  <button
                    className="feed_read_link"
                    type="button"
                    onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}
                  >
                    Read article
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="feed_sidebar">
          <div className="sidebar_block">
            <h3>Trending Now</h3>
            <ul>
              <li>AI policy debate heats up</li>
              <li>Global energy prices shift</li>
              <li>New VR headset announced</li>
              <li>Champions League highlights</li>
            </ul>
          </div>

          <div className="sidebar_block newsletter">
            <h3>Daily Briefing</h3>
            <p>Get the top five stories delivered every morning.</p>
            <div className="newsletter_form">
              <input type="email" placeholder="Email address" />
              <button className="primary_btn" type="button">Subscribe</button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Feed
