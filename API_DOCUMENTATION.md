# EchoSphere API Documentation

## Overview

EchoSphere is a Base MiniApp that connects individuals through peer support groups, shared activities, and AI companionship. This document outlines the API endpoints available for the application.

## Base URL

All API endpoints are relative to the application root: `/api/`

## Authentication

Currently, authentication is handled through Base wallet connection. All endpoints that require user identification expect a `userId` parameter.

## Endpoints

### Users

#### GET /api/users
Retrieve user information.

**Query Parameters:**
- `userId` (optional): Specific user ID to retrieve
- `farcasterId` (optional): Farcaster ID to retrieve user by

**Response:**
```json
{
  "data": {
    "userId": "string",
    "farcasterId": "string",
    "displayName": "string",
    "bio": "string",
    "interests": ["string"],
    "joinedGroups": ["string"],
    "activeSessions": ["string"],
    "avatar": "string"
  },
  "success": true
}
```

#### POST /api/users
Create a new user or retrieve existing user.

**Request Body:**
```json
{
  "farcasterId": "string",
  "displayName": "string",
  "bio": "string",
  "interests": ["string"]
}
```

**Response:**
```json
{
  "data": {
    "userId": "string",
    "farcasterId": "string",
    "displayName": "string",
    "bio": "string",
    "interests": ["string"],
    "joinedGroups": [],
    "activeSessions": [],
    "avatar": null
  },
  "success": true
}
```

#### PUT /api/users
Update user information.

**Request Body:**
```json
{
  "userId": "string",
  "displayName": "string",
  "bio": "string",
  "interests": ["string"]
}
```

### Groups

#### GET /api/groups
Retrieve groups with optional filtering.

**Query Parameters:**
- `groupId` (optional): Specific group ID to retrieve
- `topic` (optional): Filter by topic (e.g., "Mental Health")
- `search` (optional): Search in group name and description

**Response:**
```json
{
  "data": [
    {
      "groupId": "string",
      "name": "string",
      "description": "string",
      "topic": "string",
      "memberIds": ["string"],
      "createdAt": "2024-01-15T00:00:00.000Z",
      "isPrivate": false,
      "memberCount": 5
    }
  ],
  "success": true
}
```

#### POST /api/groups
Create a new group.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "topic": "string",
  "creatorId": "string",
  "isPrivate": false
}
```

#### PUT /api/groups
Join or leave a group.

**Request Body:**
```json
{
  "groupId": "string",
  "userId": "string",
  "action": "join" | "leave"
}
```

### Activities

#### GET /api/activities
Retrieve activities with optional filtering.

**Query Parameters:**
- `activityId` (optional): Specific activity ID to retrieve
- `userId` (optional): Filter activities for specific user
- `type` (optional): Filter by "upcoming" or "past"

**Response:**
```json
{
  "data": [
    {
      "activityId": "string",
      "name": "string",
      "description": "string",
      "creatorId": "string",
      "participants": ["string"],
      "dateTime": "2024-01-20T15:00:00.000Z",
      "location": "string",
      "type": "virtual",
      "maxParticipants": 10
    }
  ],
  "success": true
}
```

#### POST /api/activities
Create a new activity.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "creatorId": "string",
  "dateTime": "2024-01-20T15:00:00.000Z",
  "location": "string",
  "type": "virtual" | "in-person",
  "maxParticipants": 10
}
```

#### PUT /api/activities
Join or leave an activity.

**Request Body:**
```json
{
  "activityId": "string",
  "userId": "string",
  "action": "join" | "leave"
}
```

### AI Chat

#### POST /api/ai/chat
Send a message to the AI companion and receive a response.

**Request Body:**
```json
{
  "message": "string",
  "userId": "string",
  "conversationHistory": [
    {
      "id": "string",
      "message": "string",
      "isAI": false,
      "timestamp": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**Response:**
```json
{
  "data": {
    "response": "I'm here to listen. How are you feeling today?",
    "timestamp": "2024-01-15T10:00:05.000Z",
    "sentiment": "neutral"
  },
  "success": true
}
```

### Skills

#### GET /api/skills
Retrieve skill modules with optional filtering.

**Query Parameters:**
- `moduleId` (optional): Specific module ID to retrieve
- `category` (optional): Filter by category (e.g., "communication")

**Response:**
```json
{
  "data": [
    {
      "moduleId": "string",
      "name": "string",
      "description": "string",
      "category": "communication",
      "isLocked": false,
      "isCompleted": true,
      "progress": 100
    }
  ],
  "success": true
}
```

#### PUT /api/skills
Update skill module progress.

**Request Body:**
```json
{
  "moduleId": "string",
  "userId": "string",
  "progress": 75,
  "completed": false
}
```

### Farcaster Integration

#### GET /api/farcaster
Retrieve Farcaster user data.

**Query Parameters:**
- `fid`: Farcaster user ID

**Response:**
```json
{
  "data": {
    "fid": 123,
    "username": "user123",
    "displayName": "User Name",
    "bio": "User bio",
    "pfp": null,
    "custodyAddress": "0x...",
    "verifications": ["0x..."]
  },
  "success": true
}
```

#### POST /api/farcaster
Verify Farcaster signature.

**Request Body:**
```json
{
  "message": "string",
  "signature": "string",
  "fid": 123
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "success": false
}
```

## Data Models

### User
```typescript
interface User {
  userId: string;
  farcasterId?: string;
  displayName: string;
  bio?: string;
  interests: string[];
  joinedGroups: string[];
  activeSessions: string[];
  avatar?: string;
}
```

### Group
```typescript
interface Group {
  groupId: string;
  name: string;
  description: string;
  topic: string;
  memberIds: string[];
  createdAt: Date;
  isPrivate: boolean;
  memberCount: number;
}
```

### Activity
```typescript
interface Activity {
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
```

### AI Chat Message
```typescript
interface AIChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  isAI: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
}
```

### Skill Module
```typescript
interface SkillModule {
  moduleId: string;
  name: string;
  description: string;
  category: 'communication' | 'empathy' | 'confidence' | 'listening';
  isLocked: boolean;
  isCompleted: boolean;
  progress: number;
}
```

## Rate Limiting

- AI Chat: 50 requests per hour per user
- General endpoints: 100 requests per hour per user

## Environment Variables

Required environment variables:

- `OPENAI_API_KEY`: OpenAI API key for AI companion
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key for Base integration
- `FARCASTER_HUB_URL`: Farcaster Hub URL (optional)

## Future Enhancements

- Real-time chat functionality for groups
- Push notifications for activities and messages
- Advanced AI conversation memory
- Integration with external calendar systems
- Video calling capabilities for activities

