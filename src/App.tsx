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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Favorite Movies & TV Shows</h1>
      <Button onClick={() => { setShowForm(true); setEditMedia(null); }} className="mb-4">
        Add New
      </Button>
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
  );
}

export default App;
