# MindVault - Personal Knowledge Base

A full-stack personal knowledge base application with React frontend and Express backend. Features include note creation, tagging, and smart search capabilities.

## Features

- Create and manage notes with titles, content, and tags
- Beautiful, responsive UI built with TailwindCSS
- Real-time search functionality
- Local JSON database for data persistence
- No cloud dependencies - everything runs locally

## Tech Stack

- Frontend: React 18 with Vite and TailwindCSS
- Backend: Express.js with lowdb for local storage
- All data is stored locally in a JSON file
- No external services or paid dependencies required

## Prerequisites

1. Install Node.js and npm:
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
   - This will also install npm (Node Package Manager)

## Project Structure

```
mindvault/
├── frontend/         # React + Vite frontend
│   ├── src/         # React components and styles
│   ├── public/      # Static assets
│   └── index.html   # HTML entry point
└── backend/         # Express + lowdb backend
    ├── src/         # Server code
    └── db.json      # Local JSON database
```

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/mindvault.git
cd mindvault
```

2. Install dependencies for both frontend and backend:
```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

3. Start the development servers:

```bash
# Start backend (from backend directory)
cd backend
npm run dev

# In a new terminal, start frontend (from frontend directory)
cd frontend
npm run dev
```

The frontend will run on http://localhost:5173
The backend will run on http://localhost:3001

## API Endpoints

- `GET /api/notes` - List all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 