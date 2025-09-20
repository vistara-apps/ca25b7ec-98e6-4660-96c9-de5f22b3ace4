'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Plus, Clock } from 'lucide-react';
import { User, Activity } from '../lib/types';
import { ActivityCard } from './ActivityCard';
import { formatDate } from '../lib/utils';

interface ActivitiesViewProps {
  user: User;
  onBack: () => void;
}

export function ActivitiesView({ user, onBack }: ActivitiesViewProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock activities data
  const mockActivities: Activity[] = [
    {
      activityId: '1',
      name: 'Virtual Coffee Chat',
      description: 'Casual conversation over coffee. Share stories, laugh, and connect.',
      creatorId: 'user_456',
      participants: ['user_123', 'user_456'],
      dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      location: 'Zoom Room',
      type: 'virtual',
      maxParticipants: 6
    },
    {
      activityId: '2',
      name: 'Book Discussion: "The Midnight Library"',
      description: 'Deep dive into this thought-provoking novel about life choices.',
      creatorId: 'user_789',
      participants: ['user_123'],
      dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      location: 'Discord Voice Channel',
      type: 'virtual',
      maxParticipants: 8
    },
    {
      activityId: '3',
      name: 'Mindfulness Meditation',
      description: 'Guided meditation session to reduce stress and find inner peace.',
      creatorId: 'user_101',
      participants: ['user_123', 'user_456', 'user_789'],
      dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      location: 'Meditation App',
      type: 'virtual',
      maxParticipants: 10
    }
  ];

  const upcomingActivities = mockActivities.filter(activity => activity.dateTime > new Date());
  const pastActivities = mockActivities.filter(activity => activity.dateTime <= new Date());

  const handleJoinActivity = (activityId: string) => {
    console.log('Joining activity:', activityId);
    // Implement join activity logic
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Activities</h1>
            <p className="text-white/60">Discover shared experiences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upcoming' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            Upcoming ({upcomingActivities.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'past' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            Past ({pastActivities.length})
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="px-6 space-y-4">
        {activeTab === 'upcoming' && (
          <>
            {upcomingActivities.map((activity) => (
              <ActivityCard
                key={activity.activityId}
                activity={activity}
                onJoin={() => handleJoinActivity(activity.activityId)}
                isJoined={activity.participants.includes(user.userId)}
                variant="upcoming"
              />
            ))}
            
            {upcomingActivities.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming activities</h3>
                <p className="text-white/60">Create or join activities to connect with others.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'past' && (
          <>
            {pastActivities.map((activity) => (
              <ActivityCard
                key={activity.activityId}
                activity={activity}
                onJoin={() => {}}
                isJoined={activity.participants.includes(user.userId)}
                variant="past"
              />
            ))}
            
            {pastActivities.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past activities</h3>
                <p className="text-white/60">Your activity history will appear here.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Activity Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
