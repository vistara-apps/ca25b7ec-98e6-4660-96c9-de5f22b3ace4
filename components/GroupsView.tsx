'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Lock, Globe, Plus, Search } from 'lucide-react';
import { User, Group } from '../lib/types';
import { GroupCard } from './GroupCard';
import { INTERESTS } from '../lib/constants';

interface GroupsViewProps {
  user: User;
  onBack: () => void;
}

export function GroupsView({ user, onBack }: GroupsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock groups data
  const mockGroups: Group[] = [
    {
      groupId: '1',
      name: 'Anxiety Support Circle',
      description: 'A safe space to share experiences and coping strategies for anxiety.',
      topic: 'Mental Health',
      memberIds: ['1', '2', '3', '4', '5'],
      createdAt: new Date('2024-01-15'),
      isPrivate: false,
      memberCount: 12
    },
    {
      groupId: '2',
      name: 'Career Transition Support',
      description: 'Navigate career changes with peers who understand the journey.',
      topic: 'Career Transition',
      memberIds: ['1', '2', '3'],
      createdAt: new Date('2024-01-20'),
      isPrivate: true,
      memberCount: 8
    },
    {
      groupId: '3',
      name: 'Book Lovers Unite',
      description: 'Discuss books, share recommendations, and connect through stories.',
      topic: 'Book Club',
      memberIds: ['1', '2'],
      createdAt: new Date('2024-01-25'),
      isPrivate: false,
      memberCount: 15
    }
  ];

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.topic === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
    // Implement join group logic
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
            <h1 className="text-2xl font-bold">Support Groups</h1>
            <p className="text-white/60">Find your community</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-accent text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All Groups
          </button>
          {INTERESTS.slice(0, 5).map((interest) => (
            <button
              key={interest}
              onClick={() => setSelectedCategory(interest)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === interest 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Groups List */}
      <div className="px-6 space-y-4">
        {filteredGroups.map((group) => (
          <GroupCard
            key={group.groupId}
            group={group}
            onJoin={() => handleJoinGroup(group.groupId)}
            isJoined={user.joinedGroups.includes(group.groupId)}
          />
        ))}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No groups found</h3>
            <p className="text-white/60">Try adjusting your search or browse different categories.</p>
          </div>
        )}
      </div>

      {/* Create Group Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
