import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { endpoints } from '../config';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(endpoints.notes);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      const response = await fetch(endpoints.note(id), {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map(note => (
        <div key={note.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${note.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <PencilIcon className="h-5 w-5" />
              </Link>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
          
          <div className="flex flex-wrap gap-2">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </div>
      ))}
      
      {notes.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No notes yet. Click "New Note" to create one!
        </div>
      )}
    </div>
  );
}

export default NoteList; 