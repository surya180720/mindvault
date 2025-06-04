import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNotes } from './hooks/useNotes';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

function App() {
  const { 
    notes, 
    loading, 
    error, 
    createNote, 
    updateNote, 
    deleteNote 
  } = useNotes();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={<NoteList notes={notes} onDelete={deleteNote} />} 
              />
              <Route 
                path="/new" 
                element={<NoteEditor onSave={createNote} />} 
              />
              <Route 
                path="/edit/:id" 
                element={<NoteEditor notes={notes} onSave={updateNote} />} 
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App; 