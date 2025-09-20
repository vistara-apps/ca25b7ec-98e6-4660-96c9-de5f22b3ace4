import { NextRequest, NextResponse } from 'next/server';
import { Group } from '../../../lib/types';

// In-memory storage for demo purposes - replace with database in production
let groups: Group[] = [
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
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const topic = searchParams.get('topic');
    const search = searchParams.get('search');

    if (groupId) {
      const group = groups.find(g => g.groupId === groupId);
      if (!group) {
        return NextResponse.json({ error: 'Group not found' }, { status: 404 });
      }
      return NextResponse.json({ data: group, success: true });
    }

    let filteredGroups = groups;

    if (topic && topic !== 'all') {
      filteredGroups = filteredGroups.filter(g => g.topic === topic);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredGroups = filteredGroups.filter(g =>
        g.name.toLowerCase().includes(searchLower) ||
        g.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ data: filteredGroups, success: true });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, topic, creatorId, isPrivate = false } = body;

    if (!name || !description || !topic || !creatorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newGroup: Group = {
      groupId: `group_${Date.now()}`,
      name,
      description,
      topic,
      memberIds: [creatorId],
      createdAt: new Date(),
      isPrivate,
      memberCount: 1
    };

    groups.push(newGroup);
    return NextResponse.json({ data: newGroup, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { groupId, userId, action } = body;

    const groupIndex = groups.findIndex(g => g.groupId === groupId);
    if (groupIndex === -1) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const group = groups[groupIndex];

    if (action === 'join') {
      if (!group.memberIds.includes(userId)) {
        group.memberIds.push(userId);
        group.memberCount = group.memberIds.length;
      }
    } else if (action === 'leave') {
      group.memberIds = group.memberIds.filter(id => id !== userId);
      group.memberCount = group.memberIds.length;
    }

    groups[groupIndex] = group;
    return NextResponse.json({ data: group, success: true });
  } catch (error) {
    console.error('Error updating group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

