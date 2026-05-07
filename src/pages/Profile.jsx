import React, { useEffect, useState } from 'react'
import './Profile.css'

const Profile = () => {
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const savedUser = window.localStorage.getItem('newsly_user')
    const savedProfile = window.localStorage.getItem('newsly_profile')

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setEmail(parsedUser.email || '')
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }

    // Clerk + Supabase integration point: replace the reads above with:
    // 1. Clerk useUser() for identity and auth state.
    // 2. Supabase select from profiles where user_id equals Clerk user.id.
  }, [])

  const handleLogout = () => {
    // Clerk integration point: call Clerk signOut(), then route to /login.
    window.localStorage.removeItem('newsly_logged_in')
    window.location.assign('/login')
  }

  return (
    <main className="profile_page">
      <section className="profile_card">
        <div className="profile_header">
          <div className="profile_avatar">
            {(profile?.displayName || email || 'N').slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="profile_kicker">Reader Profile</p>
            <h1 className="profile_title">{profile?.displayName || 'Newsly User'}</h1>
            <p className="profile_email">{email || 'Connect Clerk to show account email'}</p>
          </div>
        </div>

        <div className="profile_section">
          <span>Bio</span>
          <p>{profile?.bio || 'Complete profile creation to add a short reader bio.'}</p>
        </div>

        <div className="profile_section">
          <span>Interests</span>
          <div className="profile_interests">
            {(profile?.interests || []).length > 0 ? (
              profile.interests.map((interest) => (
                <span className="profile_chip" key={interest}>
                  {interest}
                </span>
              ))
            ) : (
              <p>No interests selected yet.</p>
            )}
          </div>
        </div>

        <div className="profile_actions">
          <button
            className="profile_secondary"
            type="button"
            onClick={() => window.location.assign('/interests')}
          >
            Edit Interests
          </button>
          <button
            className="profile_secondary"
            type="button"
            onClick={() => window.location.assign('/your-space')}
          >
            Open Your Space
          </button>
          <button className="profile_logout" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </main>
  )
}

export default Profile
