import React, { useEffect, useState } from 'react'
import './Navbar.css'
import sunIcon from '../assets/sun-svgrepo-com.svg'
import moonIcon from '../assets/moon-stars-svgrepo-com.svg'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const saved = window.localStorage.getItem('theme')
  if (saved) {
    return saved === 'dark'
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const Navbar = ({ currentPath, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [isDark])

  const themeIcon = isDark ? sunIcon : moonIcon
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <div className="navbar">
        <h2 className='page_title'>
            Newsly
        </h2>

        <button
          className="hamburger"
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="main-nav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="hamburger_bar" />
          <span className="hamburger_bar" />
          <span className="hamburger_bar" />
        </button>

        <ul id="main-nav" className={`nav_list ${menuOpen ? 'is_open' : ''}`}>
            <li className={`nav_items ${currentPath === '/' ? 'is_active' : ''}`}>
              <button type="button" onClick={() => onNavigate('/')}>
                Home
              </button>
            </li>
            <li className={`nav_items ${currentPath === '/feed' ? 'is_active' : ''}`}>
              <button type="button" onClick={() => onNavigate('/feed')}>
                Feed
              </button>
            </li>
            <li className={`nav_items ${currentPath === '/your-space' || currentPath === '/post' ? 'is_active' : ''}`}>
              <button type="button" onClick={() => onNavigate('/your-space')}>
                Your Space
              </button>
            </li>
            <li className={`nav_items ${currentPath === '/whatsnew' ? 'is_active' : ''}`}>
              <button type="button" onClick={() => onNavigate('/whatsnew')}>
                What's New
              </button>
            </li>
        </ul>

        <div className="nav_actions">
          <button
            className="theme_toggle"
            type="button"
            aria-pressed={isDark}
            aria-label={themeLabel}
            onClick={() => setIsDark((prev) => !prev)}
          >
            <img src={themeIcon} alt="" className="theme_icon" />
          </button>
          <button className="login_btn" type="button" onClick={() => onNavigate('/login')}>
            Login
          </button>
        </div>
    </div>
  )
}
