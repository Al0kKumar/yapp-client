
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isYapped, setIsYapped] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [yappsCount, setYappsCount] = useState(post.yapps);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleYapp = () => {
    setIsYapped(!isYapped);
    setYappsCount(isYapped ? yappsCount - 1 : yappsCount + 1);
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Link to={`/profile/${post.user.userId.substring(1)}`}>
            <Avatar className="w-12 h-12 border-2 border-purple-400/50 hover:border-purple-400 transition-colors">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white">
                {post.user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link to={`/profile/${post.user.userId.substring(1)}`}>
                  <h3 className="font-semibold text-white hover:text-purple-300 transition-colors">
                    {post.user.username}
                  </h3>
                </Link>
                <span className="text-gray-400">{post.user.userId}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-400 text-sm">{post.timestamp}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-gray-100 mt-2 leading-relaxed">{post.content}</p>

            {post.image && (
              <div className="mt-3 rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-4 max-w-md">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 ${
                  isLiked ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                <span className={`text-lg ${isLiked ? 'animate-pulse' : ''}`}>❤️</span>
                <span className="text-sm">{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
              >
                <span className="text-lg">💬</span>
                <span className="text-sm">{post.comments}</span>
              </Button>

              <Button
                onClick={handleYapp}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 ${
                  isYapped ? 'text-green-400' : 'text-gray-400'
                }`}
              >
                <span className={`text-lg ${isYapped ? 'animate-bounce' : ''}`}>🔄</span>
                <span className="text-sm">{yappsCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300"
              >
                <span className="text-lg">📤</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
