// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const endpoints = {
  notes: `${API_URL}/notes`,
  note: (id) => `${API_URL}/notes/${id}`,
}; 