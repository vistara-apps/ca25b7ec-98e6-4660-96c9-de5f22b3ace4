'use client';

import { Users, Lock, Globe } from 'lucide-react';
import { Group } from '../lib/types';

interface GroupCardProps {
  group: Group;
  onJoin: () => void;
  isJoined: boolean;
  variant?: 'compact' | 'detailed';
}

export function GroupCard({ group, onJoin, isJoined, variant = 'detailed' }: GroupCardProps) {
  if (variant === 'compact') {
    return (
      <div className="card p-3 flex items-center">
        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-3">
          <Users className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{group.name}</h3>
          <p className="text-xs text-white/60">{group.memberCount} members</p>
        </div>
        <button
          onClick={onJoin}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isJoined 
              ? 'bg-accent/20 text-accent' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-3">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold">{group.name}</h3>
            <div className="flex items-center text-sm text-white/60">
              {group.isPrivate ? (
                <Lock className="w-4 h-4 mr-1" />
              ) : (
                <Globe className="w-4 h-4 mr-1" />
              )}
              <span>{group.memberCount} members</span>
            </div>
          </div>
        </div>
        
        <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full">
          {group.topic}
        </span>
      </div>

      <p className="text-sm text-white/80 mb-4 leading-relaxed">
        {group.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-white/50">
          Created {group.createdAt.toLocaleDateString()}
        </div>
        
        <button
          onClick={onJoin}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isJoined 
              ? 'bg-accent/20 text-accent' 
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
        >
          {isJoined ? 'Joined' : group.isPrivate ? 'Request to Join' : 'Join Group'}
        </button>
      </div>
    </div>
  );
}
