
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Image, X } from 'lucide-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call - replace with actual API
    console.log('Creating post:', { content, image: selectedImage });
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate('/feed')}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Create Post</h1>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 border-2 border-purple-400">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white">
                  You
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">Your Name</p>
                <p className="text-gray-400 text-sm">@yourusername</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 min-h-[120px] resize-none text-lg"
                maxLength={280}
              />
              
              <div className="text-right text-gray-400 text-sm">
                {content.length}/280
              </div>

              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Image className="w-6 h-6 text-purple-400 hover:text-purple-300 transition-colors" />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={!content.trim()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-2 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Yapp It!
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
