import React, { useState } from 'react'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const saved = window.localStorage.getItem('newsly_user')
    if (!saved) {
      setError('No account found. Please sign up first.')
      return
    }

    const parsed = JSON.parse(saved)
    if (parsed.email === email && parsed.password === password) {
      // Clerk integration point: after Clerk signs the user in, route them to
      // /interests if they do not have interests saved in Supabase yet.
      window.localStorage.setItem('newsly_logged_in', 'true')
      window.location.assign('/interests')
      return
    }

    setError('Invalid email or password.')
  }

  return (
    <div className="auth_page">
      <div className="auth_card">
        <h1 className="auth_title">Login</h1>
        <p className="auth_subtitle">Welcome back! Please enter your details.</p>
        <form className="auth_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button className="auth_primary" type="submit">Login</button>
        </form>
        {error ? <p className="auth_error">{error}</p> : null}
        <p className="auth_note">Don't have an account?</p>
        <button
          className="auth_secondary"
          type="button"
          onClick={() => window.location.assign('/signup')}
        >
          Create an Account
        </button>
      </div>
    </div>
  )
}

export default Login
