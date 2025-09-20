import { NextRequest, NextResponse } from 'next/server';
import { Activity } from '../../../lib/types';

// In-memory storage for demo purposes - replace with database in production
let activities: Activity[] = [
  {
    activityId: '1',
    name: 'Virtual Coffee Chat',
    description: 'Casual conversation over coffee. Share stories, laugh, and connect.',
    creatorId: 'user_456',
    participants: ['user_123'],
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    location: 'Zoom Room',
    type: 'virtual',
    maxParticipants: 6
  },
  {
    activityId: '2',
    name: 'Book Discussion: "The Midnight Library"',
    description: 'Deep dive into this thought-provoking novel about life choices.',
    creatorId: 'user_789',
    participants: [],
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    location: 'Discord Voice Channel',
    type: 'virtual',
    maxParticipants: 8
  },
  {
    activityId: '3',
    name: 'Mindfulness Meditation',
    description: 'Guided meditation session to reduce stress and find inner peace.',
    creatorId: 'user_101',
    participants: ['user_123'],
    dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    location: 'Meditation App',
    type: 'virtual',
    maxParticipants: 10
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get('activityId');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'upcoming' or 'past'

    if (activityId) {
      const activity = activities.find(a => a.activityId === activityId);
      if (!activity) {
        return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
      }
      return NextResponse.json({ data: activity, success: true });
    }

    let filteredActivities = activities;

    if (userId) {
      filteredActivities = filteredActivities.filter(a => a.participants.includes(userId));
    }

    if (type === 'upcoming') {
      filteredActivities = filteredActivities.filter(a => a.dateTime > new Date());
    } else if (type === 'past') {
      filteredActivities = filteredActivities.filter(a => a.dateTime <= new Date());
    }

    // Sort by date (upcoming first, then past)
    filteredActivities.sort((a, b) => {
      if (a.dateTime > new Date() && b.dateTime <= new Date()) return -1;
      if (a.dateTime <= new Date() && b.dateTime > new Date()) return 1;
      return a.dateTime.getTime() - b.dateTime.getTime();
    });

    return NextResponse.json({ data: filteredActivities, success: true });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, creatorId, dateTime, location, type, maxParticipants } = body;

    if (!name || !description || !creatorId || !dateTime || !location || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newActivity: Activity = {
      activityId: `activity_${Date.now()}`,
      name,
      description,
      creatorId,
      participants: [creatorId], // Creator automatically joins
      dateTime: new Date(dateTime),
      location,
      type: type as 'virtual' | 'in-person',
      maxParticipants: maxParticipants || 10
    };

    activities.push(newActivity);
    return NextResponse.json({ data: newActivity, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { activityId, userId, action } = body;

    const activityIndex = activities.findIndex(a => a.activityId === activityId);
    if (activityIndex === -1) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    const activity = activities[activityIndex];

    if (action === 'join') {
      if (!activity.participants.includes(userId)) {
        if (activity.maxParticipants && activity.participants.length >= activity.maxParticipants) {
          return NextResponse.json({ error: 'Activity is full' }, { status: 400 });
        }
        activity.participants.push(userId);
      }
    } else if (action === 'leave') {
      activity.participants = activity.participants.filter(id => id !== userId);
    }

    activities[activityIndex] = activity;
    return NextResponse.json({ data: activity, success: true });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

