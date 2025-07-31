import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import DeleteModal from './DeleteModal';

interface Media {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
}

interface MediaTableProps {
  setEditMedia: (media: Media) => void;
  setShowForm: (show: boolean) => void;
}

export default function MediaTable({ setEditMedia, setShowForm }: MediaTableProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL

  const fetchMedia = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/media?page=${pageNum}&limit=10`);
      const data = await response.json();
      setMedia((prev) => (pageNum === 1 ? data.media : [...prev, ...data.media]));
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia(page);
  }, [page]);

  useEffect(() => {
    if (loading || page >= totalPages) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastRowRef.current) {
      observer.current.observe(lastRowRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, totalPages]);

  const handleEdit = (media: Media) => {
    setEditMedia(media);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${apiUrl}/api/media/${id}`, { method: 'DELETE' });
      setMedia((prev) => prev.filter((item) => item.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Director</th>
            <th className="border p-2">Budget</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Year/Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {media.map((item, index) => (
            <tr
              key={item.id}
              ref={index === media.length - 1 ? lastRowRef : null}
              className="hover:bg-gray-50"
            >
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.type}</td>
              <td className="border p-2">{item.director}</td>
              <td className="border p-2">{item.budget}</td>
              <td className="border p-2">{item.location}</td>
              <td className="border p-2">{item.duration}</td>
              <td className="border p-2">{item.year}</td>
              <td className="border p-2">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p className="text-center">Loading...</p>}
      {deleteId && (
        <DeleteModal
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}