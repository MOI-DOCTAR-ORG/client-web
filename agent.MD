# AI Coding Assistant Instructions

## Project Overview
This is a frontend web application built with Vite, React, 
TypeScript (TSX), and Tailwind CSS. Before making any changes, 
read and understand the existing codebase structure, conventions, 
and patterns already in place. Do not assume — observe first.

## Primary Rule
Before writing a single line of code, scan the relevant files 
and folders to understand what already exists. Match the existing 
patterns exactly. Do not introduce new patterns unless explicitly 
instructed.

## Stack
- Vite (build tool)
- React 18+ (UI framework)
- TypeScript with TSX (strict mode)
- Tailwind CSS (styling — utility classes only)

## Code Conventions
- Functional components only, no class components
- Named exports only (no default exports except where routing requires)
- Use `interface` for all prop definitions, not `type`
- All function parameters and return values must be explicitly typed
- Use `const` arrow function syntax for all components
- Use async/await only, never raw `.then()` chains
- No `any` type — ever

## Tailwind Rules
- Utility classes only, no inline `style={{}}` 
- No separate CSS files unless one already exists in the project
- Mobile-first responsive design using sm: md: lg: breakpoints
- If a className string is long, break it across multiple lines 
  for readability

## Folder Structure (Respect This Strictly)
- /src/components → reusable UI components
- /src/pages → page-level components
- /src/hooks → custom React hooks
- /src/types → shared TypeScript interfaces and types
- /src/utils → helper functions
- One component per file
- File name must match component name exactly (PascalCase)

## Before Every Task
1. Read the files relevant to the task
2. Identify existing patterns (naming, structure, styling)
3. Check if a similar component or utility already exists
4. Only then write or modify code

## When Modifying Existing Code
- Do not refactor or rewrite anything that is not part of the task
- Do not rename variables, functions, or files unless asked
- Do not reorganize imports unless asked
- Preserve all existing comments and documentation

## When Creating New Code
- Follow existing naming conventions exactly
- Place files in the correct folder as defined above
- Do not create new folders without explicit instruction
- Always add TypeScript types — never leave anything untyped

## Dependencies
- Do not install any new package without explicitly stating:
  1. What the package is
  2. Why it is needed
  3. Asking for approval before installing

## What To Avoid Completely
- No inline styles
- No `any` type
- No class components
- No default exports (unless routing demands it)
- No duplicate components or utilities
- No unnecessary re-renders or useEffect misuse
- No changes outside the scope of the current task
- No assumptions — always verify against existing code first

## Final Rule
Your job is to extend and improve what already exists, 
not to rebuild it your way. Stay within the boundaries 
of this project's established patterns at all times.