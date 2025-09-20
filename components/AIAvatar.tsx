'use client';

import { Sparkles, Heart } from 'lucide-react';

interface AIAvatarProps {
  variant: 'idle' | 'speaking';
}

export function AIAvatar({ variant }: AIAvatarProps) {
  return (
    <div className={`w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center ${
      variant === 'speaking' ? 'animate-pulse' : ''
    }`}>
      {variant === 'speaking' ? (
        <Sparkles className="w-5 h-5 text-white" />
      ) : (
        <Heart className="w-5 h-5 text-white" />
      )}
    </div>
  );
}
