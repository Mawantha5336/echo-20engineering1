# Fusion Starter - Eco Engineering

A production-ready full-stack React application for managing telecommunication infrastructure projects and equipment.

## Project Overview

This is a complete full-stack application featuring:
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express server with integrated API
- **Routing**: React Router 6 (SPA mode)
- **UI Library**: Radix UI components + Lucide React icons
- **Data Storage**: Supabase (PostgreSQL) cloud database
- **Package Manager**: pnpm

## Recent Changes

### November 30, 2025 - Fixed Navigation in Service Pages
- Fixed ProjectsEquipment.tsx and POProjectsView.tsx navigation bars
- Replaced inline navigation with incorrect HTML file links (e.g., /echo/index1.html) with shared PageNavigation component
- Replaced inline footers with shared PageFooter component
- All service pages now use consistent React Router navigation
- Services dropdown menu now correctly links to: /services, /projects-equipment, /po-projects, /supply-equipment

### November 29, 2025 - Supabase Database Integration for Netlify Deployment
- Migrated from file-based JSON storage to Supabase cloud database
- Created supabase-storage.ts with full CRUD operations for all data types
- Updated all API routes to use async/await with Supabase
- Added supabase-schema.sql with database table definitions
- Updated netlify.toml with SPA routing support
- All data now persists in cloud database, works with Netlify serverless functions

### November 28, 2025 - New Landing Page (Home.tsx)
- Converted index1.html to a React TSX component (Home.tsx)
- Features animated slideshow banner with 3 slides (auto-advance every 5 seconds)
- Includes Services section with 3 service cards (Network Infrastructure, Tower Construction, Smart City Solutions)
- About section with animated image slider
- Featured Projects showcase section
- Call-to-action section
- Uses PageNavigation and PageFooter components for consistent navigation
- Framer Motion animations throughout
- All navigation links use React Router's Link component

### November 28, 2025 - Fixed Careers Navigation
- Updated Careers.tsx to use React Router's Link component instead of HTML anchor tags
- Navigation now matches all other interfaces with proper routing
- Added active state highlighting for current page

### November 28, 2025 - PDF Export and Print Report Functionality
- Added PDF export and print report functionality to Admin panel
- Projects tab: Download PDF or print full projects report
- Equipment tab: Download PDF or print full equipment report
- P/O Projects tab: Download PDF or print full P/O projects report
- Applications tab: Download PDF or print full job applications report
- Reports include metadata (generated date, total counts, status summaries)
- Uses jsPDF with autotable for professional PDF generation
- Print function opens formatted report in new window for browser printing
- CV buttons in Applications now show only icons (download/view) without text

### November 27, 2025 - Dark Navy Theme and Footer for Public Interfaces
- Applied dark navy blue gradient background theme to Projects & Equipment page
- Applied same dark navy blue theme to P/O Projects page
- Theme features: gradient background (#0a0a1a to #0d1033), indigo-tinted cards/sections
- Table colors remain unchanged as requested
- Admin panel interface remains unchanged as requested
- Added reusable Footer component (client/components/Footer.tsx)
- Footer includes: EC/Eco logo with description, social media icons, Quick Links, Contact Us section
- Footer includes: copyright notice, Privacy Policy/Terms of Service links, scroll-to-top button

### November 27, 2025 - Data Persistence and User Interfaces
- Added file-based JSON storage system for persistent data (server/storage.ts)
- Created API endpoints for projects, equipment, and P/O projects CRUD operations
- Added public "Projects & Equipment" page for users to view all projects and equipment
- Added public "P/O Projects" page for users to view all purchase order projects
- Updated Admin panel to use API for data persistence (UI unchanged)
- Added navigation links to all new pages in header

### November 27, 2025 - GitHub Import & Replit Environment Setup
- Successfully imported project from GitHub
- Installed all dependencies with pnpm (464 packages)
- Configured development workflow "Start application" (pnpm dev on port 5000)
- Vite dev server already configured for Replit (host 0.0.0.0, port 5000, allowedHosts: true)
- Updated production server to bind to 0.0.0.0:5000 for deployment compatibility
- Configured deployment with autoscale target (build: pnpm build, run: node dist/server/node-build.mjs)
- Created missing po-projects.json data file
- Verified successful build and application functionality

## Project Structure

```
client/                   # React SPA frontend
├── pages/               # Route components
│   ├── Index.tsx        # Home page (Eco Engineering landing)
│   ├── Admin.tsx        # Admin panel for project management
│   ├── ProjectsEquipment.tsx  # Public projects & equipment view
│   ├── POProjectsView.tsx     # Public P/O projects view
│   ├── Login.tsx        # Login page
│   ├── Signup.tsx       # Signup page
│   └── NotFound.tsx     # 404 page
├── components/          # React components
│   ├── ui/             # Radix UI component library
│   ├── Layout.tsx      # Main layout wrapper with navigation
│   └── ProtectedRoute.tsx  # Auth protection wrapper
├── context/
│   └── AuthContext.tsx  # Authentication context
├── App.tsx             # App entry point with routing
└── global.css          # TailwindCSS theming

server/                  # Express API backend
├── routes/             # API route handlers
│   ├── data.ts         # Projects, equipment, P/O projects endpoints
│   └── demo.ts         # Demo endpoints
├── supabase-storage.ts # Supabase database storage service
├── storage.ts          # Legacy file-based storage (deprecated)
├── index.ts            # Server setup and configuration
└── node-build.ts       # Production server entry point

netlify/functions/       # Netlify serverless functions
└── api.ts              # Express server as serverless function

shared/                  # Shared types between client/server
└── api.ts              # API interfaces
```

## Development

### Running the Application
The application runs on port 5000 in development mode. The workflow "Start application" is configured to run `pnpm dev`, which starts both the Vite dev server and the Express backend on a single port.

### Available Routes
- `/` - Home page (Eco Engineering landing page)
- `/projects-equipment` - Public view of all projects and equipment
- `/po-projects` - Public view of all P/O projects
- `/admin` - Admin panel for managing projects and equipment (requires login)
- `/login` - User login page
- `/signup` - User signup page

### API Endpoints
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create new equipment
- `DELETE /api/equipment/:id` - Delete equipment
- `GET /api/po-projects` - Get all P/O projects
- `POST /api/po-projects` - Create a new P/O project
- `DELETE /api/po-projects/:id` - Delete a P/O project

### Key Features
- Single-port development (Vite + Express integration)
- Hot module replacement (HMR) for rapid development
- Supabase cloud database for persistent storage
- Client-side authentication with localStorage
- Protected admin routes
- Public user interfaces for viewing data
- Comprehensive UI component library
- Project and equipment management interface

## Production Deployment

The application is configured for deployment with:
- **Build command**: `pnpm build` (builds both client and server)
- **Run command**: `node dist/server/node-build.mjs`
- **Deployment target**: Autoscale

### Build Process
1. Client build: Vite bundles the React SPA to `dist/spa`
2. Server build: Vite bundles the Express server to `dist/server`
3. Production server serves the built SPA and handles API routes

## Architecture Notes

- Uses React Router 6 for client-side routing
- Express server integrated with Vite during development
- TypeScript throughout for type safety
- TailwindCSS for styling with custom theme
- Path aliases: `@/*` for client, `@shared/*` for shared code
- Supabase cloud database for data persistence
- JSON body limit set to 50mb to handle base64 image uploads

## User Preferences

- Package manager: pnpm (preferred)
- Component library: Radix UI with TailwindCSS
- Testing: Vitest
- Admin panel UI should not be modified, only data handling logic
