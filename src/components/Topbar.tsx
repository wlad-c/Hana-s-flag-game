import { UiIcon } from "./UiIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { MuteToggle } from "./MuteToggle";
import { ShareLinkButton } from "./ShareLinkButton";
import { useNavigationGuard } from "../context/NavigationGuardContext";

type GameNavState = {
  codes?: string[];
  quiz?: { flagCount: number };
  groupGame?: object;
  subnational?: object;
} | null;

/**
 * Site-wide top bar — replaces the old floating .global-theme-toggle +
 * .game-nav + .learn-topbar widgets with a single shared component
 * rendered at the App level. Sticks to the top of the viewport on
 * every page so the theme toggle and Home link are always reachable.
 *
 * The Home link is hidden on the landing page (`/`) to avoid the
 * "Home → Home" loop.
 */
export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerGuard } = useNavigationGuard();
  const isHome = location.pathname === "/";
  const isGame = location.pathname === "/game";
  const isLearn = location.pathname.startsWith("/learn");
  const isMultiplayer = location.pathname.startsWith("/multiplayer");

  const doNavigateHome = () => navigate("/");

  const doBackToGameSelection = () => {
    const navState = location.state as GameNavState;
    if (navState?.quiz) {
      navigate("/", { state: { openModal: "quiz" } });
    } else if (navState?.groupGame || navState?.subnational || !navState?.codes) {
      navigate("/", { state: { openModal: "flagMaster" } });
    } else {
      navigate("/");
    }
  };

  const handleHomeClick = () => {
    if (!triggerGuard(doNavigateHome)) doNavigateHome();
  };

  const handleBackToGameSelection = () => {
    if (!triggerGuard(doBackToGameSelection)) doBackToGameSelection();
  };

  return (
    <header className="site-topbar">
      <div className="site-topbar__left">
        {isHome ? (
          <span className="site-topbar__brand">Hana&apos;s Flag Game</span>
        ) : (
          <button
            type="button"
            className="site-topbar__home"
            onClick={handleHomeClick}
            aria-label="Home"
            title="Home"
          >
            <span className="site-topbar__btn-icon" aria-hidden="true"><UiIcon name="home" /></span>
            <span className="site-topbar__btn-label">Home</span>
          </button>
        )}
        {isGame && (
          <button
            type="button"
            className="site-topbar__back"
            onClick={handleBackToGameSelection}
            aria-label="Game selection"
            title="Game selection"
          >
            <span className="site-topbar__btn-icon" aria-hidden="true"><UiIcon name="back" /></span>
            <span className="site-topbar__btn-label">Game selection</span>
          </button>
        )}
        <div id="site-topbar-left-slot" className="site-topbar__left-slot" />
      </div>
      <div className="site-topbar__center" id="site-topbar-slot" />
      <div className="site-topbar__right">
        {(isGame || isLearn || isMultiplayer) && <ShareLinkButton />}
        <MuteToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}

/** Stable id used by descendant pages (e.g. FlagGamePage) to portal
 *  content into the topbar's centre slot. */
export const SITE_TOPBAR_SLOT_ID = "site-topbar-slot";
export const SITE_TOPBAR_LEFT_SLOT_ID = "site-topbar-left-slot";
