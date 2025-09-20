import { NextRequest, NextResponse } from 'next/server';
import { SkillModule } from '../../../lib/types';

// In-memory storage for demo purposes - replace with database in production
let skillModules: SkillModule[] = [
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    const category = searchParams.get('category');
    const userId = searchParams.get('userId');

    if (moduleId) {
      const module = skillModules.find(m => m.moduleId === moduleId);
      if (!module) {
        return NextResponse.json({ error: 'Skill module not found' }, { status: 404 });
      }
      return NextResponse.json({ data: module, success: true });
    }

    let filteredModules = skillModules;

    if (category && category !== 'all') {
      filteredModules = filteredModules.filter(m => m.category === category);
    }

    // If userId is provided, we could filter based on user progress
    // For now, return all modules

    return NextResponse.json({ data: filteredModules, success: true });
  } catch (error) {
    console.error('Error fetching skill modules:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, userId, progress, completed } = body;

    const moduleIndex = skillModules.findIndex(m => m.moduleId === moduleId);
    if (moduleIndex === -1) {
      return NextResponse.json({ error: 'Skill module not found' }, { status: 404 });
    }

    const module = skillModules[moduleIndex];

    if (progress !== undefined) {
      module.progress = Math.min(100, Math.max(0, progress));
    }

    if (completed !== undefined) {
      module.isCompleted = completed;
      if (completed) {
        module.progress = 100;
      }
    }

    // Unlock next modules based on completion
    if (module.isCompleted && module.moduleId === '1') {
      // Unlock module 4 after completing module 1
      const module4Index = skillModules.findIndex(m => m.moduleId === '4');
      if (module4Index !== -1) {
        skillModules[module4Index].isLocked = false;
      }
    }

    if (module.isCompleted && module.moduleId === '2') {
      // Unlock module 5 after completing module 2
      const module5Index = skillModules.findIndex(m => m.moduleId === '5');
      if (module5Index !== -1) {
        skillModules[module5Index].isLocked = false;
      }
    }

    skillModules[moduleIndex] = module;
    return NextResponse.json({ data: module, success: true });
  } catch (error) {
    console.error('Error updating skill module:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

