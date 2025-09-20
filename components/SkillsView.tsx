'use client';

import { useState } from 'react';
import { ArrowLeft, Brain, Lock, CheckCircle, Play, Trophy } from 'lucide-react';
import { User, SkillModule } from '../lib/types';
import { SkillModuleCard } from './SkillModuleCard';
import { SKILL_CATEGORIES } from '../lib/constants';

interface SkillsViewProps {
  user: User;
  onBack: () => void;
}

export function SkillsView({ user, onBack }: SkillsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock skill modules data
  const mockSkillModules: SkillModule[] = [
    {
      moduleId: '1',
      name: 'Starting Conversations',
      description: 'Learn effective techniques to initiate meaningful conversations with confidence.',
      category: 'communication',
      isLocked: false,
      isCompleted: true,
      progress: 100
    },
    {
      moduleId: '2',
      name: 'Active Listening Skills',
      description: 'Master the art of truly hearing and understanding others in conversations.',
      category: 'listening',
      isLocked: false,
      isCompleted: false,
      progress: 60
    },
    {
      moduleId: '3',
      name: 'Understanding Emotions',
      description: 'Develop deeper empathy by recognizing and responding to emotional cues.',
      category: 'empathy',
      isLocked: false,
      isCompleted: false,
      progress: 30
    },
    {
      moduleId: '4',
      name: 'Overcoming Social Anxiety',
      description: 'Build confidence and reduce anxiety in social situations with proven strategies.',
      category: 'confidence',
      isLocked: true,
      isCompleted: false,
      progress: 0
    },
    {
      moduleId: '5',
      name: 'Building Lasting Friendships',
      description: 'Learn how to nurture and maintain meaningful long-term relationships.',
      category: 'communication',
      isLocked: true,
      isCompleted: false,
      progress: 0
    }
  ];

  const filteredModules = mockSkillModules.filter(module => {
    if (selectedCategory === 'all') return true;
    return module.category === selectedCategory;
  });

  const completedModules = mockSkillModules.filter(m => m.isCompleted).length;
  const totalModules = mockSkillModules.length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  const handleStartModule = (moduleId: string) => {
    console.log('Starting module:', moduleId);
    // Implement module start logic
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
            <h1 className="text-2xl font-bold">Skill Building</h1>
            <p className="text-white/60">Grow your social confidence</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="card p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Trophy className="w-6 h-6 text-accent mr-2" />
              <span className="font-semibold">Your Progress</span>
            </div>
            <span className="text-2xl font-bold text-accent">{overallProgress}%</span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-white/60">
            <span>{completedModules} of {totalModules} modules completed</span>
            <span>Keep going!</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-accent text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All Skills
          </button>
          {Object.entries(SKILL_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === key 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Modules */}
      <div className="px-6 space-y-4">
        {filteredModules.map((module) => (
          <SkillModuleCard
            key={module.moduleId}
            module={module}
            onStart={() => handleStartModule(module.moduleId)}
          />
        ))}

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No modules found</h3>
            <p className="text-white/60">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Achievement Section */}
      <div className="p-6 mt-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Trophy className="w-5 h-5 text-accent mr-2" />
            Recent Achievement
          </h3>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-3">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-medium">Conversation Starter</p>
              <p className="text-sm text-white/60">Completed "Starting Conversations" module</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
