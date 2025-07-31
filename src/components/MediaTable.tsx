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
  setEditMedia: any;
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
  const apiUrl = import.meta.env.VITE_API_URL;

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
    <div className="w-full mt-6 overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
      <table className="min-w-full text-sm text-left text-zinc-700">
        <thead className="bg-zinc-100 text-xs text-zinc-600 uppercase sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3 hidden sm:table-cell">Type</th>
            <th className="px-4 py-3 hidden md:table-cell">Director</th>
            <th className="px-4 py-3 hidden lg:table-cell">Budget</th>
            <th className="px-4 py-3 hidden lg:table-cell">Location</th>
            <th className="px-4 py-3 hidden xl:table-cell">Duration</th>
            <th className="px-4 py-3 hidden xl:table-cell">Year</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {media.map((item, index) => (
            <tr
              key={item.id}
              ref={index === media.length - 1 ? lastRowRef : null}
              className="border-t hover:bg-zinc-50"
            >
              <td className="px-4 py-2 whitespace-nowrap">{item.title}</td>
              <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">{item.type}</td>
              <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">{item.director}</td>
              <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">{item.budget}</td>
              <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">{item.location}</td>
              <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">{item.duration}</td>
              <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">{item.year}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button variant="destructive" onClick={() => setDeleteId(item.id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="py-4 text-center text-zinc-500">
          Loading...
        </div>
      )}

      {deleteId && (
        <DeleteModal
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
