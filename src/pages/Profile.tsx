
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Link as LinkIcon } from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Mock API call - replace with actual API
    const mockUser = {
      id: 1,
      username: 'Sarah Chen',
      userId: '@sarahc',
      bio: 'Frontend Developer 🚀 | Coffee enthusiast ☕ | Building cool stuff with React',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop&crop=face',
      banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=300&fit=crop',
      followers: 1234,
      following: 567,
      postsCount: 89,
      joinedDate: 'March 2023',
      location: 'San Francisco, CA',
      website: 'sarahchen.dev'
    };

    const mockPosts = [
      {
        id: 1,
        user: mockUser,
        content: 'Just shipped a new feature! The feeling when your code works on the first try is unmatched 🚀',
        timestamp: '2h ago',
        likes: 42,
        comments: 12,
        yapps: 8,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop'
      },
      {
        id: 2,
        user: mockUser,
        content: 'Working on a new design system. The attention to detail in modern UI frameworks is incredible!',
        timestamp: '1d ago',
        likes: 67,
        comments: 18,
        yapps: 12
      }
    ];

    setUser(mockUser);
    setPosts(mockPosts);
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-20 px-4 pb-8">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-6">
          <div className="relative">
            <div 
              className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-lg"
              style={{ backgroundImage: `url(${user.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <Avatar className="w-32 h-32 border-4 border-white absolute -bottom-16 left-6">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-4xl">
                {user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardContent className="pt-20 pb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                <p className="text-gray-400">{user.userId}</p>
              </div>
              <Button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`rounded-full px-6 ${
                  isFollowing 
                    ? 'bg-white/20 border border-white/30 text-white hover:bg-white/30' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>

            <p className="text-gray-300 mb-4">{user.bio}</p>

            <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
              {user.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center space-x-1">
                  <LinkIcon className="w-4 h-4" />
                  <a href={`https://${user.website}`} className="text-purple-400 hover:text-purple-300">
                    {user.website}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>

            <div className="flex space-x-6 text-sm">
              <div>
                <span className="font-bold text-white">{user.following.toLocaleString()}</span>
                <span className="text-gray-400 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-white">{user.followers.toLocaleString()}</span>
                <span className="text-gray-400 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold text-white">{user.postsCount}</span>
                <span className="text-gray-400 ml-1">Yapps</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
