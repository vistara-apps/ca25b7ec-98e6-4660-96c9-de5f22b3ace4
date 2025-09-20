'use client';

import { useState } from 'react';
import { Heart, Users, MessageCircle, Brain } from 'lucide-react';
import { useMiniKit } from '@coinbase/minikit';

interface WelcomeScreenProps {
  onConnect: (userData: any) => void;
}

export function WelcomeScreen({ onConnect }: WelcomeScreenProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { connectWallet, walletAddress } = useMiniKit();

  const handleConnect = async () => {
    setIsConnecting(true);

    try {
      // Connect wallet if not already connected
      if (!walletAddress) {
        await connectWallet();
      }

      // Create or get user from our API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farcasterId: walletAddress ? `fc_${walletAddress.slice(-8)}` : 'anonymous',
          displayName: 'New User',
          bio: 'Just joined EchoSphere',
          interests: []
        }),
      });

      const result = await response.json();

      if (result.success) {
        onConnect(result.data);
      } else {
        // Fallback to mock data if API fails
        const mockUser = {
          userId: 'user_123',
          farcasterId: walletAddress ? `fc_${walletAddress.slice(-8)}` : 'fc_456',
          displayName: 'Alex Chen',
          bio: 'Looking to connect with like-minded people',
          interests: ['Mental Health', 'Social Anxiety', 'Book Club'],
          joinedGroups: [],
          activeSessions: [],
          avatar: null
        };
        onConnect(mockUser);
      }
    } catch (error) {
      console.error('Connection error:', error);
      // Fallback to mock data
      const mockUser = {
        userId: 'user_123',
        farcasterId: walletAddress ? `fc_${walletAddress.slice(-8)}` : 'fc_456',
        displayName: 'Alex Chen',
        bio: 'Looking to connect with like-minded people',
        interests: ['Mental Health', 'Social Anxiety', 'Book Club'],
        joinedGroups: [],
        activeSessions: [],
        avatar: null
      };
      onConnect(mockUser);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-white">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">EchoSphere</h1>
        <p className="text-xl text-white/80 mb-2">Find your people, share your journey</p>
        <p className="text-white/60 leading-relaxed max-w-sm">
          Connect with supportive communities, discover meaningful activities, and grow with AI-powered guidance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-sm">
        <div className="card text-center p-4">
          <Users className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Support Groups</h3>
          <p className="text-xs text-white/60 mt-1">Join caring communities</p>
        </div>
        
        <div className="card text-center p-4">
          <MessageCircle className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Activities</h3>
          <p className="text-xs text-white/60 mt-1">Share experiences</p>
        </div>
        
        <div className="card text-center p-4">
          <Brain className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold text-sm">AI Companion</h3>
          <p className="text-xs text-white/60 mt-1">24/7 support</p>
        </div>
        
        <div className="card text-center p-4">
          <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Skill Building</h3>
          <p className="text-xs text-white/60 mt-1">Grow confidence</p>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50"
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Connecting...
            </div>
          ) : (
            'Start Connecting'
          )}
        </button>
        
        <p className="text-xs text-white/50 text-center mt-4">
          Connect with your Farcaster identity to get started
        </p>
      </div>
    </div>
  );
}
