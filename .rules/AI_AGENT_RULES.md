# AI Agent Rules for Lunas UI Library

## Overview

These rules guide AI agents on how to effectively work with the Lunas UI component library. Follow these guidelines to understand the library structure, properly import components, and provide accurate assistance to users.

## Library Structure Understanding

1. **Component Organization**
   - Components are organized in category folders: `ui`, `forms`, `layouts`, `data-display`, `dialogs`, `cards`, `typography`, and `table`
   - Each component is exported from its own file in the format: `[component-category]/[component-name]`
   - Most base UI components are in the `ui` directory
   - Higher-level composed components are in their respective category directories

2. **Export Structure**
   - Components are exported as named exports (not default exports)
   - Many components export both the component itself and related variants (e.g., `Button` and `buttonVariants`)
   - Components can be imported from their specific paths rather than from the root index

3. **Dependencies and Technologies**
   - Built with React and TypeScript
   - Uses Tailwind CSS for styling (via class-variance-authority)
   - Integrates with react-hook-form for form components
   - Uses Radix UI primitives for accessible components
   - Requires several peer dependencies as listed in package.json

## Import Guidelines

1. **Correct Import Patterns**
   - Always import specific components from their dedicated paths:
     ```tsx
     import { Button } from '@customafk/lunas-ui/ui/button'
     import { TextField } from '@customafk/lunas-ui/forms/text-field'
     import { DataTable } from '@customafk/lunas-ui/table'
     ```

2. **Style Imports**
   - Import necessary styles:
     ```tsx
     import '@customafk/lunas-ui/styles/base'
     import '@customafk/lunas-ui/styles/theme'
     ```

3. **Component Composition**
   - Form fields should be used with FormWrapper:
     ```tsx
     import { FormWrapper } from '@customafk/lunas-ui/forms/form-wrapper'
     import { TextField } from '@customafk/lunas-ui/forms/text-field'
     ```

## Documentation Guidance

1. **Props Documentation**
   - Provide complete prop documentation for each component
   - Indicate which props are required vs optional
   - Document default values for optional props
   - Explain the purpose of each prop

2. **Example Usage**
   - Provide minimal working examples for each component
   - Include examples with different variants/props when applicable
   - Show proper component composition patterns

3. **Common Errors**
   - Document known issues and their solutions
   - Explain integration points with form libraries
   - Address styling override patterns

## Code Generation Guidelines

1. **Component Implementation**
   - Generate components with proper typing using React.FC or function components
   - Include all necessary imports
   - Follow the library's styling conventions (using cn utility and class-variance-authority)

2. **Form Field Implementation**
   - Properly integrate with react-hook-form
   - Include validation handling
   - Implement error message display

3. **Custom Components**
   - When creating new components based on Lunas UI:
     - Follow the same file/folder structure
     - Maintain the same styling approach
     - Ensure accessibility features remain intact

## Troubleshooting

1. **Common Issues**
   - Missing peer dependencies
   - CSS styling conflicts
   - Form validation problems
   - TypeScript type errors

2. **Solutions**
   - Check peer dependencies in package.json
   - Use the cn utility to merge classes without conflicts
   - Verify correct implementation of form components
   - Ensure proper TypeScript types are imported

## Version Compatibility

1. **React Version**
   - Works with React 16.8+ through 19.x
   - Designed primarily for React 18.x

2. **Node Version**
   - Requires Node.js 22.0.0 or higher

3. **Package Manager**
   - Compatible with npm, yarn, and pnpm

Remember to check the package.json for the most up-to-date version and dependency information.
