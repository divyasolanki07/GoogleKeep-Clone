import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import CreateNote from './components/CreateNote/CreateNote';
import NoteCard from './components/NoteCard/NoteCard';
import NoteModal from './components/NoteModal/NoteModal';
import { loadNotes, saveNotes } from './utils/storage';
import './index.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('notes'); // notes, reminders, archive, trash
  const [isGrid, setIsGrid] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Load from local storage on mount
  useEffect(() => {
    setNotes(loadNotes());
    const savedTheme = localStorage.getItem('keepTheme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (notes.length > 0) saveNotes(notes);
  }, [notes]);

  // Apply theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('keepTheme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('keepTheme', 'light');
    }
  }, [isDark]);

  const addNote = (note) => setNotes(prev => [note, ...prev]);

  const updateNote = (id, updates) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  // Filtering Notes
  let filteredNotes = notes.filter(n => {
    if (view === 'trash') return n.deleted === true;
    if (n.deleted) return false;
    if (view === 'archive') return n.archived === true;
    if (view === 'notes') return n.archived !== true;
    return false; // Reminders handled as empty for now
  });

  if (search) {
    const s = search.toLowerCase();
    filteredNotes = filteredNotes.filter(n => 
      n.title?.toLowerCase().includes(s) || n.text?.toLowerCase().includes(s)
    );
  }

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const otherNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="app-layout">
      <Header 
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        search={search} setSearch={setSearch}
        isGrid={isGrid} setIsGrid={setIsGrid}
        isDark={isDark} toggleDark={() => setIsDark(!isDark)}
      />
      
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} view={view} setView={setView} />
        
        <main className="main-content">
          {(view === 'notes' && !search) && <CreateNote onAdd={addNote} />}

          {/* Search Header */}
          {search && <div className="notes-section-label">Search results</div>}

          {/* Extra generic Empty States */}
          {filteredNotes.length === 0 && (
             <div className="empty-state">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                  {view === 'archive' && <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm6-5.5l2.5-2.5 1.41 1.41L12 15.33 9.09 12.41 10.5 11l1.5 1.5z"/>}
                  {view === 'trash' && <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"/>}
                  {(view === 'notes' || search) && <path d="M9 21c0 .5-.4 1-1 1s-1-.5-1-1v-1H5c-.5 0-1-.5-1-1s.5-1 1-1h2v-4H5c-.5 0-1-.5-1-1s.5-1 1-1h2v-4H5c-.5 0-1-.5-1-1s.5-1 1-1h2V6c0-.5.4-1 1-1s1 .5 1 1v1h4V6c0-.5.4-1 1-1s1 .5 1 1v1h2c.5 0 1 .5 1 1s-.5 1-1 1h-2v4h2c.5 0 1 .5 1 1s-.5 1-1 1h-2v4h2c.5 0 1 .5 1 1s-.5 1-1 1h-2v1c0 .5-.4 1-1 1s-1-.5-1-1v-1H9v1zm0-3h4v-4H9v4zm0-6h4V8H9v4z"/>}
                </svg>
                <p>
                  {view === 'archive' ? 'Your archived notes appear here' : 
                   view === 'trash' ? 'No notes in Trash' : 
                   search ? 'No matching results' : 'Notes you add appear here'}
                </p>
             </div>
          )}

          {/* Pinned Notes Grid */}
          {pinnedNotes.length > 0 && (
            <>
              <div className="notes-section-label">Pinned</div>
              <div className={`notes-grid ${!isGrid ? 'list-view' : ''}`}>
                {pinnedNotes.map(n => (
                  <NoteCard key={n.id} note={n} onUpdate={updateNote} onClick={setSelectedNote} />
                ))}
              </div>
              {otherNotes.length > 0 && <div className="notes-section-label">Others</div>}
            </>
          )}

          {/* Unpinned Notes Grid */}
          {otherNotes.length > 0 && (
            <div className={`notes-grid ${!isGrid ? 'list-view' : ''}`}>
              {otherNotes.map(n => (
                <NoteCard key={n.id} note={n} onUpdate={updateNote} onClick={setSelectedNote} />
              ))}
            </div>
          )}
        </main>
      </div>

      {selectedNote && (
        <NoteModal 
          note={selectedNote} 
          onClose={() => setSelectedNote(null)} 
          onUpdate={updateNote} 
        />
      )}
    </div>
  );
}

export default App;
