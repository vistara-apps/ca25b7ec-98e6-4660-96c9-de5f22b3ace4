'use client';

import { useState, useEffect } from 'react';
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
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('topic', selectedCategory);
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }

        const response = await fetch(`/api/groups?${params}`);
        const result = await response.json();

        if (result.success) {
          setGroups(result.data);
        } else {
          console.error('Failed to fetch groups:', result.error);
          // Fallback to mock data
          setGroups([
            {
              groupId: '1',
              name: 'Anxiety Support Circle',
              description: 'A safe space to share experiences and coping strategies for anxiety.',
              topic: 'Mental Health',
              memberIds: ['user_123'],
              createdAt: new Date('2024-01-15'),
              isPrivate: false,
              memberCount: 1
            },
            {
              groupId: '2',
              name: 'Career Transition Support',
              description: 'Navigate career changes with peers who understand the journey.',
              topic: 'Career Transition',
              memberIds: [],
              createdAt: new Date('2024-01-20'),
              isPrivate: true,
              memberCount: 0
            },
            {
              groupId: '3',
              name: 'Book Lovers Unite',
              description: 'Discuss books, share recommendations, and connect through stories.',
              topic: 'Book Club',
              memberIds: [],
              createdAt: new Date('2024-01-25'),
              isPrivate: false,
              memberCount: 0
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Fallback to mock data
        setGroups([
          {
            groupId: '1',
            name: 'Anxiety Support Circle',
            description: 'A safe space to share experiences and coping strategies for anxiety.',
            topic: 'Mental Health',
            memberIds: ['user_123'],
            createdAt: new Date('2024-01-15'),
            isPrivate: false,
            memberCount: 1
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [selectedCategory, searchQuery]);

  const filteredGroups = groups;

  const handleJoinGroup = async (groupId: string) => {
    try {
      const response = await fetch('/api/groups', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId,
          userId: user.userId,
          action: 'join'
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setGroups(prevGroups =>
          prevGroups.map(group =>
            group.groupId === groupId
              ? { ...group, memberIds: [...group.memberIds, user.userId], memberCount: group.memberCount + 1 }
              : group
          )
        );
      } else {
        console.error('Failed to join group:', result.error);
      }
    } catch (error) {
      console.error('Error joining group:', error);
    }
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
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Loading groups...</p>
          </div>
        ) : (
          <>
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
          </>
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
