# Lunas UI - React Component Library

[![npm version](https://img.shields.io/npm/v/@customafk/lunas-ui.svg)](https://www.npmjs.com/package/@customafk/lunas-ui)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node Version](https://img.shields.io/badge/node-%3E%3D%2022.0.0-brightgreen.svg)](https://nodejs.org/)

A modern, accessible, and customizable React UI component library built for Lunas Enterprise applications.

## ✨ Features

- 🎨 **Modern Design**: Components designed with contemporary UI/UX principles
- 🔧 **Highly Customizable**: Supports TailwindCSS with class variance authority
- 📱 **Responsive**: All components are responsive and mobile-friendly
- ♿ **Accessible**: Complies with WCAG 2.1 accessibility standards
- 📦 **Tree-shaking**: Import only what you need for optimal bundle size
- 🔷 **TypeScript**: Fully typed with comprehensive TypeScript definitions

## 📦 Installation

```bash
# npm
npm install @customafk/lunas-ui

# yarn
yarn add @customafk/lunas-ui

# pnpm
pnpm add @customafk/lunas-ui
```

### Peer Dependencies

Lunas UI requires the following peer dependencies:

```bash
npm install react react-dom
```

Additional peer dependencies for specific components:

```bash
npm install @hookform/error-message@^2.0.0 react-hook-form@^7.62.0 lucide-react@^0.541.0
```

## 🚀 Quick Start

1. Import styles in your main application file:

```jsx
// Import base styles first
import '@customafk/lunas-ui/styles/base'
// Import theme styles (required)
import '@customafk/lunas-ui/styles/theme'
// Optional: Import typography styles if needed
import '@customafk/lunas-ui/styles/typography'
```

2. Import and use components:

```jsx
import React from 'react'
import { Button } from '@customafk/lunas-ui/ui/button'
import { Card } from '@customafk/lunas-ui/ui/card'
import { TextField } from '@customafk/lunas-ui/forms/text-field'
import { FormWrapper } from '@customafk/lunas-ui/forms/form-wrapper'

function App() {
  const onSubmit = (data) => console.log(data)

  return (
    <Card className="mx-auto max-w-md p-6">
      <FormWrapper onSubmit={onSubmit}>
        <TextField name="username" label="Username" placeholder="Enter your username" />
        <Button type="submit">Submit</Button>
      </FormWrapper>
    </Card>
  )
}

export default App
```

## 📋 Comprehensive Component Reference

The following table provides a structured reference for all components available in the Lunas UI library:

| Category     | Component         | Import Path                                     |
| ------------ | ----------------- | ----------------------------------------------- |
| UI           | Alert             | `@customafk/lunas-ui/ui/alert`                  |
| UI           | AlertDialog       | `@customafk/lunas-ui/ui/alert-dialog`           |
| UI           | AspectRatio       | `@customafk/lunas-ui/ui/aspect-ratio`           |
| UI           | Avatar            | `@customafk/lunas-ui/ui/avatar`                 |
| UI           | Badge             | `@customafk/lunas-ui/ui/badge`                  |
| UI           | Breadcrumb        | `@customafk/lunas-ui/ui/breadcrumb`             |
| UI           | Button            | `@customafk/lunas-ui/ui/button`                 |
| UI           | Calendar          | `@customafk/lunas-ui/ui/calendar`               |
| UI           | Card              | `@customafk/lunas-ui/ui/card`                   |
| UI           | Carousel          | `@customafk/lunas-ui/ui/carousel`               |
| UI           | Collapsible       | `@customafk/lunas-ui/ui/collapsible`            |
| UI           | Command           | `@customafk/lunas-ui/ui/command`                |
| UI           | ContextMenu       | `@customafk/lunas-ui/ui/context-menu`           |
| UI           | Dialog            | `@customafk/lunas-ui/ui/dialog`                 |
| UI           | DropdownMenu      | `@customafk/lunas-ui/ui/dropdown-menu`          |
| UI           | FileUploader      | `@customafk/lunas-ui/ui/file-uploader`          |
| UI           | Form              | `@customafk/lunas-ui/ui/form`                   |
| UI           | HoverCard         | `@customafk/lunas-ui/ui/hover-card`             |
| UI           | Input             | `@customafk/lunas-ui/ui/input`                  |
| UI           | InputOTP          | `@customafk/lunas-ui/ui/input-otp`              |
| UI           | Label             | `@customafk/lunas-ui/ui/label`                  |
| UI           | Menubar           | `@customafk/lunas-ui/ui/menubar`                |
| UI           | MultiSelect       | `@customafk/lunas-ui/ui/multi-select`           |
| UI           | NavigationMenu    | `@customafk/lunas-ui/ui/navigation-menu`        |
| UI           | Pagination        | `@customafk/lunas-ui/ui/pagination`             |
| UI           | Popover           | `@customafk/lunas-ui/ui/popover`                |
| UI           | Progress          | `@customafk/lunas-ui/ui/progress`               |
| UI           | RadioGroup        | `@customafk/lunas-ui/ui/radio-group`            |
| UI           | Resizable         | `@customafk/lunas-ui/ui/resizable`              |
| UI           | ScrollArea        | `@customafk/lunas-ui/ui/scroll-area`            |
| UI           | Select            | `@customafk/lunas-ui/ui/select`                 |
| UI           | Separator         | `@customafk/lunas-ui/ui/separator`              |
| UI           | Sheet             | `@customafk/lunas-ui/ui/sheet`                  |
| UI           | Sidebar           | `@customafk/lunas-ui/ui/sidebar`                |
| UI           | Skeleton          | `@customafk/lunas-ui/ui/skeleton`               |
| UI           | Slider            | `@customafk/lunas-ui/ui/slider`                 |
| UI           | Sonner            | `@customafk/lunas-ui/ui/sonner`                 |
| UI           | Switch            | `@customafk/lunas-ui/ui/switch`                 |
| UI           | Table             | `@customafk/lunas-ui/ui/table`                  |
| UI           | Tabs              | `@customafk/lunas-ui/ui/tabs`                   |
| UI           | Textarea          | `@customafk/lunas-ui/ui/textarea`               |
| UI           | Toggle            | `@customafk/lunas-ui/ui/toggle`                 |
| UI           | ToggleGroup       | `@customafk/lunas-ui/ui/toggle-group`           |
| UI           | Tooltip           | `@customafk/lunas-ui/ui/tooltip`                |
| UI Buttons   | AddNewButton      | `@customafk/lunas-ui/ui/buttons/add-new`        |
| UI Buttons   | EditButton        | `@customafk/lunas-ui/ui/buttons/edit`           |
| UI Buttons   | RefreshButton     | `@customafk/lunas-ui/ui/buttons/refresh`        |
| UI Buttons   | TrashButton       | `@customafk/lunas-ui/ui/buttons/trash`          |
| UI Buttons   | UploadImageButton | `@customafk/lunas-ui/ui/buttons/upload-image`   |
| UI Inputs    | SearchInput       | `@customafk/lunas-ui/ui/inputs/search-input`    |
| Forms        | FormWrapper       | `@customafk/lunas-ui/forms/form-wrapper`        |
| Forms        | TextField         | `@customafk/lunas-ui/forms/text-field`          |
| Forms        | PasswordField     | `@customafk/lunas-ui/forms/password-field`      |
| Forms        | NumberField       | `@customafk/lunas-ui/forms/number-field`        |
| Forms        | SelectField       | `@customafk/lunas-ui/forms/select-field`        |
| Forms        | DateField         | `@customafk/lunas-ui/forms/date-field`          |
| Forms        | SwitchField       | `@customafk/lunas-ui/forms/switch-field`        |
| Forms        | TextareaField     | `@customafk/lunas-ui/forms/textarea-field`      |
| Forms        | MultiSelectField  | `@customafk/lunas-ui/forms/multi-select-field`  |
| Layout       | Flex              | `@customafk/lunas-ui/layouts/flex`              |
| Layout       | Grid              | `@customafk/lunas-ui/layouts/grid`              |
| Layout       | AppLayout         | `@customafk/lunas-ui/layouts/app-layout`        |
| Layout       | Main              | `@customafk/lunas-ui/layouts/main`              |
| Data Display | Country           | `@customafk/lunas-ui/data-display/country`      |
| Data Display | DataList          | `@customafk/lunas-ui/data-display/data-list`    |
| Data Display | Date              | `@customafk/lunas-ui/data-display/date`         |
| Data Display | DateTooltip       | `@customafk/lunas-ui/data-display/date-tooltip` |
| Data Display | Empty             | `@customafk/lunas-ui/data-display/empty`        |
| Data Display | Name              | `@customafk/lunas-ui/data-display/name`         |
| Data Display | PhoneNumber       | `@customafk/lunas-ui/data-display/phone-number` |
| Data Display | RoleBadge         | `@customafk/lunas-ui/data-display/role-badge`   |
| Data Display | Statistic         | `@customafk/lunas-ui/data-display/statistic`    |
| Dialogs      | ConfirmDialog     | `@customafk/lunas-ui/dialogs/confirm-dialog`    |
| Dialogs      | DetailDialog      | `@customafk/lunas-ui/dialogs/detail-dialog`     |
| Dialogs      | ErrorDialog       | `@customafk/lunas-ui/dialogs/error-dialog`      |
| Dialogs      | FormDialog        | `@customafk/lunas-ui/dialogs/form-dialog`       |
| Dialogs      | LoadingDialog     | `@customafk/lunas-ui/dialogs/loading-dialog`    |
| Table        | DataTable         | `@customafk/lunas-ui/table`                     |
| Typography   | Title             | `@customafk/lunas-ui/typography/title`          |
| Typography   | Paragraph         | `@customafk/lunas-ui/typography/paragraph`      |

### Common Import Requirements

```jsx
// Required for all form components
import { useForm } from 'react-hook-form'

// Required for icon components
import { LucideIcon } from 'lucide-react'

// Utility for class name merging
import { cn } from '@customafk/lunas-ui/lib/utils'
```

## 🎨 Theming

Lunas UI supports customization through CSS variables. To customize the theme:

1. Import the base theme:

```jsx
import '@customafk/lunas-ui/styles/theme'
```

2. Override CSS variables in your global CSS file:

```css
:root {
  --primary: 222.2 47.4% 55.1%;
  --primary-muted: 222.2 47.4% 95%;
  --primary-weak: 222.2 47.4% 90%;
  --primary-strong: 222.2 47.4% 45%;
  --primary-intense: 222.2 47.4% 35%;

  /* Other variables can be overridden similarly */
}
```

## 📖 Component Examples

### Form Example

```jsx
import { FormWrapper } from '@customafk/lunas-ui/forms/form-wrapper'
import { TextField } from '@customafk/lunas-ui/forms/text-field'
import { PasswordField } from '@customafk/lunas-ui/forms/password-field'
import { Button } from '@customafk/lunas-ui/ui/button'

const LoginForm = () => {
  const onSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <TextField name="email" label="Email" placeholder="Enter your email" isShowErrorMsg />
      <PasswordField name="password" label="Password" isShowErrorMsg />
      <Button type="submit">Log In</Button>
    </FormWrapper>
  )
}
```

### Data Table Example

```jsx
import { DataTable } from '@customafk/lunas-ui/table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]

const MyTable = () => {
  return <DataTable columns={columns} data={data} />
}
```

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/QuangPhamvt/lunas-enterprise-ui-package.git
cd lunas-enterprise-ui-package

# Install dependencies
npm install

# Start development environment
npm run dev

# Run Storybook
npm run storybook

# Build the library
npm run build
```

## 🤝 Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

### Coding Standards

- Follow ESLint config
- Write tests for new features
- Update documentation as needed
- Use conventional commits

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## 📄 License

ISC © [CustomAFK](https://github.com/QuangPhamvt)

## 🤖 Component API Documentation for Developers and AI Assistants

The following provides a simplified component reference for all components in the library. For detailed props documentation and usage examples, visit our documentation site.

### Integration Patterns

- Form components should be used within a `FormWrapper` component
- Dialog components typically need `open` and `onOpenChange` props to be controlled
- All components support `className` for custom styling with Tailwind
- Many components have variants that can be accessed via the `variant` prop
- Component styles are customizable through CSS variables in `:root`
- All UI components are responsive and support various screen sizes

## 🙋‍♀️ Support

- **Documentation**: [https://ui.lunas.vn](https://ui.lunas.vn)
- **GitHub Issues**: [Report bugs or feature requests](https://github.com/QuangPhamvt/lunas-enterprise-ui-package/issues)
- **Email**: quangpm220503vt@gmail.com

## 🏆 Credits

- Thanks to [React](https://reactjs.org/) team
- Icons from [Lucide React](https://lucide.dev/icons/)
- Inspiration from [Chakra UI](https://chakra-ui.com/) and [Material-UI](https://mui.com/)

---

<div align="center">
  Created with ❤️ by <a href="https://github.com/QuangPhamvt">CustomAFK</a>
</div>

<!--
"./styles/base": "./styles/base.css",
"./styles/loader": "./styles/loader.css",
"./styles/theme": "./styles/theme.css",
"./styles/typography": "./styles/typography.css",
-->
