# Overview

Starry Events is a modern web application for managing and participating in Roblox gaming events with Robux rewards. The platform serves as the official website for a Discord server community, allowing users to discover events, participate in competitions, track rankings, and claim prizes. The application features a space/galaxy-themed design with dark mode support and focuses on creating an engaging gaming community experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture:

- **Routing**: Uses `wouter` for lightweight client-side routing
- **State Management**: React Query (`@tanstack/react-query`) for server state management and caching
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI components
- **Theme System**: Custom theme provider supporting light/dark mode with CSS variables
- **Build Tool**: Vite for fast development and optimized production builds

The application structure separates pages (`landing.tsx`, `home.tsx`, `not-found.tsx`) from reusable components, with a shared component library in the `ui` folder.

## Backend Architecture

The backend uses **Express.js** with **TypeScript** in an ESM configuration:

- **Authentication**: Replit OAuth2 integration for Discord-based user authentication
- **Session Management**: Express sessions with PostgreSQL storage using `connect-pg-simple`
- **API Design**: RESTful API endpoints organized by resource (users, events, rankings)
- **Middleware**: Custom logging middleware for API request tracking
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Data Storage

**Database**: PostgreSQL with **Drizzle ORM** for type-safe database operations:

- **Schema Management**: Centralized schema definitions in `shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema changes  
- **Connection**: Neon serverless PostgreSQL with connection pooling
- **Data Models**: Users, Events, Event Participants, Event Winners, and Sessions tables

## Authentication & Authorization

**Replit Auth Integration**:
- OAuth2 flow with Discord for user authentication
- User session management with secure HTTP-only cookies
- Protected routes with authentication middleware
- User profile data syncing (Discord ID, username, avatar)

## Key Features Implementation

**Event Management**: 
- Active and scheduled event tracking with time-based filtering
- Event participation with user enrollment tracking
- Countdown timers and real-time event status updates

**Gaming Integration**:
- Roblox game URL integration for direct game access
- Robux reward tracking and prize pool management
- User statistics (total Robux earned, events won)

**UI/UX Design**:
- Space-themed particle background animations
- Glass morphism design effects
- Responsive layout with mobile-first approach
- Smooth transitions and hover effects

# External Dependencies

## Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Replit**: Hosting platform with built-in authentication service

## Authentication Services
- **Replit Auth**: OAuth2 provider with Discord integration
- **OpenID Client**: OAuth2/OpenID Connect client implementation

## Frontend Libraries
- **React Query**: Server state management and caching
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: SVG icon library
- **React Icons**: Additional icon sets (Discord, social media)

## Backend Services
- **Express**: Web application framework
- **Drizzle ORM**: TypeScript ORM with PostgreSQL support
- **Passport**: Authentication middleware
- **Express Session**: Session management

## Development Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer