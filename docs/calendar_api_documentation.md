# Calendar API Documentation

## Overview

This document describes the REST API endpoints for the Calendar application. The API provides full CRUD operations for calendar events and supports various filtering and querying options.

**Base URL:** `http://localhost:3000/api`

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

## Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string,
  "timestamp": string
}
```

## Data Models

### Event

```typescript
{
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'confirmed' | 'cancelled';
  allDay: boolean;
  color: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### 1. Create Event

**POST** `/api/calendar/events`

Creates a new calendar event.

**Request Body:**
```json
{
  "title": "Meeting with Team",
  "description": "Weekly team standup meeting",
  "startDate": "2024-01-15T09:00:00.000Z",
  "endDate": "2024-01-15T10:00:00.000Z",
  "location": "Conference Room A",
  "priority": "medium",
  "status": "pending",
  "allDay": false,
  "color": "#3b82f6",
  "category": "work"
}
```

**Response:**
- **Status:** `201 Created`
- **Body:** Event object with generated ID and timestamps

**Validation Rules:**
- `title`: Required, string
- `startDate`: Required, ISO date string
- `endDate`: Required, ISO date string
- `priority`: Optional, enum: 'low', 'medium', 'high'
- `status`: Optional, enum: 'pending', 'confirmed', 'cancelled'
- `allDay`: Optional, boolean (default: false)
- `color`: Optional, string (default: '#3b82f6')

### 2. Get All Events

**GET** `/api/calendar/events`

Retrieves a paginated list of events with optional filtering.

**Query Parameters:**
- `startDate` (optional): Filter events starting from this date (ISO string)
- `endDate` (optional): Filter events ending before this date (ISO string)
- `category` (optional): Filter by event category
- `priority` (optional): Filter by priority ('low', 'medium', 'high')
- `status` (optional): Filter by status ('pending', 'confirmed', 'cancelled')
- `search` (optional): Search in title and description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Example Request:**
```
GET /api/calendar/events?startDate=2024-01-01&endDate=2024-01-31&category=work&page=1&limit=10
```

**Response:**
- **Status:** `200 OK`
- **Body:**
```json
{
  "events": [Event],
  "total": number,
  "page": number,
  "limit": number
}
```

### 3. Get Event by ID

**GET** `/api/calendar/events/:id`

Retrieves a specific event by its ID.

**Parameters:**
- `id`: Event ID (string)

**Response:**
- **Status:** `200 OK` - Event found
- **Status:** `404 Not Found` - Event not found
- **Body:** Event object

### 4. Update Event

**PATCH** `/api/calendar/events/:id`

Updates an existing event. Only provided fields will be updated.

**Parameters:**
- `id`: Event ID (string)

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Meeting Title",
  "description": "Updated description",
  "startDate": "2024-01-15T10:00:00.000Z",
  "endDate": "2024-01-15T11:00:00.000Z",
  "status": "confirmed"
}
```

**Response:**
- **Status:** `200 OK` - Event updated
- **Status:** `404 Not Found` - Event not found
- **Body:** Updated event object

### 5. Delete Event

**DELETE** `/api/calendar/events/:id`

Deletes an event by its ID.

**Parameters:**
- `id`: Event ID (string)

**Response:**
- **Status:** `204 No Content` - Event deleted
- **Status:** `404 Not Found` - Event not found

### 6. Get Events by Week

**GET** `/api/calendar/events/week/:year/:week`

Retrieves all events for a specific week.

**Parameters:**
- `year`: Year (number)
- `week`: Week number (1-53)

**Example Request:**
```
GET /api/calendar/events/week/2024/3
```

**Response:**
- **Status:** `200 OK`
- **Body:** Array of events for the specified week

### 7. Get Events by Month

**GET** `/api/calendar/events/month/:year/:month`

Retrieves all events for a specific month.

**Parameters:**
- `year`: Year (number)
- `month`: Month (1-12)

**Example Request:**
```
GET /api/calendar/events/month/2024/1
```

**Response:**
- **Status:** `200 OK`
- **Body:** Array of events for the specified month

## Error Handling

The API uses standard HTTP status codes and returns detailed error information:

### Common Error Responses

**400 Bad Request**
```json
{
  "success": false,
  "statusCode": 400,
  "timestamp": "2024-01-15T10:00:00.000Z",
  "path": "/api/calendar/events",
  "method": "POST",
  "message": "Validation failed",
  "error": {
    "message": ["title should not be empty", "startDate must be a valid ISO 8601 date string"]
  }
}
```

**404 Not Found**
```json
{
  "success": false,
  "statusCode": 404,
  "timestamp": "2024-01-15T10:00:00.000Z",
  "path": "/api/calendar/events/123",
  "method": "GET",
  "message": "Event with ID 123 not found",
  "error": "Not Found"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "statusCode": 500,
  "timestamp": "2024-01-15T10:00:00.000Z",
  "path": "/api/calendar/events",
  "method": "POST",
  "message": "Internal server error",
  "error": "Internal server error"
}
```

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:4200` (Angular development server)
- `http://localhost:3000` (Local testing)

Allowed methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
Allowed headers: `Content-Type`, `Authorization`

## Example Usage

### Creating a New Event

```javascript
const response = await fetch('http://localhost:3000/api/calendar/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Team Meeting',
    description: 'Weekly team standup',
    startDate: '2024-01-15T09:00:00.000Z',
    endDate: '2024-01-15T10:00:00.000Z',
    category: 'work',
    priority: 'medium'
  })
});

const event = await response.json();
```

### Fetching Events for Current Week

```javascript
const currentDate = new Date();
const year = currentDate.getFullYear();
const week = getWeekNumber(currentDate); // You'll need to implement this

const response = await fetch(`http://localhost:3000/api/calendar/events/week/${year}/${week}`);
const events = await response.json();
```

### Searching Events

```javascript
const response = await fetch('http://localhost:3000/api/calendar/events?search=meeting&status=confirmed&limit=20');
const result = await response.json();
const { events, total, page, limit } = result;
```

## Integration with Angular Calendar

The Angular calendar component can integrate with these APIs by:

1. **Loading Events**: Use `GET /api/calendar/events/week/:year/:week` to load events for the current week view
2. **Creating Events**: Implement event creation forms that POST to `/api/calendar/events`
3. **Event Details**: Use `GET /api/calendar/events/:id` to show event details
4. **Event Updates**: Implement edit functionality using `PATCH /api/calendar/events/:id`
5. **Event Deletion**: Add delete functionality using `DELETE /api/calendar/events/:id`

## Future Enhancements

Potential API improvements:
- Authentication and authorization
- Event recurrence patterns
- Event reminders and notifications
- Calendar sharing and permissions
- Event attachments
- Time zone support
- Bulk operations
- Event templates
- Integration with external calendar systems (Google Calendar, Outlook)
