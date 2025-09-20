'use client';

import { useState, useEffect } from 'react';
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
  const [skillModules, setSkillModules] = useState<SkillModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch skill modules from API
  useEffect(() => {
    const fetchSkillModules = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }

        const response = await fetch(`/api/skills?${params}`);
        const result = await response.json();

        if (result.success) {
          setSkillModules(result.data);
        } else {
          console.error('Failed to fetch skill modules:', result.error);
          // Fallback to mock data
          setSkillModules([
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
          ]);
        }
      } catch (error) {
        console.error('Error fetching skill modules:', error);
        // Fallback to mock data
        setSkillModules([
          {
            moduleId: '1',
            name: 'Starting Conversations',
            description: 'Learn effective techniques to initiate meaningful conversations with confidence.',
            category: 'communication',
            isLocked: false,
            isCompleted: true,
            progress: 100
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillModules();
  }, [selectedCategory]);

  const filteredModules = skillModules;
  const completedModules = skillModules.filter(m => m.isCompleted).length;
  const totalModules = skillModules.length;
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  const handleStartModule = async (moduleId: string) => {
    try {
      // For demo purposes, we'll simulate progress updates
      // In a real app, this would track actual module completion
      const progressIncrease = Math.floor(Math.random() * 30) + 10; // 10-40% progress

      const response = await fetch('/api/skills', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId,
          userId: user.userId,
          progress: progressIncrease,
          completed: Math.random() > 0.7 // 30% chance of completion
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setSkillModules(prevModules =>
          prevModules.map(module =>
            module.moduleId === moduleId
              ? result.data
              : module
          )
        );
      } else {
        console.error('Failed to update skill module:', result.error);
      }
    } catch (error) {
      console.error('Error updating skill module:', error);
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
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Loading skill modules...</p>
          </div>
        ) : (
          <>
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
          </>
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
