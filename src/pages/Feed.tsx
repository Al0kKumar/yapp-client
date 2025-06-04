
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Mock API call - replace with actual API
    const mockPosts = [
      {
        id: 1,
        user: {
          username: 'Sarah Chen',
          userId: '@sarahc',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face'
        },
        content: 'Just shipped a new feature! The feeling when your code works on the first try is unmatched 🚀',
        timestamp: '2h ago',
        likes: 42,
        comments: [
          {
            id: 1,
            text: 'Congrats! That feeling is the best 🎉',
            user: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            timestamp: '1h ago',
            replies: [
              {
                id: 1,
                text: 'Totally agree! 💯',
                user: 'Sarah Chen',
                timestamp: '45m ago'
              }
            ]
          }
        ],
        yapps: 8,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop'
      },
      {
        id: 2,
        user: {
          username: 'Alex Rivera',
          userId: '@alexr',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        content: 'Beautiful sunset from my balcony tonight. Sometimes you need to step away from the screen and appreciate the simple things ✨',
        timestamp: '4h ago',
        likes: 127,
        comments: [
          {
            id: 1,
            text: 'Stunning view! 😍',
            user: 'Marcus Johnson',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            timestamp: '3h ago',
            replies: []
          },
          {
            id: 2,
            text: 'Nature therapy at its finest 🌅',
            user: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
            timestamp: '2h ago',
            replies: []
          }
        ],
        yapps: 15,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
      },
      {
        id: 3,
        user: {
          username: 'Marcus Johnson',
          userId: '@marcusj',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        content: 'Hot take: The best debugging tool is still console.log() 🔥 Fight me.',
        timestamp: '6h ago',
        likes: 89,
        comments: [
          {
            id: 1,
            text: 'Facts! Old school but it works 😂',
            user: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            timestamp: '5h ago',
            replies: [
              {
                id: 1,
                text: 'Sometimes the simplest tools are the best tools',
                user: 'Marcus Johnson',
                timestamp: '4h ago'
              }
            ]
          }
        ],
        yapps: 22
      }
    ];
    setPosts(mockPosts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="max-w-2xl mx-auto pt-20 px-4 pb-8">
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <Link to="/create-post">
        <Button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
};

export default Feed;
