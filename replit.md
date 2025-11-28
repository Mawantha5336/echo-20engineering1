# Fusion Starter - Eco Engineering

A production-ready full-stack React application for managing telecommunication infrastructure projects and equipment.

## Project Overview

This is a complete full-stack application featuring:
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express server with integrated API
- **Routing**: React Router 6 (SPA mode)
- **UI Library**: Radix UI components + Lucide React icons
- **Data Storage**: File-based JSON storage with persistent data
- **Package Manager**: pnpm

## Recent Changes

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
├── storage.ts          # File-based JSON storage service
├── index.ts            # Server setup and configuration
└── node-build.ts       # Production server entry point

data/                    # Persistent data storage
├── projects.json       # Projects data
├── equipment.json      # Equipment data
└── po-projects.json    # P/O projects data

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
- File-based persistent data storage
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
- File-based JSON storage for data persistence (no database required)
- JSON body limit set to 50mb to handle base64 image uploads

## User Preferences

- Package manager: pnpm (preferred)
- Component library: Radix UI with TailwindCSS
- Testing: Vitest
- Admin panel UI should not be modified, only data handling logic
