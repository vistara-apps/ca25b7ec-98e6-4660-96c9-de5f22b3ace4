'use client';

import { Lock, CheckCircle, Play, Clock } from 'lucide-react';
import { SkillModule } from '../lib/types';
import { SKILL_CATEGORIES } from '../lib/constants';

interface SkillModuleCardProps {
  module: SkillModule;
  onStart: () => void;
  variant?: 'locked' | 'unlocked' | 'completed';
}

export function SkillModuleCard({ module, onStart }: SkillModuleCardProps) {
  const getStatusIcon = () => {
    if (module.isCompleted) {
      return <CheckCircle className="w-6 h-6 text-accent" />;
    }
    if (module.isLocked) {
      return <Lock className="w-6 h-6 text-white/40" />;
    }
    return <Play className="w-6 h-6 text-accent" />;
  };

  const getStatusText = () => {
    if (module.isCompleted) return 'Completed';
    if (module.isLocked) return 'Locked';
    if (module.progress > 0) return 'Continue';
    return 'Start Module';
  };

  const getButtonStyle = () => {
    if (module.isLocked) {
      return 'bg-white/10 text-white/50 cursor-not-allowed';
    }
    if (module.isCompleted) {
      return 'bg-accent/20 text-accent';
    }
    return 'bg-accent text-white hover:bg-accent/90';
  };

  return (
    <div className={`card p-4 ${module.isLocked ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-3">
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="font-semibold">{module.name}</h3>
            <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
              {SKILL_CATEGORIES[module.category]}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-white/80 mb-4 leading-relaxed">
        {module.description}
      </p>

      {/* Progress Bar (only show if module is started but not completed) */}
      {module.progress > 0 && !module.isCompleted && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-white/60 mb-1">
            <span>Progress</span>
            <span>{module.progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-white/50">
          <Clock className="w-4 h-4 mr-1" />
          <span>15-20 min</span>
        </div>
        
        <button
          onClick={onStart}
          disabled={module.isLocked}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getButtonStyle()}`}
        >
          {getStatusText()}
        </button>
      </div>
    </div>
  );
}
