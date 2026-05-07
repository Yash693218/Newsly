import React, { useEffect, useState } from 'react'
import './ProfileSetup.css'

const ProfileSetup = () => {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState([])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('newsly_user')
    const savedInterests = window.localStorage.getItem('newsly_interests')

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setDisplayName(parsedUser.email?.split('@')[0] || '')
    }

    if (savedInterests) {
      setInterests(JSON.parse(savedInterests))
    }
  }, [])

  const handleCreateProfile = (event) => {
    event.preventDefault()

    const profile = {
      displayName,
      bio,
      interests,
    }

    // Supabase integration point: save this profile against auth.user.id from Clerk.
    // Suggested table: profiles { user_id, display_name, bio, interests, created_at }.
    window.localStorage.setItem('newsly_profile', JSON.stringify(profile))
    window.location.assign('/profile')
  }

  return (
    <main className="setup_page">
      <section className="setup_card">
        <div className="setup_header">
          <p className="setup_kicker">Profile Creation</p>
          <h1>Create your reader profile</h1>
          <p>
            This becomes the profile record you will later store in Supabase
            after Clerk authentication completes.
          </p>
        </div>

        <form className="setup_form" onSubmit={handleCreateProfile}>
          <label>
            Display name
            <input
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Short bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="What kind of news do you follow?"
              rows="4"
            />
          </label>

          <div className="setup_interests">
            <span>Selected interests</span>
            <div>
              {interests.map((interest) => (
                <span className="setup_chip" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <button className="setup_submit" type="submit">
            Create Profile
          </button>
        </form>
      </section>
    </main>
  )
}

export default ProfileSetup
