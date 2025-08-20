# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
yarn dev

# Production build
yarn build

# Lint check
yarn lint

# Auto-fix linting issues
yarn lint:fix

# Run tests
yarn test

# Type check
yarn typecheck
```

## Architecture Overview

**macOS Web React** is a React-based web application that recreates the macOS desktop experience in a browser using modern web technologies.

### Core Components

- **domains/window/**: Window management system with drag, resize, focus, and minimize
- **domains/dock/**: macOS-style dock with icon magnification and app management
- **domains/menu/**: Floating UI-based menu system
- **domains/app/**: Pluggable application architecture (Calculator, Finder)
- **domains/window-animation/**: Canvas-based Genie effect animations

### Technical Stack

- **Frontend**: React 18 + TypeScript with Vite/SWC
- **Styling**: Vanilla Extract (zero-runtime CSS-in-JS)
- **State**: Zustand with action separation pattern
- **Animation**: Framer Motion + Canvas API
- **Testing**: Vitest + React Testing Library
- **Quality**: Biome (linting & formatting)

### Key Architectural Patterns

1. **Domain-Driven Structure**: Business logic organized by domain
2. **Module System**: Reusable technical modules (movable, resizable)
3. **Action Separation**: Zustand stores with separated actions
4. **Type Safety**: Comprehensive TypeScript throughout
5. **Performance**: Canvas animations, event delegation, memoization

### File Locations

- Core domains: `/src/domains/*/`
- Reusable modules: `/src/modules/*/`
- Third-party wrappers: `/src/third-parties/*/`
- Utilities: `/src/utils/*/`
- Application icons: `/src/assets/app-icons/`

### Development Workflow

1. Make changes to source code
2. Run `yarn lint:fix` to format code
3. Run `yarn typecheck` to verify types
4. Run `yarn test` to verify changes
5. Use `yarn build` to test production build

### Working with Current Directory

You are in the root of the macOS Web React project. Key areas:

- **Window System**: Handles dragging, resizing, focus, minimize/restore
- **Dock Implementation**: Distance-based magnification, app launching
- **Animation Engine**: Bézier curve-based transformations
- **Application System**: Pluggable apps with standardized interface

### Performance Notes

- Uses Canvas API for hardware-accelerated animations
- Implements custom drag/drop with event delegation
- Zero-runtime CSS with Vanilla Extract
- Appropriate React optimization (memo, useMemo)

### Code Conventions

- Components: PascalCase
- Utilities: camelCase
- Barrel exports via `index.ts`
- Test files colocated with source (`.test.ts`)
- Domain-based folder organization
