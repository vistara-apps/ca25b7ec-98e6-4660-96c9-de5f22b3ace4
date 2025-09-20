'use client';

import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Activity } from '../lib/types';
import { formatDate } from '../lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onJoin: () => void;
  isJoined: boolean;
  variant: 'upcoming' | 'past';
}

export function ActivityCard({ activity, onJoin, isJoined, variant }: ActivityCardProps) {
  const isPast = variant === 'past';
  const spotsLeft = activity.maxParticipants ? activity.maxParticipants - activity.participants.length : null;

  return (
    <div className={`card p-4 ${isPast ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{activity.name}</h3>
          <p className="text-sm text-white/80 mb-3 leading-relaxed">
            {activity.description}
          </p>
        </div>
        
        <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
          activity.type === 'virtual' 
            ? 'bg-blue-500/20 text-blue-300' 
            : 'bg-green-500/20 text-green-300'
        }`}>
          {activity.type}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-white/70">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(activity.dateTime)}</span>
        </div>
        
        <div className="flex items-center text-sm text-white/70">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{activity.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-white/70">
          <Users className="w-4 h-4 mr-2" />
          <span>
            {activity.participants.length} participant{activity.participants.length !== 1 ? 's' : ''}
            {spotsLeft !== null && spotsLeft > 0 && (
              <span className="text-accent ml-1">• {spotsLeft} spots left</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-white/50">
          {isPast ? 'Completed' : 'Upcoming'}
        </div>
        
        {!isPast && (
          <button
            onClick={onJoin}
            disabled={spotsLeft === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isJoined 
                ? 'bg-accent/20 text-accent' 
                : spotsLeft === 0
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-accent text-white hover:bg-accent/90'
            }`}
          >
            {isJoined ? 'Joined' : spotsLeft === 0 ? 'Full' : 'Join Activity'}
          </button>
        )}
        
        {isPast && isJoined && (
          <span className="text-xs text-accent">Participated</span>
        )}
      </div>
    </div>
  );
}
