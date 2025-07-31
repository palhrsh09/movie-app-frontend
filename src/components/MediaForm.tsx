import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Media {
  id?: number;
  title: string;
  type: 'Movie' | 'TV Show';
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
}

interface MediaFormProps {
  editMedia: Media | null;
  onClose: () => void;
  onSubmit: () => void;
}

export default function MediaForm({
  editMedia,
  onClose,
  onSubmit,
}: MediaFormProps) {
  const [formData, setFormData] = useState<Media>({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year: '',
  });

  useEffect(() => {
    if (editMedia) {
      setFormData(editMedia);
    }
  }, [editMedia]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = editMedia
      ? `${apiUrl}/api/media/${editMedia.id}`
      : `${apiUrl}/api/media`;
    const method = editMedia ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center">
          {editMedia ? 'Edit Media' : 'Add Media'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Title */}
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="title" className="text-zinc-700">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type" className="text-zinc-700">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value as 'Movie' | 'TV Show' })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Movie">Movie</SelectItem>
                <SelectItem value="TV Show">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Director */}
          <div>
            <Label htmlFor="director" className="text-zinc-700">Director</Label>
            <Input
              id="director"
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
              required
            />
          </div>

          {/* Budget */}
          <div>
            <Label htmlFor="budget" className="text-zinc-700">Budget</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-zinc-700">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration" className="text-zinc-700">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>

          {/* Year */}
          <div>
            <Label htmlFor="year" className="text-zinc-700">Year</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
            />
          </div>

          {/* Buttons */}
          <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
