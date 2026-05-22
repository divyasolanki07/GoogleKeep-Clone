import './Sidebar.css';

const NavItem = ({ icon, label, isActive, onClick, isCollapsed }) => (
  <div 
    className={`nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
    onClick={onClick}
    title={isCollapsed ? label : ''}
  >
    <div className="nav-icon">{icon}</div>
    {!isCollapsed && <span className="nav-label">{label}</span>}
  </div>
);

// Icons
const NotesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 21c0 .5-.4 1-1 1s-1-.5-1-1v-1H5c-.5 0-1-.5-1-1s.5-1 1-1h2v-4H5c-.5 0-1-.5-1-1s.5-1 1-1h2v-4H5c-.5 0-1-.5-1-1s.5-1 1-1h2V6c0-.5.4-1 1-1s1 .5 1 1v1h4V6c0-.5.4-1 1-1s1 .5 1 1v1h2c.5 0 1 .5 1 1s-.5 1-1 1h-2v4h2c.5 0 1 .5 1 1s-.5 1-1 1h-2v4h2c.5 0 1 .5 1 1s-.5 1-1 1h-2v1c0 .5-.4 1-1 1s-1-.5-1-1v-1H9v1zm0-3h4v-4H9v4zm0-6h4V8H9v4z"/>
  </svg>
);

const RemindersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const ArchiveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm6-5.5l2.5-2.5 1.41 1.41L12 15.33 9.09 12.41 10.5 11l1.5 1.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"/>
  </svg>
);

export default function Sidebar({ isOpen, view, setView }) {
  const items = [
    { id: 'notes', label: 'Notes', icon: <NotesIcon /> },
    { id: 'reminders', label: 'Reminders', icon: <RemindersIcon /> },
    { id: 'archive', label: 'Archive', icon: <ArchiveIcon /> },
    { id: 'trash', label: 'Trash', icon: <TrashIcon /> },
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {items.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={view === item.id}
            onClick={() => setView(item.id)}
            isCollapsed={!isOpen}
          />
        ))}
      </nav>
    </aside>
  );
}
