
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Heart, MessageCircle, Reply } from 'lucide-react';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isYapped, setIsYapped] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReplyTo, setShowReplyTo] = useState(null);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [yappsCount, setYappsCount] = useState(post.yapps);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleYapp = () => {
    setIsYapped(!isYapped);
    setYappsCount(isYapped ? yappsCount - 1 : yappsCount + 1);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        user: 'You',
        avatar: '',
        timestamp: 'now',
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const addReply = (commentId) => {
    if (replyText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), {
              id: Date.now(),
              text: replyText,
              user: 'You',
              timestamp: 'now'
            }]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText('');
      setShowReplyTo(null);
    }
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
                className="flex items-center space-x-2 hover:bg-red-500/20 transition-all duration-300"
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                  }`} 
                />
                <span className={`text-sm ${isLiked ? 'text-red-500' : 'text-white'}`}>
                  {likesCount}
                </span>
              </Button>

              <Button
                onClick={handleComment}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 ${
                  showComments ? 'text-blue-400' : 'text-white'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{comments.length}</span>
              </Button>

              <Button
                onClick={handleYapp}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 ${
                  isYapped ? 'text-green-400' : 'text-white'
                }`}
              >
                <span className={`text-lg ${isYapped ? 'animate-bounce' : ''}`}>🔄</span>
                <span className="text-sm">{yappsCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-white hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300"
              >
                <span className="text-lg">📤</span>
              </Button>
            </div>

            {showComments && (
              <div className="mt-4 space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                  />
                  <Button 
                    onClick={addComment}
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Post
                  </Button>
                </div>

                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-xs">
                            {comment.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-white font-medium text-sm">{comment.user}</span>
                            <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-100 text-sm">{comment.text}</p>
                          <Button
                            onClick={() => setShowReplyTo(showReplyTo === comment.id ? null : comment.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-blue-400 text-xs mt-1 h-auto p-1"
                          >
                            <Reply className="w-3 h-3 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>

                      {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className="ml-10 flex items-start space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-xs">
                              {reply.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-white/5 rounded-lg p-2">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-white font-medium text-xs">{reply.user}</span>
                              <span className="text-gray-400 text-xs">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-100 text-xs">{reply.text}</p>
                          </div>
                        </div>
                      ))}

                      {showReplyTo === comment.id && (
                        <div className="ml-10 flex space-x-2">
                          <Input
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && addReply(comment.id)}
                          />
                          <Button 
                            onClick={() => addReply(comment.id)}
                            size="sm"
                            className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                          >
                            Reply
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
