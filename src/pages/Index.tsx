
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MessageSquare, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-3xl flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-white">Y</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
            Yapp
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect, share, and discover what's happening in your world. Join the conversation on the next generation social platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
            <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Connect</h3>
            <p className="text-gray-300">Find and follow friends, creators, and communities that matter to you.</p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
            <MessageSquare className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Share</h3>
            <p className="text-gray-300">Express yourself with posts, images, and engage in meaningful conversations.</p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Discover</h3>
            <p className="text-gray-300">Explore trending topics and discover content that inspires you.</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link to="/register">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-xl transition-all duration-300 text-lg">
              Sign In
            </Button>
          </Link>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          Join thousands of users already yapping on our platform
        </p>
      </div>
    </div>
  );
};

export default Index;
