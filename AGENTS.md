# AGENTS.md

This file provides guidance to agents working in this Next.js development tools repository.

## Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Production build (runs automatically)
npm run start            # Start production server
npm run lint             # Run ESLint check

# No test framework currently configured
```

## Project Structure

- **App Router**: Pages in `src/app/`
- **Tool Components**: `src/components/` (PascalCase: `JsonConverter.js`)
- **Tool Config**: `src/data/tools.js`
- **Dynamic Route**: `[toolId]/page.js` renders tools via `componentMap`
- **Hooks**: `src/hooks/`
- **Utils**: `src/lib/utils.js`

## Import Order (7 groups)

```javascript
// 1. React hooks
import { useState, useEffect } from "react";

// 2. shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 3. Tool components
import JsonConverter from "@/components/JsonConverter";

// 4. Icons
import { Copy, AlertCircle, FileJson } from "lucide-react";

// 5. Third-party
import { toast } from "sonner";

// 6. Custom hooks
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

// 7. Utils
import { cn } from "@/lib/utils";
```

## Component Structure

```javascript
"use client"; // Client components - top of file

import { useState } from "react";
import { Button } from "@/components/ui/button";
// ... other imports ...

export default function ComponentName() {
  // 1. State
  const [state, setState] = useState("");
  
  // 2. Custom hooks
  const { method } = useCustomHook();
  
  // 3. Event handlers
  const handleAction = () => { /* logic */ };
  
  // 4. Helper functions (after component, before closing brace)
  function helper() { /* ... */ }
  
  // 5. Render
  return <div className="container mx-auto">{/* ... */}</div>;
}
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `JsonConverter` |
| Function | camelCase | `convertJson` |
| Variable | camelCase | `inputValue` |
| Constant | UPPER_SNAKE_CASE | `CONVERSION_TYPES` |
| File | PascalCase (components), camelCase (utils) | `JsonConverter.js`, `utils.js` |

## Error Handling

```javascript
try {
  const result = JSON.parse(input);
  setOutput(result);
  toast.success("转换成功");
} catch (err) {
  setError("转换失败：" + err.message);
  toast.error("转换失败");
}

// UI display
{error && (
  <Alert variant="destructive">
    <AlertCircle className="w-4 h-4" />
    <AlertTitle>错误标题</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

## UI/Styling Guidelines

- Use shadcn/ui components: `Button`, `Card`, `Input`, `Textarea`, `Alert`, `RadioGroup`, `Label`, `Badge`, `Separator`
- Use `cn()` for class merging: `cn("base-class", condition && "conditional")`
- Base layout: `container mx-auto px-4`
- Tool page pattern: Header → Work Area → Instructions
- Decorate with subtle background blurs: `bg-primary/5 rounded-full blur-3xl`
- Use gradients sparingly for emphasis

## Adding New Tools

1. Create component in `src/components/ToolName.js`
2. Add config to `src/data/tools.js`
3. Register in `src/app/[toolId]/page.js` componentMap
4. Follow existing tool patterns and naming

## Forbidden Patterns

- ❌ `as any`, `@ts-ignore` (no TypeScript)
- ❌ Empty catch blocks: `catch(e) {}`
- ❌ Direct UI/styling edits (delegate to UI/UX engineer)
- ❌ Random debugging changes

## Key Configuration

- **React Compiler**: Enabled (`reactCompiler: true`)
- **Path Alias**: `@/*` → `./src/*`
- **shadcn/ui**: New York style, CSS variables
- **ESLint**: Next.js core web config
