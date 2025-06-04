import { useState, useEffect } from 'react';
import { endpoints } from '../config';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      console.log('Fetching notes from:', endpoints.notes);
      const response = await fetch(endpoints.notes);
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to fetch notes: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      console.log('Fetched notes:', data);
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    try {
      const response = await fetch(endpoints.notes, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (!response.ok) throw new Error('Failed to create note');
      const newNote = await response.json();
      setNotes(prev => [...prev, newNote]);
      return newNote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await fetch(endpoints.note(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (!response.ok) throw new Error('Failed to update note');
      const updatedNote = await response.json();
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
      return updatedNote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(endpoints.note(id), {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes: fetchNotes,
  };
} 