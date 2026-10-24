import { UiIcon } from "../components/UiIcon";
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLeaderboard } from '../context/LeaderboardContext'
import { FlagConfetti } from '../components/FlagConfetti'
import { Mascot } from '../components/Mascot'
import { CountryPickerModal } from '../components/CountryPickerModal'
import { QuickQuizSetupModal, type QuickQuizConfig } from '../components/QuickQuizSetupModal'
import { AllFlagsSetupModal, type AllFlagsStart } from '../components/AllFlagsSetupModal'
import { HeroCarousel } from '../components/HeroCharacters'
import { InstallAppButton } from '../components/InstallAppButton'
import { loadStoredSelection } from '../lib/countrySelection'
import { gameConfigToParams, type GameConfig } from '../lib/gameShareUrl'
import './LandingPage.css'

const TITLE_LETTERS: { ch: string; color: string }[] = [
  { ch: 'G', color: 'c1' },
  { ch: 'u', color: 'c2' },
  { ch: 'e', color: 'c3' },
  { ch: 's', color: 'c4' },
  { ch: 's', color: 'c1' },
]

export default function LandingPage() {
  const { openLeaderboard } = useLeaderboard()
  const navigate = useNavigate()
  const location = useLocation()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [flagMasterOpen, setFlagMasterOpen] = useState(false)

  useEffect(() => {
    const state = location.state as { openModal?: string } | null
    if (state?.openModal === 'quiz') setQuizOpen(true)
    else if (state?.openModal === 'flagMaster') setFlagMasterOpen(true)
    else if (state?.openModal === 'picker') setPickerOpen(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Navigate to the game with the mode reflected in the URL (so the link is
  // shareable) AND in router state (so in-app navigation is unaffected).
  const startGame = (config: GameConfig) => {
    const qs = gameConfigToParams(config).toString()
    navigate(`/game?${qs}`, { state: config })
  }

  const playWith = (codes: string[]) => {
    setPickerOpen(false)
    startGame({ codes })
  }

  const playQuiz = (config: QuickQuizConfig) => {
    setQuizOpen(false)
    startGame({ quiz: { flagCount: config.flagCount } })
  }

  const playFlagMaster = (start: AllFlagsStart) => {
    setFlagMasterOpen(false)
    if (start.type === 'all195') {
      startGame({ symbol: start.symbol })
    } else if (start.type === 'historical') {
      startGame({ historical: { ask: start.ask, questionCount: start.questionCount } })
    } else if (start.type === 'similarity') {
      startGame({
        groupGame: {
          groupCodes: start.groupCodes,
          groupLabel: start.groupLabel,
          hardcore: start.hardcore,
          modeLabel: 'By Similarity',
        },
      })
    } else if (start.type === 'continent') {
      startGame({
        groupGame: {
          groupCodes: start.groupCodes,
          groupLabel: start.groupLabel,
          hardcore: false,
          modeLabel: 'By Continent',
        },
        symbol: start.symbol,
      })
    } else if (start.type === 'subregion') {
      startGame({
        groupGame: {
          groupCodes: start.groupCodes,
          groupLabel: start.groupLabel,
          hardcore: false,
          modeLabel: 'By Sub-Continent',
        },
        symbol: start.symbol,
      })
    } else if (start.type === 'subnational') {
      startGame({
        subnational: {
          countryCode: start.countryCode,
          countryName: start.countryName,
          includeDivisions: start.includeDivisions,
          includeCapitals: start.includeCapitals,
        },
      })
    } else if (start.type === 'disputed') {
      startGame({ disputedTerritories: true })
    }
  }

  return (
    <div className="sticker">
      <FlagConfetti />

      <main className="sticker__main">
        <div className="sticker__titlewrap">
          <h1 className="sticker__title">
            {TITLE_LETTERS.map((l, i) => (
              <span key={i} className={`sticker__ch sticker__ch--${l.color}`}>
                {l.ch}
              </span>
            ))}
            <span className="sticker__the">the</span>
            <span className="sticker__ch sticker__ch--c2">F</span>
            <span className="sticker__ch sticker__ch--c3">l</span>
            <span className="sticker__ch sticker__ch--c4">a</span>
            <span className="sticker__ch sticker__ch--c1">g</span>
            <span className="sticker__bang">!</span>
          </h1>
          <div className="sticker__mascot">
            <Mascot size={110} />
          </div>
          <div className="sticker__stars" aria-hidden="true">
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>

        {/* Hero card — integrates the rotating poster with the Hana's Game
            CTA so they read as a single visual unit. Clicking the card
            starts the game with the stored selection; the gear in the
            top-right opens the picker so users can edit their list. */}
        <div
          className="hero-card"
          role="button"
          tabIndex={0}
          aria-label="Play Hana's Game"
          onClick={() => playWith(loadStoredSelection().codes)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              playWith(loadStoredSelection().codes)
            }
          }}
        >
          <button
            type="button"
            className="hero-card__settings"
            aria-label="Edit country list"
            onClick={(e) => {
              e.stopPropagation()
              setPickerOpen(true)
            }}
          >
            <UiIcon name="settings" />
          </button>
          <HeroCarousel className="hero-card__poster" />
          <div className="hero-card__content">
            <h2 className="hero-card__title">Hana&rsquo;s Game</h2>
            <p className="hero-card__desc">
              Build your own list of flags to practise. Pick the countries you
              already know the flag and as you learn about new countries, just
              add them to your list to test your memory!
            </p>
            <span className="hero-card__cta card-sticker__cta card-sticker__cta--sky">PLAY!</span>
          </div>
        </div>

        <div className="sticker__cards">
          {/* Learn mode — no-stakes sandbox, listed first because it's the
              friendliest entry point for new players. */}
          <button
            type="button"
            className="card-sticker card-sticker--d card-sticker--secondary"
            onClick={() => navigate('/learn')}
          >
            <h2 className="card-sticker__title">Learn your flags</h2>
            <p className="card-sticker__sub">
              Hover or click any country on the world map to see its flag.
              No clock, no score — just explore at your own pace.
            </p>
            <span className="card-sticker__cta card-sticker__cta--pink">EXPLORE →</span>
          </button>

          {/* Quick Quiz — difficulty mode only. */}
          <button
            type="button"
            className="card-sticker card-sticker--c card-sticker--secondary"
            onClick={() => setQuizOpen(true)}
          >
            <h2 className="card-sticker__title">Quick Quiz</h2>
            <p className="card-sticker__sub">
              Pick 5, 10, 20, or 30 flags from the full 195. The number of
              answer choices matches your flag count — simple as that.
            </p>
            <span className="card-sticker__cta card-sticker__cta--mustard">SET UP →</span>
          </button>

          {/* Flag Master — all game modes. */}
          <button
            type="button"
            className="card-sticker card-sticker--a card-sticker--secondary"
            onClick={() => setFlagMasterOpen(true)}
          >
            <h2 className="card-sticker__title">Flag Master</h2>
            <p className="card-sticker__sub">
              All 195 flags — or the same modes played on coats of arms,
              passports, football crests and the flags countries used to fly.
            </p>
            <span className="card-sticker__cta card-sticker__cta--lime">PLAY →</span>
          </button>
        </div>

        {/* Multiplayer — its own home-page section so Flag Bingo is easy to
            find (not buried under a generic "Play together" label). */}
        <section className="sticker__multiplayer" aria-labelledby="home-multiplayer-title">
          <div className="sticker__multiplayer-heading">
            <h2 id="home-multiplayer-title" className="sticker__multiplayer-title">
              Multiplayer
            </h2>
            <p className="sticker__multiplayer-lede">
              Play live with anyone on the site — create a room, share the code,
              and go.
            </p>
          </div>
          <button
            type="button"
            className="card-sticker card-sticker--b card-sticker--secondary card-sticker--bingo"
            onClick={() => navigate('/multiplayer/bingo')}
          >
            <h3 className="card-sticker__title">Flag Bingo</h3>
            <p className="card-sticker__sub">
              Everyone gets a random 5×5 board of country flags. When all players
              are ready, one flag is drawn. First to five in a row wins.
            </p>
            <span className="card-sticker__cta card-sticker__cta--sky">PLAY BINGO →</span>
          </button>
        </section>

        <button
          type="button"
          className="sticker__leaderboard"
          onClick={() => openLeaderboard()}
        >
          <UiIcon name="trophy" /> Leaderboard
        </button>

        {/* Renders itself only when an install path is available on this
            platform (Chrome/Edge/Android install prompt or Safari Share
            menu). Hidden once the app is already launched standalone. */}
        <InstallAppButton />
      </main>

      <CountryPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onConfirm={playWith}
      />

      <QuickQuizSetupModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onStart={playQuiz}
      />

      <AllFlagsSetupModal
        open={flagMasterOpen}
        onClose={() => setFlagMasterOpen(false)}
        onStart={playFlagMaster}
      />
    </div>
  )
}
