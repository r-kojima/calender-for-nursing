# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native Expo project built for nursing calendar management. The app uses:
- **Expo Router** for file-based routing with typed routes enabled
- **React Native Paper** for Material Design 3 components  
- **date-fns** for date manipulation and formatting
- **TypeScript** with strict mode and bundler module resolution

The project structure follows Expo's conventions with the main app code in the `app/` directory using file-based routing.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npx expo start

# Platform-specific development
npm run android    # Android emulator
npm run ios        # iOS simulator  
npm run web        # Web browser

# Testing and code quality
npm test           # Run Jest tests with watch mode
npm run lint       # Run Expo linting

# Reset project (moves starter code to app-example/)
npm run reset-project
```

## Architecture

### Core Structure
- **app/**: Main application code using Expo Router file-based routing
  - `_layout.tsx`: Root layout with theme providers (React Navigation, Paper, SafeArea)
  - `(tabs)/`: Tab-based navigation group
- **types/**: TypeScript type definitions for domain models
  - `schedule.ts`: Schedule/event data structure
  - `calendar.ts`: Calendar metadata
  - `shift.ts`, `user.ts`: Additional domain types
- **components/**: Reusable UI components with theming support
- **hooks/**: Custom React hooks for theme and color scheme management
- **constants/**: App-wide constants including color definitions

### Key Technical Patterns
- **Theming**: Dual theme system using React Navigation themes + Material Design 3 themes that automatically switch based on device color scheme
- **Date Handling**: Uses date-fns with Japanese locale for calendar operations and formatting
- **Type Safety**: Strong TypeScript typing with domain-specific types in dedicated files
- **State Management**: React state with useMemo/useCallback optimizations for performance

### Calendar Implementation
The main calendar view (`app/(tabs)/index.tsx`) implements:
- Monthly calendar grid with proper week alignment
- Date selection with visual feedback
- Schedule indicators for days with events
- Responsive cell sizing based on screen width
- Optimized rendering with memoized date calculations

### Configuration Notes
- **Module Resolution**: Uses bundler mode for improved import handling
- **New Architecture**: Expo new architecture is enabled
- **Path Mapping**: `@/*` aliases to project root for cleaner imports
- **Typed Routes**: Expo Router typed routes are enabled for type-safe navigation

When working on this project, maintain the existing architectural patterns and ensure proper TypeScript typing for all new code.