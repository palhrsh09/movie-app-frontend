// src/App.tsx
import { useState } from 'react';
import './App.css';
import MediaForm from './components/MediaForm';
import MediaTable from './components/MediaTable';
import { Button } from './components/ui/button';

export interface Media {
  id?: number;
  title: string;
  type: 'Movie' | 'TV Show';
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editMedia, setEditMedia] = useState<Media | null>(null);

  return (
    <div className="w-screen min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full bg-zinc-950 px-6 py-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-pink-500">📺 TVApp</h1>
          <p className="text-sm text-zinc-400 sm:mt-0 mt-1">
            Store your favorite movies & TV watchlist
          </p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-3xl font-semibold">Your Watchlist</h2>
            <Button
              className="bg-pink-600 hover:bg-pink-700 transition-colors"
              onClick={() => {
                setShowForm(true);
                setEditMedia(null);
              }}
            >
              ➕ Add New
            </Button>
          </div>

          {showForm && (
            <MediaForm
              editMedia={editMedia}
              onClose={() => setShowForm(false)}
              onSubmit={() => {
                setShowForm(false);
                setEditMedia(null);
              }}
            />
          )}

          <MediaTable setEditMedia={setEditMedia} setShowForm={setShowForm} />
        </div>
      </main>
    </div>
  );
}

export default App;
