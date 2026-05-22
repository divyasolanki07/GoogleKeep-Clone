import { useState, useRef, useEffect } from 'react';
import './NoteModal.css';

export default function NoteModal({ note, onClose, onUpdate }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // Auto-resize
  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResize(titleRef);
    autoResize(textRef);
  }, [title, text]);

  const handleClose = () => {
    onUpdate(note.id, { title, text });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: `var(--note-${note.color})` }}
      >
        <textarea
          ref={titleRef}
          className="modal-title"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          rows={1}
        />
        <textarea
          ref={textRef}
          className="modal-text"
          placeholder="Note"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />
        
        <div className="modal-footer">
          <div className="modal-edited">Edited</div>
          <button className="btn-close" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
