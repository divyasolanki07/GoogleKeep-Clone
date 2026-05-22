const NOTES_KEY = 'googlekeep_notes';

export const loadNotes = () => {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveNotes = (notes) => {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};
