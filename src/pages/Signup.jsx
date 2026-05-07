import React, { useState } from 'react'
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')

    const payload = { email, password }
    // Clerk integration point: replace this temporary localStorage signup with
    // Clerk's signUp flow, then create/read the matching Supabase user record.
    window.localStorage.setItem('newsly_user', JSON.stringify(payload))
    setMessage('Account created. Choose your interests next.')
    window.setTimeout(() => window.location.assign('/interests'), 600)
  }

  return (
    <div className="auth_page">
      <div className="auth_card">
        <h1 className="auth_title">Sign Up</h1>
        <p className="auth_subtitle">Create a Newsly account in seconds.</p>
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
          <button className="auth_primary" type="submit">Create Account</button>
        </form>
        {message ? <p className="auth_success">{message}</p> : null}
        <p className="auth_note">Already have an account? Log in from the navbar.</p>
      </div>
    </div>
  )
}

export default Signup
