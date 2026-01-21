# AGENTS.md

This document provides guidelines for AI agents working on this codebase.

## Build Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Code Style Guidelines

### General Principles

- Write clear, self-documenting code with Chinese comments and UI text
- Follow React 19 and Next.js 16 App Router best practices
- Use functional components with hooks
- Prefer composition over abstraction
- Keep components focused and single-responsibility

### File Naming

- **Components**: PascalCase (e.g., `JsonConverter.jsx`, `Button.jsx`)
- **Utils/Hooks**: camelCase (e.g., `utils.js`, `useCopyClipboard.js`)
- **Config files**: kebab-case or lowercase (e.g., `eslint.config.mjs`, `next.config.mjs`)
- **Data files**: camelCase (e.g., `tools.js`)

### Component Structure

```javascript
"use client"; // Required for client-side components

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { IconName } from "lucide-react";

export default function ComponentName() {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Derived state
  const derivedValue = computeSomething(state);

  // Event handlers
  const handleEvent = () => {
    // Implementation
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Import Organization

1. React imports (useState, useEffect, etc.)
2. Third-party UI components (@/components/ui/*)
3. Custom components (@/components/*)
4. Hooks (@/hooks/*)
5. Icons (lucide-react)
6. Utilities (@/lib/*)
7. Data (@/data/*)

```javascript
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { tools } from "@/data/tools";
```

### Path Aliases

Use `@/` prefix for imports (configured in jsconfig.json):

```javascript
import utils from "@/lib/utils";
import Button from "@/components/ui/button";
import useHook from "@/hooks/useHook";
```

### Styling (Tailwind CSS 4)

- Use utility classes for all styling
- Use `cn()` helper for conditional classes (clsx + tailwind-merge)
- Follow shadcn/ui color system (primary, secondary, destructive, muted, etc.)
- Use semantic color tokens: `bg-primary`, `text-primary-foreground`, etc.
- Responsive design with `md:`, `lg:` prefixes

```javascript
<div className={cn(
  "p-4 rounded-lg border",
  isActive && "bg-primary text-primary-foreground",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
```

### shadcn/ui Components

- Use provided components from `@/components/ui/`
- Leverage `class-variance-authority` for variant props
- Component props: `variant`, `size`, `className`

```javascript
<Button variant="default" size="lg" className="w-full">
  Click me
</Button>

<Card className="border-0 shadow-none bg-transparent">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Error Handling

- Wrap async operations in try-catch
- Use toast for user feedback
- Display errors in Alert components

```javascript
try {
  const result = await someAsyncOperation();
  toast.success("操作成功");
} catch (err) {
  toast.error("操作失败：" + err.message);
}
```

### State Management

- Use `useState` for simple local state
- Use custom hooks for reusable logic (`@/hooks/`)
- Lift state up when needed
- Use derived state instead of redundant state

### Event Handling

- Use arrow functions for event handlers
- Destructure event properties explicitly
- Handle form submissions with `e.preventDefault()`

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Process form
};
```

### Type Safety

- This is a JavaScript project (not TypeScript)
- Use JSDoc comments for complex functions when needed
- Propagate error messages from caught exceptions
- Validate user input before processing

### Naming Conventions

- **Variables/Constants**: camelCase (`inputValue`, `isLoading`)
- **Constants**: SCREAMING_SASE for config values
- **Components**: PascalCase (`JsonConverter`)
- **Props**: camelCase, descriptive (`onValueChange`, `className`)
- **CSS Classes**: kebab-case in HTML, utility classes in code

### UI/UX Guidelines

- Use Lucide icons for visual elements
- Provide loading states for async operations
- Use toast notifications for feedback
- Include error states with helpful messages
- Support keyboard navigation
- Ensure responsive design for mobile/desktop

### Next.js Specifics

- Server components by default, add `"use client"` for client interactivity
- Use App Router file structure (`src/app/`)
- Place static UI components in `src/components/`
- Use `src/data/` for configuration and tool definitions
- Place reusable logic in `src/lib/` and `src/hooks/`

### Code Formatting

- Run `npm run lint` before committing
- ESLint config extends `eslint-config-next/core-web-vitals`
- Ignore `.next/`, `build/`, `out/` directories
