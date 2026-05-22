import './NoteCard.css';

const PinIcon = ({ isPinned }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isPinned ? "0" : "2"}>
    {isPinned ? (
      <path d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z" />
    ) : (
      <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
    )}
  </svg>
);

const PaletteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const ArchiveSmallIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm6-5.5l2.5-2.5 1.41 1.41L12 15.33 9.09 12.41 10.5 11l1.5 1.5z"/>
  </svg>
);

const TrashSmallIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"/>
  </svg>
);

const RestoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

const COLORS = ['default', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'darkblue', 'purple', 'pink', 'brown', 'grey'];

export default function NoteCard({ note, onUpdate, onClick }) {
  const handlePin = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { pinned: !note.pinned, archived: false });
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { archived: !note.archived, pinned: false });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { deleted: true });
  };

  const handleRestore = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { deleted: false });
  };

  const handleDeleteForever = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { deleteForever: true });
  };

  const changeColor = (e, color) => {
    e.stopPropagation();
    onUpdate(note.id, { color });
  };

  const cardStyle = {
    backgroundColor: `var(--note-${note.color})`,
    borderColor: note.color === 'default' ? 'var(--color-border)' : `var(--note-${note.color})` // No border for colored notes internally!
  };

  return (
    <div className="note-card" style={cardStyle} onClick={() => onClick(note)}>
      
      {note.title && <div className="note-title">{note.title}</div>}
      {note.text && <div className="note-text">{note.text}</div>}
      
      {!note.deleted && (
        <button 
          className={`pin-btn ${note.pinned ? 'active' : ''}`} 
          onClick={handlePin}
          title={note.pinned ? "Unpin note" : "Pin note"}
        >
          <PinIcon isPinned={note.pinned} />
        </button>
      )}

      <div className="note-card-tools" onClick={e => e.stopPropagation()}>
        {note.deleted ? (
          <>
            <button className="tool-btn" onClick={handleDeleteForever} title="Delete forever"><TrashSmallIcon/></button>
            <button className="tool-btn" onClick={handleRestore} title="Restore"><RestoreIcon/></button>
          </>
        ) : (
          <>
            <div className="color-picker-container">
              <button className="tool-btn" title="Background options"><PaletteIcon/></button>
              <div className="color-palette">
                {COLORS.map(c => (
                  <button 
                    key={c}
                    className={`color-swatch ${note.color === c ? 'active' : ''}`}
                    style={{ backgroundColor: `var(--note-${c})` }}
                    onClick={(e) => changeColor(e, c)}
                    title={c}
                  />
                ))}
              </div>
            </div>
            <button className="tool-btn" onClick={handleArchive} title={note.archived ? "Unarchive" : "Archive"}>
              {note.archived ? <RestoreIcon /> : <ArchiveSmallIcon/>}
            </button>
            <button className="tool-btn" onClick={handleDelete} title="Delete"><TrashSmallIcon/></button>
          </>
        )}
      </div>
    </div>
  );
}
