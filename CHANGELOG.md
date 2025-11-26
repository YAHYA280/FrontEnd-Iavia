# Changelog

All notable changes to this project will be documented in this file.

## [0.0.25-RELEASE]

### Added
- Knowledge Base file management API integration for Legal Agent
- Knowledge Base text management API integration (get/update text content)
- New Zustand store for centralized file and text state management (`knowledge-base-store.ts`)
- TypeScript interfaces matching backend DTOs (`knowledge-base.ts`)
- Centralized axios instance with request/response interceptors and development logging
- API endpoints configuration for file and text operations (`knowledge-base-endpoints.ts`)
- File upload with progress tracking and auto-refresh
- File download functionality with Blob handling
- File rename operation with optimistic UI updates
- File delete operation with optimistic UI updates
- File search functionality
- Text save/load functionality with real-time character count
- Snackbar notifications for all file and text operations
- Loading states and error handling for all API calls
- Support for multiple file uploads with success/failure tracking
- Environment configuration (`.env`)

### Changed
- Replaced mock data in `AgentTrainingSection.tsx` with real backend API integration
- Updated file list UI to display real-time data from backend
- Improved error handling with user-friendly error messages
- Enhanced file upload with progress indicator and auto-refresh
- Modernized file operation handlers (view, download, rename, delete) with async/await

### Fixed
- File upload success response handling and list auto-refresh
- Field name mismatch between frontend and backend (`fileUid` → `uid`, `fileSize` → `size`)
- File size display using correct backend field (`size`)
- File type display using backend-provided `fileType` field
- Date display using correct backend field (`createdAt`)
- Delete operation sending correct file UID to backend
- Download operation creating proper Blob URLs for file access
