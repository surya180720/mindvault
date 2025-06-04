import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configure lowdb
const file = join(__dirname, '../db.json');
const adapter = new FileSync(file);
const db = lowdb(adapter);

// Set default data
db.defaults({ notes: [] }).write();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - Allow all origins in production
app.use(cors());

// Body parser middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.get('/api/notes', (req, res) => {
  try {
    const notes = db.get('notes').value();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

app.get('/api/notes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const note = db.get('notes').find({ id }).value();
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

app.post('/api/notes', (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.get('notes')
      .push(newNote)
      .write();
    
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

app.put('/api/notes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    
    const note = db.get('notes').find({ id });
    
    if (!note.value()) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    const updatedNote = {
      ...note.value(),
      title,
      content,
      tags,
      updatedAt: new Date().toISOString()
    };
    
    note.assign(updatedNote).write();
    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const removed = db.get('notes').remove({ id }).write();
    
    if (removed.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 