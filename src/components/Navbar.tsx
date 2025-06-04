
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Home, User, Plus, Bell } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/feed" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">Y</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Yapp
            </span>
          </Link>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search Yapp"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/feed">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-300 hover:text-white hover:bg-white/10 ${
                  isActive('/feed') ? 'text-purple-400' : ''
                }`}
              >
                <Home className="w-5 h-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <Link to="/create-post">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-300 hover:text-white hover:bg-white/10 ${
                  isActive('/create-post') ? 'text-purple-400' : ''
                }`}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </Link>

            <Link to="/profile/yourusername">
              <Button
                variant="ghost"
                size="sm"
                className={`p-0 ${isActive('/profile/yourusername') ? 'ring-2 ring-purple-400' : ''}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-blue-400 text-white text-sm">
                    You
                  </AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
