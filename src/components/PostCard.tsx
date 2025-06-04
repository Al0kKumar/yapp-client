
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Heart, MessageCircle, Reply, ArrowLeft, Camera } from 'lucide-react';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isYapped, setIsYapped] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReplyTo, setShowReplyTo] = useState(null);
  const [showReplyToReply, setShowReplyToReply] = useState(null);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [yappsCount, setYappsCount] = useState(post.yapps);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [newCommentImage, setNewCommentImage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyImage, setReplyImage] = useState('');
  const [replyToReplyText, setReplyToReplyText] = useState('');
  const [replyToReplyImage, setReplyToReplyImage] = useState('');
  const [commentLikes, setCommentLikes] = useState({});
  const [commentYapps, setCommentYapps] = useState({});
  const [replyLikes, setReplyLikes] = useState({});
  const [replyYapps, setReplyYapps] = useState({});

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

  const handleCommentLike = (commentId) => {
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleCommentYapp = (commentId) => {
    setCommentYapps(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleReplyLike = (replyId) => {
    setReplyLikes(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };

  const handleReplyYapp = (replyId) => {
    setReplyYapps(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };

  const handleCommentImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewCommentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReplyImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReplyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReplyToReplyImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReplyToReplyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addComment = () => {
    if (newComment.trim() || newCommentImage) {
      const comment = {
        id: Date.now(),
        text: newComment,
        user: 'You',
        avatar: '',
        timestamp: 'now',
        replies: [],
        likes: 0,
        yapps: 0,
        image: newCommentImage
      };
      setComments([...comments, comment]);
      setNewComment('');
      setNewCommentImage('');
    }
  };

  const addReply = (commentId) => {
    if (replyText.trim() || replyImage) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), {
              id: Date.now(),
              text: replyText,
              user: 'You',
              timestamp: 'now',
              likes: 0,
              yapps: 0,
              image: replyImage,
              replies: []
            }]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText('');
      setReplyImage('');
      setShowReplyTo(null);
    }
  };

  const addReplyToReply = (commentId, replyId) => {
    if (replyToReplyText.trim() || replyToReplyImage) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  replies: [...(reply.replies || []), {
                    id: Date.now(),
                    text: replyToReplyText,
                    user: 'You',
                    timestamp: 'now',
                    likes: 0,
                    yapps: 0,
                    image: replyToReplyImage
                  }]
                };
              }
              return reply;
            })
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyToReplyText('');
      setReplyToReplyImage('');
      setShowReplyToReply(null);
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
            </div>

            {showComments && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Button
                    onClick={() => setShowComments(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-xs">
                      Y
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                      onKeyPress={(e) => e.key === 'Enter' && addComment()}
                    />
                    {newCommentImage && (
                      <div className="relative">
                        <img src={newCommentImage} alt="Comment attachment" className="w-full max-w-sm rounded-lg" />
                        <Button
                          onClick={() => setNewCommentImage('')}
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                        >
                          ×
                        </Button>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={addComment}
                        size="sm"
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        Post
                      </Button>
                      <label className="cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleCommentImageUpload} />
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                          <Camera className="w-4 h-4" />
                        </Button>
                      </label>
                    </div>
                  </div>
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
                          <p className="text-gray-100 text-sm mb-2">{comment.text}</p>
                          
                          {comment.image && (
                            <div className="mb-2">
                              <img src={comment.image} alt="Comment attachment" className="w-full max-w-sm rounded-lg" />
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4">
                            <Button
                              onClick={() => handleCommentLike(comment.id)}
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-1 hover:bg-red-500/20 transition-all duration-300 h-auto p-1"
                            >
                              <Heart 
                                className={`w-3 h-3 ${
                                  commentLikes[comment.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                }`} 
                              />
                              <span className={`text-xs ${commentLikes[comment.id] ? 'text-red-500' : 'text-gray-400'}`}>
                                {(comment.likes || 0) + (commentLikes[comment.id] ? 1 : 0)}
                              </span>
                            </Button>

                            <Button
                              onClick={() => setShowComments(!showComments)}
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-1 hover:bg-blue-500/20 transition-all duration-300 h-auto p-1"
                            >
                              <MessageCircle className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {(comment.replies || []).length}
                              </span>
                            </Button>

                            <Button
                              onClick={() => handleCommentYapp(comment.id)}
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-1 hover:bg-green-500/20 transition-all duration-300 h-auto p-1"
                            >
                              <span className={`text-sm ${commentYapps[comment.id] ? 'text-green-400' : 'text-gray-400'}`}>🔄</span>
                              <span className={`text-xs ${commentYapps[comment.id] ? 'text-green-400' : 'text-gray-400'}`}>
                                {(comment.yapps || 0) + (commentYapps[comment.id] ? 1 : 0)}
                              </span>
                            </Button>

                            <Button
                              onClick={() => setShowReplyTo(showReplyTo === comment.id ? null : comment.id)}
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-blue-400 text-xs h-auto p-1"
                            >
                              <Reply className="w-3 h-3 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>

                      {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className="ml-10 space-y-2">
                          <div className="flex items-start space-x-2">
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
                              <p className="text-gray-100 text-xs mb-2">{reply.text}</p>
                              
                              {reply.image && (
                                <div className="mb-2">
                                  <img src={reply.image} alt="Reply attachment" className="w-full max-w-xs rounded-lg" />
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-3">
                                <Button
                                  onClick={() => handleReplyLike(reply.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1 hover:bg-red-500/20 transition-all duration-300 h-auto p-0.5"
                                >
                                  <Heart 
                                    className={`w-2.5 h-2.5 ${
                                      replyLikes[reply.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                    }`} 
                                  />
                                  <span className={`text-xs ${replyLikes[reply.id] ? 'text-red-500' : 'text-gray-400'}`}>
                                    {(reply.likes || 0) + (replyLikes[reply.id] ? 1 : 0)}
                                  </span>
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1 hover:bg-blue-500/20 transition-all duration-300 h-auto p-0.5"
                                >
                                  <MessageCircle className="w-2.5 h-2.5 text-gray-400" />
                                  <span className="text-xs text-gray-400">
                                    {(reply.replies || []).length}
                                  </span>
                                </Button>

                                <Button
                                  onClick={() => handleReplyYapp(reply.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1 hover:bg-green-500/20 transition-all duration-300 h-auto p-0.5"
                                >
                                  <span className={`text-xs ${replyYapps[reply.id] ? 'text-green-400' : 'text-gray-400'}`}>🔄</span>
                                  <span className={`text-xs ${replyYapps[reply.id] ? 'text-green-400' : 'text-gray-400'}`}>
                                    {(reply.yapps || 0) + (replyYapps[reply.id] ? 1 : 0)}
                                  </span>
                                </Button>

                                <Button
                                  onClick={() => setShowReplyToReply(showReplyToReply === `${comment.id}-${reply.id}` ? null : `${comment.id}-${reply.id}`)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-blue-400 text-xs h-auto p-0.5"
                                >
                                  <Reply className="w-2.5 h-2.5 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>

                          {reply.replies && reply.replies.map((nestedReply) => (
                            <div key={nestedReply.id} className="ml-8 flex items-start space-x-2">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-xs">
                                  {nestedReply.user.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-white/5 rounded-lg p-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-white font-medium text-xs">{nestedReply.user}</span>
                                  <span className="text-gray-400 text-xs">{nestedReply.timestamp}</span>
                                </div>
                                <p className="text-gray-100 text-xs mb-2">{nestedReply.text}</p>
                                
                                {nestedReply.image && (
                                  <div className="mb-2">
                                    <img src={nestedReply.image} alt="Nested reply attachment" className="w-full max-w-xs rounded-lg" />
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center space-x-1 hover:bg-red-500/20 transition-all duration-300 h-auto p-0.5"
                                  >
                                    <Heart className="w-2 h-2 text-gray-400" />
                                    <span className="text-xs text-gray-400">
                                      {nestedReply.likes || 0}
                                    </span>
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center space-x-1 hover:bg-green-500/20 transition-all duration-300 h-auto p-0.5"
                                  >
                                    <span className="text-xs text-gray-400">🔄</span>
                                    <span className="text-xs text-gray-400">
                                      {nestedReply.yapps || 0}
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}

                          {showReplyToReply === `${comment.id}-${reply.id}` && (
                            <div className="ml-8 flex space-x-2">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-xs">
                                  Y
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={replyToReplyText}
                                  onChange={(e) => setReplyToReplyText(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 text-sm"
                                  onKeyPress={(e) => e.key === 'Enter' && addReplyToReply(comment.id, reply.id)}
                                />
                                {replyToReplyImage && (
                                  <div className="relative">
                                    <img src={replyToReplyImage} alt="Reply attachment" className="w-full max-w-xs rounded-lg" />
                                    <Button
                                      onClick={() => setReplyToReplyImage('')}
                                      variant="ghost"
                                      size="sm"
                                      className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                                    >
                                      ×
                                    </Button>
                                  </div>
                                )}
                                <div className="flex space-x-2">
                                  <Button 
                                    onClick={() => addReplyToReply(comment.id, reply.id)}
                                    size="sm"
                                    className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                                  >
                                    Reply
                                  </Button>
                                  <label className="cursor-pointer">
                                    <input type="file" accept="image/*" className="hidden" onChange={handleReplyToReplyImageUpload} />
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                                      <Camera className="w-3 h-3" />
                                    </Button>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {showReplyTo === comment.id && (
                        <div className="ml-10 flex space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-xs">
                              Y
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Input
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 text-sm"
                              onKeyPress={(e) => e.key === 'Enter' && addReply(comment.id)}
                            />
                            {replyImage && (
                              <div className="relative">
                                <img src={replyImage} alt="Reply attachment" className="w-full max-w-xs rounded-lg" />
                                <Button
                                  onClick={() => setReplyImage('')}
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                                >
                                  ×
                                </Button>
                              </div>
                            )}
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => addReply(comment.id)}
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                              >
                                Reply
                              </Button>
                              <label className="cursor-pointer">
                                <input type="file" accept="image/*" className="hidden" onChange={handleReplyImageUpload} />
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                                  <Camera className="w-3 h-3" />
                                </Button>
                              </label>
                            </div>
                          </div>
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
