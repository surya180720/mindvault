import { useState, useEffect } from 'react';
import { TagIcon } from '@heroicons/react/24/outline';
import { endpoints } from '../config';

function ViewNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(endpoints.notes);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Notes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {note.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {note.content}
              </p>
              
              {note.tags && note.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <TagIcon className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                {formatDate(note.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notes yet. Create your first note!</p>
        </div>
      )}
    </div>
  );
}

export default ViewNotes; 