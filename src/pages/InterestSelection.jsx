import React, { useState } from 'react'
import './InterestSelection.css'

const interestOptions = [
  'Politics',
  'Technology',
  'Business',
  'Sports',
  'Science',
  'Health',
  'Entertainment',
  'Finance',
  'World',
  'Startups',
]

const InterestSelection = () => {
  const [selected, setSelected] = useState(['Technology', 'Business'])
  const [error, setError] = useState('')

  const toggleInterest = (interest) => {
    setError('')
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    )
  }

  const handleContinue = () => {
    if (selected.length < 3) {
      setError('Select at least three interests to personalize your feed.')
      return
    }

    // Supabase integration point: upsert these interests for the Clerk user id.
    // Example table shape: user_interests { user_id, interests, updated_at }.
    window.localStorage.setItem('newsly_interests', JSON.stringify(selected))
    window.location.assign('/profile-setup')
  }

  return (
    <main className="interest_page">
      <section className="interest_panel">
        <div className="interest_intro">
          <p className="interest_kicker">Personalize Newsly</p>
          <h1>Choose the stories you want in Your Space</h1>
          <p>
            These categories will drive the NewsAPI query and the saved profile
            preferences in Supabase.
          </p>
        </div>

        <div className="interest_grid">
          {interestOptions.map((interest) => {
            const isSelected = selected.includes(interest)
            return (
              <button
                className={`interest_chip ${isSelected ? 'is_selected' : ''}`}
                key={interest}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            )
          })}
        </div>

        <div className="interest_footer">
          <p>{selected.length} selected</p>
          <button className="interest_continue" type="button" onClick={handleContinue}>
            Continue
          </button>
        </div>
        {error ? <p className="interest_error">{error}</p> : null}
      </section>
    </main>
  )
}

export default InterestSelection
