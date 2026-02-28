# AGENTS.md

AI agent guidelines for this Next.js dev tools codebase.

## Build Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint (fix before committing)
```

**Note:** No test scripts configured. Use Vitest or Jest if adding tests.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.js       # Home page
│   └── [toolId]/     # Dynamic tool pages
├── components/       # React components
│   ├── ui/           # shadcn/ui primitives
│   └── *.js          # Tool components
├── hooks/            # Custom React hooks
├── lib/              # Utilities
└── data/             # Static data
```

## Code Style

### General Principles
- **Language**: Chinese for comments and UI text
- **React**: React 19 + Next.js 16 App Router
- **Components**: Functional with hooks only
- **Simplicity**: Prefer simple code over complex abstractions

### File Naming
- **Components**: PascalCase (`JsonConverter.js`)
- **Hooks/Utils**: camelCase (`useCopyClipboard.js`)
- **Config**: kebab-case (`eslint.config.mjs`)

### Component Structure
```javascript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function ComponentName() {
  const [value, setValue] = useState("");

  const handleClick = () => {
    try {
      // Implementation
      toast.success("操作成功");
    } catch (err) {
      toast.error("操作失败：" + err.message);
    }
  };

  return <div>...</div>;
}
```

### Import Order
1. React imports
2. shadcn/ui (`@/components/ui/*`)
3. Custom components
4. Hooks (`@/hooks/*`)
5. Icons (`lucide-react`)
6. Utilities (`@/lib/*`)
7. Data (`@/data/*`)

### Path Aliases
Use `@/` prefix (configured in `jsconfig.json`):
```javascript
import utils from "@/lib/utils";
import Button from "@/components/ui/button";
```

### Styling (Tailwind CSS 4)
- Use utility classes only
- Use `cn()` for conditional classes
- Follow shadcn/ui color tokens
- **Avoid**: gradients, blur effects, excessive animations

```javascript
<div className={cn(
  "p-4 rounded-md border",
  isActive && "bg-primary text-primary-foreground"
)}>
```

### UI Design
- ❌ Avoid: Gradient text, blur backgrounds, floating animations
- ❌ Avoid: "工作台" or flowery titles
- ✅ Use: Clean layouts, simple cards, direct labels

### Error Handling
```javascript
try {
  await asyncOperation();
  toast.success("操作成功");
} catch (err) {
  toast.error("操作失败：" + err.message);
}
```

### State Management
- Use `useState` for local state
- Use custom hooks for reusable logic
- Prefer derived state over stored state

### Naming Conventions
| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `inputValue`, `isLoading` |
| Components | PascalCase | `JsonConverter` |
| Props | camelCase | `onValueChange` |

### React Hooks
```javascript
export function useCopyClipboard() {
  const [copied, setCopied] = useState(false);
  
  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("已复制");
    setTimeout(() => setCopied(false), 2000);
  }, []);
  
  return { copy, copied };
}
```

### Next.js Specifics
- Server components by default
- Add `"use client"` for client interactivity
- Use App Router structure (`src/app/`)

### Code Quality
- Run `npm run lint` before committing
- Fix all ESLint errors
- Keep components under 300 lines

### shadcn/ui Usage
```javascript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

<Button variant="default" size="lg">Click</Button>
<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>
```

### Accessibility
- Use semantic HTML
- Include `aria-label` for icon buttons
- Support keyboard navigation
