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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editMedia
      ? `http://localhost:5000/api/media/${editMedia.id}`
      : 'http://localhost:5000/api/media';
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {editMedia ? 'Edit' : 'Add'} Media
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
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

          <div>
            <Label htmlFor="director">Director</Label>
            <Input
              id="director"
              value={formData.director}
              onChange={(e) =>
                setFormData({ ...formData, director: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
