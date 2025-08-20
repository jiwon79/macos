# Control Panel Implementation Plan

## Overview
Implementation plan for macOS-style Control Panel based on Figma design specifications.
Design Reference: https://www.figma.com/design/zo2M1ycUac602ecufnvIZp/Apple-Design-Resources---macOS--Community-?node-id=3302-1167&m=dev

## Design Specifications

### Panel Container
- **Width**: 298px
- **Uses existing styles**: `controlPanel` from `src/domains/menu/views/menu-right/components/styles/panel.css.ts`
  - Light mode: rgba(209, 209, 209, 0.42)
  - Dark mode: rgba(45, 45, 45, 0.44)
  - Backdrop Filter: blur(60px) / blur(80px) in dark mode
- **Border Radius**: 20px (from controlPanel style)
- **Padding**: 8px

### Layout Structure
```
+-----------------------------+
|  Top Controls Grid (2x3)    |
+-----------------------------+
|  Focus Mode Section         |
+-----------------------------+
|  Display Slider             |
|  Sound Slider               |
+-----------------------------+
|  Media Player Control       |
+-----------------------------+
```

## Component Architecture

### 1. Main Container Component
**File**: ControlPanel.tsx
- Manages overall layout and state
- Uses `controlPanel` style from panel.css.ts
- Coordinates child component interactions

### 2. Control Tile Styles
**Note**: No separate ControlTile component - implement directly with style code
- **States**: enabled, disabled, expanded
- **Sizes**: 
  - Standard: 68px x 68px
  - Wide: 144px x 68px (2 columns)
  - Tall: 68px x 144px (2 rows)
- **Visual Properties**:
  - Background: COLORS.fill.secondary (enabled), COLORS.fill.quaternary (disabled)
  - Icon size: 20px x 20px
  - Label font: FONT.medium_11
  - Subtitle font: FONT.medium_11 with COLORS.text.secondary

### 3. Control Slider Component
**File**: ControlSlider.tsx
- **Dimensions**: Full width x 30px
- **Track**: 
  - Height: 30px
  - Background: COLORS.fill.tertiary
  - Border radius: 15px
- **Fill**:
  - Background: COLORS.white
  - Animated width based on value
- **Icon**: 
  - Size: 16px x 16px
  - Position: Left aligned, 7px padding

### 4. Media Control Component
**File**: MediaControl.tsx
- **Height**: 52px
- **Background**: COLORS.fill.secondary
- **Border Radius**: 10px
- **Content**:
  - App icon: 32px x 32px
  - App name: FONT.medium_12
  - Control buttons: 20px x 20px

### 5. Focus Mode Section
**File**: FocusMode.tsx
- **Background**: COLORS.fill.tertiary
- **Border Radius**: 10px
- **Padding**: 8px
- **Typography**: FONT.medium_11

## Style Tokens Usage

### Colors (from styleToken.css.ts)
```typescript
// Backgrounds
COLORS.fill.primary    // Main tile backgrounds
COLORS.fill.secondary  // Enabled states
COLORS.fill.tertiary   // Subtle backgrounds
COLORS.fill.quaternary // Disabled states
COLORS.fill.quinary    // Very subtle elements

// Text
COLORS.text.primary    // Main labels
COLORS.text.secondary  // Subtitles
COLORS.text.tertiary   // Disabled text

// Accent
COLORS.blue           // Active/selected states
COLORS.white          // Slider fills, active text
```

### Typography (from styleToken.css.ts)
```typescript
FONT.bold_13    // Section headers
FONT.medium_13  // Primary labels
FONT.medium_12  // Secondary labels
FONT.medium_11  // Tertiary labels, subtitles
```

### Effects
```typescript
BACKDROP_FILTER.panel.outer // Main panel blur effect
```

## Implementation Steps

### Phase 1: Core Components
1. Create tile styles directly in ControlPanel.css.ts
2. Implement ControlSlider with drag interaction
3. Build MediaControl with internal state management
4. Set up FocusMode dropdown

### Phase 2: Layout and Composition
1. Create ControlPanel container
2. Implement responsive grid layout
3. Add animation transitions
4. Integrate with existing menu system

### Phase 3: Interactions
1. Add hover states with opacity transitions
2. Implement click handlers for tiles
3. Add slider drag functionality
4. Connect to system state stores

### Phase 4: Polish and Dark Mode
1. Implement dark mode variants
2. Add smooth transitions
3. Optimize performance
4. Add accessibility attributes

## Component Props Interface

```typescript
interface ControlSliderProps {
  icon: string | React.ReactNode;
  value: number; // 0-100
  onChange: (value: number) => void;
}

interface MediaControlProps {
  // No props - component manages its own state internally
}
```

## Animation Specifications

### Hover Effects
- Tile hover: opacity 0.8, transition 150ms ease
- Slider hover: Scale icon to 1.1, transition 200ms ease

### State Changes
- Enable/disable: opacity and background-color transition 200ms ease
- Expand/collapse: height transition 250ms cubic-bezier(0.4, 0, 0.2, 1)

### Drag Interactions
- Slider drag: Update value in real-time, no transition
- Haptic feedback simulation: Brief scale to 0.95 on press

## Integration Points

### With Existing System
1. Use existing `panel.css.ts` styles (controlPanel, innerControlPanel)
2. Integrate with existing menu system
3. Reuse existing FloatingMenu patterns
4. Follow established component patterns in menu-right

## File Structure
```
src/domains/menu/views/menu-right/components/control/
├── ControlPanel.tsx
├── ControlPanel.css.ts  # Contains tile styles directly
├── components/
│   ├── ControlSlider.tsx
│   ├── ControlSlider.css.ts
│   ├── MediaControl.tsx
│   ├── MediaControl.css.ts
│   ├── FocusMode.tsx
│   └── FocusMode.css.ts
└── index.ts
```

## Testing Requirements
- Unit tests for each component
- Integration tests for control interactions
- Visual regression tests for hover/active states
- Accessibility tests for keyboard navigation
- Performance tests for slider dragging

## Accessibility
- ARIA labels for all controls
- Keyboard navigation support
- Screen reader announcements for state changes
- High contrast mode support
- Reduced motion support for animations

## Performance Considerations
- Use React.memo for tile components
- Debounce slider value updates
- Lazy load expanded sections
- Use CSS transforms for animations
- Virtualize long lists if needed

## Future Enhancements
- Add more control tiles (VPN, Screen Recording, etc.)
- Implement control customization
- Add gesture support for trackpad
- Integrate with real system APIs
- Add notification badges to tiles