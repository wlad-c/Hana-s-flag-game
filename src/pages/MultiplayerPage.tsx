import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import "./MultiplayerPage.css";

/**
 * Online multiplayer hub. First game: Flag Bingo. New modes land here as
 * extra cards so the landing page stays one "Play together" entry point.
 */
export default function MultiplayerPage() {
  const navigate = useNavigate();

  return (
    <div className="sticker multiplayer">
      <main className="sticker__main multiplayer__main">
        <div className="multiplayer__intro">
          <h1 className="multiplayer__title">
            Play <span>together</span>
          </h1>
          <p className="multiplayer__lede">
            Online flag games anyone on the site can join. Open a game and you
            are in the shared lobby — no room codes, no account required.
          </p>
        </div>

        <div className="sticker__cards multiplayer__cards">
          <button
            type="button"
            className="card-sticker card-sticker--b card-sticker--secondary"
            onClick={() => navigate("/multiplayer/bingo")}
          >
            <h2 className="card-sticker__title">Flag Bingo</h2>
            <p className="card-sticker__sub">
              Everyone gets a random 5×5 board of country flags. The system
              draws one flag at a time when all players are ready. First to
              five in a row wins.
            </p>
            <span className="card-sticker__cta card-sticker__cta--coral">PLAY →</span>
          </button>
        </div>
      </main>
    </div>
  );
}
