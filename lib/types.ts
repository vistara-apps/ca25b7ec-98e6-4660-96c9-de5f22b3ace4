export interface User {
  userId: string;
  farcasterId?: string;
  displayName: string;
  bio?: string;
  interests: string[];
  joinedGroups: string[];
  activeSessions: string[];
  avatar?: string;
}

export interface Group {
  groupId: string;
  name: string;
  description: string;
  topic: string;
  memberIds: string[];
  createdAt: Date;
  isPrivate: boolean;
  memberCount: number;
}

export interface Activity {
  activityId: string;
  name: string;
  description: string;
  creatorId: string;
  participants: string[];
  dateTime: Date;
  location: string;
  type: 'virtual' | 'in-person';
  maxParticipants?: number;
}

export interface AIChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  isAI: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface SkillModule {
  moduleId: string;
  name: string;
  description: string;
  category: 'communication' | 'empathy' | 'confidence' | 'listening';
  isLocked: boolean;
  isCompleted: boolean;
  progress: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
