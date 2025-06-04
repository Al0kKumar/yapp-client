
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User, AtSign, FileText } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    userId: '',
    bio: '',
    profilePic: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call - replace with actual API
    console.log('Onboarding data:', formData);
    navigate('/feed');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          profilePic: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">Y</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Complete Your Profile
          </CardTitle>
          <p className="text-gray-300">Tell us about yourself!</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-purple-400">
                <AvatarImage src={formData.profilePic} />
                <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-2xl">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                name="username"
                placeholder="Display Name"
                value={formData.username}
                onChange={handleInputChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
            </div>

            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                name="userId"
                placeholder="@username"
                value={formData.userId}
                onChange={handleInputChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                required
              />
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <Textarea
                name="bio"
                placeholder="Write a short bio..."
                value={formData.bio}
                onChange={handleInputChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 min-h-[100px] resize-none"
                maxLength={160}
              />
              <div className="text-right text-gray-400 text-sm mt-1">
                {formData.bio.length}/160
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
