import { useState, useRef, useEffect } from 'react';
import './CreateNote.css';

const BrushIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a1.49 1.49 0 0 0-2.12 0L9 11.54l3.46 3.46 8.25-8.25c.59-.58.59-1.53 0-2.12z"/>
  </svg>
);

const ImagePickerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

const CheckBoxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export default function CreateNote({ onAdd }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const closeNote = () => {
    if (title.trim() || text.trim()) {
      onAdd({
        id: Date.now().toString(),
        title: title.trim(),
        text: text.trim(),
        color: 'default',
        pinned: false,
        archived: false,
        deleted: false,
        createdAt: new Date().toISOString()
      });
    }
    setTitle('');
    setText('');
    setIsExpanded(false);
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isExpanded) closeNote();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div className="create-note-container">
      <div className={`create-note-box ${isExpanded ? 'expanded' : ''}`} ref={containerRef}>
        
        {isExpanded && (
          <input
            className="create-note-title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        )}
        
        <div className="create-note-input-row" onClick={() => setIsExpanded(true)}>
          <textarea
            ref={textRef}
            className="create-note-text"
            placeholder={isExpanded ? "Take a note..." : "Take a note..."}
            value={text}
            onChange={e => setText(e.target.value)}
            rows={isExpanded ? 1 : 1}
          />
          {!isExpanded && (
            <div className="create-note-icons-compact">
              <button className="icon-btn tooltip" data-tip="New list" aria-label="New list"><CheckBoxIcon/></button>
              <button className="icon-btn tooltip" data-tip="New note with drawing" aria-label="New drawing"><BrushIcon/></button>
              <button className="icon-btn tooltip" data-tip="New note with image" aria-label="New image"><ImagePickerIcon/></button>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="create-note-footer">
            <div className="create-note-actions">
              <button className="icon-btn"><ImagePickerIcon/></button>
              <button className="icon-btn"><BrushIcon/></button>
            </div>
            <button className="btn-close" onClick={closeNote}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
