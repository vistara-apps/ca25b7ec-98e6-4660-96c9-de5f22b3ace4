import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../lib/types';

// In-memory storage for demo purposes - replace with database in production
let users: User[] = [
  {
    userId: 'user_123',
    farcasterId: 'fc_456',
    displayName: 'Alex Chen',
    bio: 'Looking to connect with like-minded people',
    interests: ['Mental Health', 'Social Anxiety', 'Book Club'],
    joinedGroups: [],
    activeSessions: [],
    avatar: null
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const farcasterId = searchParams.get('farcasterId');

    if (userId) {
      const user = users.find(u => u.userId === userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ data: user, success: true });
    }

    if (farcasterId) {
      const user = users.find(u => u.farcasterId === farcasterId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ data: user, success: true });
    }

    return NextResponse.json({ data: users, success: true });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, displayName, bio, interests } = body;

    if (!farcasterId || !displayName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    let existingUser = users.find(u => u.farcasterId === farcasterId);

    if (existingUser) {
      // Update existing user
      existingUser.displayName = displayName;
      existingUser.bio = bio || existingUser.bio;
      existingUser.interests = interests || existingUser.interests;
      return NextResponse.json({ data: existingUser, success: true });
    }

    // Create new user
    const newUser: User = {
      userId: `user_${Date.now()}`,
      farcasterId,
      displayName,
      bio: bio || '',
      interests: interests || [],
      joinedGroups: [],
      activeSessions: [],
      avatar: null
    };

    users.push(newUser);
    return NextResponse.json({ data: newUser, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, displayName, bio, interests, joinedGroups } = body;

    const userIndex = users.findIndex(u => u.userId === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[userIndex];

    if (displayName !== undefined) user.displayName = displayName;
    if (bio !== undefined) user.bio = bio;
    if (interests !== undefined) user.interests = interests;
    if (joinedGroups !== undefined) user.joinedGroups = joinedGroups;

    users[userIndex] = user;
    return NextResponse.json({ data: user, success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

