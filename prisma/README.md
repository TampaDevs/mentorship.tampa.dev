# Prisma Database Schema

This document outlines the schema models, their fields, relationships, and the business logic that drives the mentorship platform's core features.

## Table of Contents
1. [Models Overview](#models-overview)
2. [Business Logic and Relationships](#business-logic-and-relationships)
   - [User Roles and Permissions](#user-roles-and-permissions)
   - [Mentorship Relationships](#mentorship-relationships)
   - [Mentorship Matching and Suggestions](#mentorship-matching-and-suggestions)
   - [In-App Messaging](#in-app-messaging)
3. [Database Seeding](#database-seeding)

## Models Overview

### User
The `User` model represents all members of the platform, whether mentors, mentees, admins, or owners. Key fields include:
- **role**: Defines the user's access level (`REGULAR`, `ADMIN`, or `OWNER`).
- **mentor_skills** and **mentee_skills**: Lists the skills a user offers as a mentor or seeks as a mentee, supporting skill-based matching.
- **notificationPreferences**: Stores user preferences for notifications.
- **mentor_mentorships** and **mentee_mentorships**: Track mentorship relationships for users as mentors or mentees.

### Skill
The `Skill` model holds all available skills, mapped to `mentor_skills` and `mentee_skills` in the `User` model. Skills are matched during onboarding to improve the effectiveness of mentorship suggestions.

### Mentorship
The `Mentorship` model represents a mentorship relationship between a mentor and a mentee. Key fields include:
- **status**: Indicates the mentorship’s current state (e.g., `PENDING`, `ACTIVE`, `COMPLETED`).
- **goals**: Tracks goals set by the mentee and mentor at the start, supporting progress tracking.
- **notes**: Allows mentors and mentees to document insights, session summaries, or progress.

### Suggestion
The `Suggestion` model stores mentorship suggestions to match mentors and mentees based on skills and preferences. Fields include:
- **status**: Represents the user’s response to the suggestion (`PENDING`, `ACCEPTED`, or `DECLINED`).
- **mentor** and **mentee**: References to the suggested mentor and mentee for this recommendation.

### Message
The `Message` model supports in-app messaging between mentors and mentees, fostering real-time communication. Key fields:
- **mentorshipId**: Associates the message with a specific mentorship relationship.
- **content**: Stores the content of the message.
- **sentAt**: Timestamp of when the message was sent.

### Account, Session, and VerificationToken
These models are part of the NextAuth.js setup for handling user accounts, sessions, and token verification for secure user authentication.

## Business Logic and Relationships

### User Roles and Permissions
The platform supports three user roles:
1. **Regular Users**: Can act as mentors or mentees, manage their profiles, view mentorship suggestions, and access dashboards.
2. **Admins**: Manage user accounts, oversee mentorship requests, and monitor platform usage.
3. **Owners**: Have access to all administrative settings, including user management and high-level platform configurations.

Roles are managed through the `role` field in the `User` model, enabling flexible and role-based access control across the platform.

### Mentorship Relationships
The `Mentorship` model enables multiple mentors and mentees for each user, allowing:
- Users to participate in multiple mentorships simultaneously, whether as mentors or mentees.
- Progress tracking through the `status`, `goals`, and `notes` fields to support meaningful mentorship connections.
- Mentorship lifecycle management from `PENDING` to `COMPLETED`.

This many-to-many relationship between `User` and `Mentorship` ensures scalability in supporting varied mentorship connections.

### Mentorship Matching and Suggestions
The `Suggestion` model facilitates the matching of mentors and mentees based on shared skills, interests, and survey responses. This matching process is enabled by:
- **mentor_skills** and **mentee_skills** in `User`, which map user expertise and needs to available skills in the `Skill` model.
- The ability for users to accept or decline suggestions, allowing them to choose connections that best fit their goals.

### In-App Messaging
The `Message` model supports communication between mentors and mentees, allowing messages to be tied to a specific `Mentorship`. The platform uses these messages to:
- Enable mentors and mentees to communicate directly within the app.
- Support real-time engagement and guidance as mentorship progresses.
- Log and track communications over the mentorship duration.

## Database Seeding

The platform includes comprehensive seed data for development and testing purposes. The seeding process populates all models with realistic test data:

### Skills
- Predefined set of 10 technical skills including Frontend, Backend, DevOps, etc.
- Each skill includes a human-readable name and URL-friendly slug

### Users
- Creates 10 sample users with varied roles (Regular, Admin, Owner)
- Includes realistic profile data: names, emails, job titles, locations
- Generates structured availability schedules and notification preferences
- References: ```typescript:prisma/seeds/users.ts
startLine: 7
endLine: 39

### Conversations
- Generates 20 sample conversations between users.
- Each conversation includes a series of messages to simulate real interactions.
- References: ```typescript:prisma/seeds/conversations.ts
startLine: 1
endLine: 39

The seeding process follows this order:
1. Skills (foundation for matching)
2. Users (core entities)
3. Accounts (authentication)
4. Sessions (user sessions)
5. Mentorships (relationships)
6. Messages (communication)
7. Suggestions (matching)
8. Conversations (user interactions)

This ensures proper relationship handling and referential integrity across all models.
