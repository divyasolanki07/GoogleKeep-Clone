import './Header.css';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.49 19l-5.73-5.73A7 7 0 1 0 13 15.51L18.73 21 20.49 19zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2v-2H2v2zm18 0h2v-2h-2v2zM11 2v2h2V2h-2zm0 18v2h2v-2h-2zM5.99 4.58l-1.42 1.42 1.41 1.41 1.42-1.42L5.99 4.58zm12.03 12.01-1.42 1.42 1.41 1.41 1.42-1.42-1.41-1.41zM4.57 17.99l1.42 1.42 1.41-1.41-1.42-1.42-1.41 1.41zM18.58 6l-1.41 1.41 1.42 1.42 1.41-1.42L18.58 6z"/>
  </svg>
);

export default function Header({ sidebarOpen, setSidebarOpen, search, setSearch, isGrid, setIsGrid, isDark, toggleDark }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar">
          <MenuIcon />
        </button>
        <div className="header-logo">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="#FFF"/>
            <rect x="8" y="8" width="13" height="13" rx="2" fill="#4285F4"/>
            <rect x="8" y="27" width="13" height="13" rx="2" fill="#EA4335"/>
            <rect x="27" y="8" width="13" height="13" rx="2" fill="#FBBC04"/>
            <rect x="27" y="27" width="13" height="13" rx="2" fill="#34A853"/>
          </svg>
          <span>Keep</span>
        </div>
      </div>

      <div className="header-search">
        <span className="search-icon"><SearchIcon /></span>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search notes"
        />
        {search && (
          <button className="search-clear icon-btn" onClick={() => setSearch('')} aria-label="Clear search">×</button>
        )}
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={() => setIsGrid(g => !g)} aria-label="Toggle view">
          {isGrid ? <ListIcon /> : <GridIcon />}
        </button>
        <button className="icon-btn" onClick={toggleDark} aria-label="Toggle dark mode">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="avatar">R</div>
      </div>
    </header>
  );
}
