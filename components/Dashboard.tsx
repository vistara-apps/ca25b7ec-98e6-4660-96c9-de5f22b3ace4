'use client';

import { Users, Calendar, MessageCircle, Brain, ChevronRight } from 'lucide-react';
import { User } from '../lib/types';
import { ViewType } from '../app/page';
import { getInitials } from '../lib/utils';

interface DashboardProps {
  user: User;
  onNavigate: (view: ViewType) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const menuItems = [
    {
      icon: Users,
      title: 'Support Groups',
      description: 'Join caring communities',
      view: 'groups' as ViewType,
      badge: '3 new'
    },
    {
      icon: Calendar,
      title: 'Activities',
      description: 'Discover shared experiences',
      view: 'activities' as ViewType,
      badge: '5 upcoming'
    },
    {
      icon: MessageCircle,
      title: 'AI Companion',
      description: 'Your daily check-in buddy',
      view: 'ai' as ViewType,
      badge: 'Available'
    },
    {
      icon: Brain,
      title: 'Skill Building',
      description: 'Grow your social confidence',
      view: 'skills' as ViewType,
      badge: '2 modules'
    }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
            {user.avatar ? (
              <img src={user.avatar} alt={user.displayName} className="w-full h-full rounded-full" />
            ) : (
              <span className="text-lg font-semibold">{getInitials(user.displayName)}</span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold">Welcome back, {user.displayName.split(' ')[0]}!</h1>
            <p className="text-white/60 text-sm">Ready to connect today?</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card text-center py-3">
            <div className="text-2xl font-bold text-accent">{user.joinedGroups.length}</div>
            <div className="text-xs text-white/60">Groups</div>
          </div>
          <div className="card text-center py-3">
            <div className="text-2xl font-bold text-accent">{user.activeSessions.length}</div>
            <div className="text-xs text-white/60">Sessions</div>
          </div>
          <div className="card text-center py-3">
            <div className="text-2xl font-bold text-accent">7</div>
            <div className="text-xs text-white/60">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate(item.view)}
            className="w-full card hover:bg-white/15 transition-all duration-200 p-4 flex items-center"
          >
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
              <item.icon className="w-6 h-6 text-accent" />
            </div>
            
            <div className="flex-1 text-left">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-white/60">{item.description}</p>
            </div>
            
            <div className="flex items-center">
              {item.badge && (
                <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full mr-2">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
          </button>
        ))}
      </div>

      {/* Daily Inspiration */}
      <div className="p-6 mt-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Daily Inspiration</h3>
          <p className="text-sm text-white/80 italic">
            "Connection is why we're here; it is what gives purpose and meaning to our lives." - Brené Brown
          </p>
        </div>
      </div>
    </div>
  );
}
