import React, { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Posts from './pages/Posts'
import Whatsnew from './pages/Whatsnew'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import InterestSelection from './pages/InterestSelection'
import ProfileSetup from './pages/ProfileSetup'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath) => {
    if (nextPath === path) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  const renderPage = () => {
    switch (path) {
      case '/feed':
        return <Feed />
      case '/post':
      case '/your-space':
        return <Posts />
      case "/whatsnew":
        return <Whatsnew />
      case '/login':
        return <Login onNavigate={navigate} />
      case '/signup':
        return <Signup onNavigate={navigate} />
      case '/interests':
        return <InterestSelection onNavigate={navigate} />
      case '/profile-setup':
        return <ProfileSetup onNavigate={navigate} />
      case '/profile':
        return <Profile onNavigate={navigate} />
      default:
        return <Home onAuthNavigate={navigate} />
    }
  }

  return (
    <>
      <Navbar currentPath={path} onNavigate={navigate} />
      {renderPage()}
    </>
  )
}

export default App
