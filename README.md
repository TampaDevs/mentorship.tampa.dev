# Tampa Devs Mentorship Platform

Welcome to the Tampa Devs Mentorship Platform! This application is designed to foster mentorship opportunities within our local tech community, connecting members for growth, knowledge exchange, and support. Whether you are a junior developer looking for guidance or a senior professional eager to share your expertise, this platform is here to help you build meaningful mentorship relationships.

## Table of Contents
1. [About the Platform](#about-the-platform)
2. [Key Features](#key-features)
   - [User Roles](#user-roles)
   - [Core Features](#core-features)
3. [Tech Stack](#tech-stack)
4. [Quickstart and Setup Guide](#quickstart-and-setup-guide)
5. [Deployment](#deployment)
6. [How to Contribute](#how-to-contribute)
7. [Learn More](#learn-more)
8. [Internal Documentation](#internal-documentation)
9. [License](#license)

## About the Platform

This mentorship platform is developed to serve a non-profit tech meetup group, supporting various forms of mentorship: junior-to-senior, senior-to-junior, and even senior-to-senior for cross-discipline knowledge sharing. The platform covers a wide range of tech domains, including:

- Frontend Development
- Backend Development
- DevOps
- Security
- AI/ML
- Databases
- Data Science

By providing features for personalized matching, goal tracking, and streamlined communication, the platform aims to make the mentorship process intuitive and effective.

## Key Features

### User Roles
- **Regular Users**: Sign up, create profiles, and participate as mentors or mentees. Users can manage mentorships, track progress, and receive notifications.
- **Admins**: Manage users, oversee mentorship requests, and respond to user inquiries.
- **Owners**: Configure platform-wide settings, manage admin roles, and access high-level analytics and configurations.

### Core Features
- **Onboarding**: Users specify skills, expertise, and mentorship preferences during onboarding to ensure effective matching.
- **User Dashboard**: A hub for mentorship activities, including viewing suggestions, managing current mentorships, and receiving notifications.
- **Mentorship Matching**: Matches users based on interests, expertise, and survey responses to ensure relevant and beneficial connections.
- **Mentorship Details**: In-app messaging, goal tracking, and mentorship progress monitoring to facilitate successful mentorship relationships.
- **Public Pages**: Informative pages about the mentorship program, organization values, FAQs, and contact information.

## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org) with [Tailwind CSS](https://tailwindcss.com) for styling, ShadCN components, and [shad/ui](https://shadcn.dev) for a cohesive design.
- **Backend**: [tRPC](https://trpc.io) for creating type-safe APIs with TypeScript, integrated with a Node.js server.
- **Database**: [Prisma](https://prisma.io) with PostgreSQL for user data, with plans for MongoDB if chat functionality is added.
- **Authentication**: [NextAuth.js](https://next-auth.js.org) for user authentication, supporting Google, GitHub, and email/password.

## Quickstart and Setup Guide

To get started with the Tampa Devs Mentorship Platform, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org) (v18.0.0 or higher recommended)
- [pnpm](https://pnpm.io) (v9.12.3 or higher)
- [PostgreSQL](https://www.postgresql.org) for database setup

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/tampa-devs/mentorship-platform.git
   cd mentorship-platform
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the environment variables:
   Create a `.env` file based on the `.env.example` provided, and add the necessary configurations (e.g., database URL, authentication secrets).

4. Set up the database:
   ```bash
   pnpm run db:generate
   pnpm run db:migrate
   ```

### Running the Application
1. Start the development server:
   ```bash
   pnpm run dev
   ```
   The application will be running on `http://localhost:3000`.

2. For production builds:
   ```bash
   pnpm run build
   pnpm run start
   ```

### Running with Docker (Optional)
To run the application using Docker, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t tampa-devs-mentorship-platform .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 --env-file .env tampa-devs-mentorship-platform
   ```
   The application will be accessible at `http://localhost:3000`.

### Additional Scripts
- **Linting**: To check code quality, run:
  ```bash
  pnpm run lint
  ```
- **Formatting**: To automatically format code, run:
  ```bash
  pnpm run format:write
  ```
- **Type Checking**: To verify TypeScript types, run:
  ```bash
  pnpm run typecheck
  ```

## Deployment
The platform can be deployed using scalable cloud solutions, with [Vercel](https://vercel.com) recommended for frontend deployment and [Railway](https://railway.app) or AWS for backend services, supporting easy scaling.

## How to Contribute
We welcome contributions to the Tampa Devs Mentorship Platform! Please feel free to fork the repository, submit pull requests, and help enhance the mentorship experience for the tech community.

## Learn More
If you'd like to learn more about the technologies used or how to get involved, explore the resources below:
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://prisma.io/docs)

For any questions or to get involved with Tampa Devs, please visit our website or contact us directly through the platform.

## Internal Documentation

For detailed information on the platform's architecture, data models, and business logic, refer to the internal documentation files:
- [Product Overview](./PRODUCT.md): Detailed description of the platform's features, user roles, and technical requirements.
- [Prisma Database Schema](./prisma/README.md): Comprehensive guide to the database schema, models, and relationships.
- [UI Directory](./src/ui/README.md): Detailed guide to the UI components and design system.

---
Ready to start mentoring or being mentored? Sign up today and begin your journey towards personal and professional growth with Tampa Devs!

