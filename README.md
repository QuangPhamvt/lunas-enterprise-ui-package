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

## 📋 Component Import Guide

### Base UI Components

```jsx
// Core UI Components
import { Alert } from '@customafk/lunas-ui/ui/alert'
import { AlertDialog } from '@customafk/lunas-ui/ui/alert-dialog'
import { AspectRatio } from '@customafk/lunas-ui/ui/aspect-ratio'
import { Avatar } from '@customafk/lunas-ui/ui/avatar'
import { Badge } from '@customafk/lunas-ui/ui/badge'
import { Breadcrumb } from '@customafk/lunas-ui/ui/breadcrumb'
import { Button } from '@customafk/lunas-ui/ui/button'
import { Calendar } from '@customafk/lunas-ui/ui/calendar'
import { Card } from '@customafk/lunas-ui/ui/card'
import { Carousel } from '@customafk/lunas-ui/ui/carousel'
import { Collapsible } from '@customafk/lunas-ui/ui/collapsible'
import { Command } from '@customafk/lunas-ui/ui/command'
import { ContextMenu } from '@customafk/lunas-ui/ui/context-menu'
import { Dialog } from '@customafk/lunas-ui/ui/dialog'
import { DropdownMenu } from '@customafk/lunas-ui/ui/dropdown-menu'
import { FileUploader } from '@customafk/lunas-ui/ui/file-uploader'
import { Form } from '@customafk/lunas-ui/ui/form'
import { HoverCard } from '@customafk/lunas-ui/ui/hover-card'
import { Input } from '@customafk/lunas-ui/ui/input'
import { InputOTP } from '@customafk/lunas-ui/ui/input-otp'
import { Label } from '@customafk/lunas-ui/ui/label'
import { Menubar } from '@customafk/lunas-ui/ui/menubar'
import { MultiSelect } from '@customafk/lunas-ui/ui/multi-select'
import { NavigationMenu } from '@customafk/lunas-ui/ui/navigation-menu'
import { Pagination } from '@customafk/lunas-ui/ui/pagination'
import { Popover } from '@customafk/lunas-ui/ui/popover'
import { Progress } from '@customafk/lunas-ui/ui/progress'
import { RadioGroup } from '@customafk/lunas-ui/ui/radio-group'
import { Resizable } from '@customafk/lunas-ui/ui/resizable'
import { ScrollArea } from '@customafk/lunas-ui/ui/scroll-area'
import { Select } from '@customafk/lunas-ui/ui/select'
import { Separator } from '@customafk/lunas-ui/ui/separator'
import { Sheet } from '@customafk/lunas-ui/ui/sheet'
import { Sidebar } from '@customafk/lunas-ui/ui/sidebar'
import { Skeleton } from '@customafk/lunas-ui/ui/skeleton'
import { Slider } from '@customafk/lunas-ui/ui/slider'
import { Sonner } from '@customafk/lunas-ui/ui/sonner'
import { Switch } from '@customafk/lunas-ui/ui/switch'
import { Table } from '@customafk/lunas-ui/ui/table'
import { Tabs } from '@customafk/lunas-ui/ui/tabs'
import { Textarea } from '@customafk/lunas-ui/ui/textarea'
import { Toggle } from '@customafk/lunas-ui/ui/toggle'
import { ToggleGroup } from '@customafk/lunas-ui/ui/toggle-group'
import { Tooltip } from '@customafk/lunas-ui/ui/tooltip'

// Specialized Button Variants
import { AddNewButton } from '@customafk/lunas-ui/ui/buttons/add-new'
import { EditButton } from '@customafk/lunas-ui/ui/buttons/edit'
import { RefreshButton } from '@customafk/lunas-ui/ui/buttons/refresh'
import { TrashButton } from '@customafk/lunas-ui/ui/buttons/trash'
import { UploadImageButton } from '@customafk/lunas-ui/ui/buttons/upload-image'

// Specialized Input Variants
import { SearchInput } from '@customafk/lunas-ui/ui/inputs/search-input'
```

### Form Components

```jsx
// Import form wrapper for React Hook Form integration
import { FormWrapper } from '@customafk/lunas-ui/forms/form-wrapper'

// Field components
import { TextField } from '@customafk/lunas-ui/forms/text-field'
import { PasswordField } from '@customafk/lunas-ui/forms/password-field'
import { NumberField } from '@customafk/lunas-ui/forms/number-field'
import { SelectField } from '@customafk/lunas-ui/forms/select-field'
import { DateField } from '@customafk/lunas-ui/forms/date-field'
import { SwitchField } from '@customafk/lunas-ui/forms/switch-field'
import { TextareaField } from '@customafk/lunas-ui/forms/textarea-field'
import { MultiSelectField } from '@customafk/lunas-ui/forms/multi-select-field'
```

### Layout Components

```jsx
import { Flex } from '@customafk/lunas-ui/layouts/flex'
import { Grid } from '@customafk/lunas-ui/layouts/grid'
import { AppLayout } from '@customafk/lunas-ui/layouts/app-layout'
import { Main } from '@customafk/lunas-ui/layouts/main'
```

### Data Display Components

```jsx
import { Country } from '@customafk/lunas-ui/data-display/country'
import { DataList } from '@customafk/lunas-ui/data-display/data-list'
import { Date } from '@customafk/lunas-ui/data-display/date'
import { DateTooltip } from '@customafk/lunas-ui/data-display/date-tooltip'
import { Empty } from '@customafk/lunas-ui/data-display/empty'
import { Name } from '@customafk/lunas-ui/data-display/name'
import { PhoneNumber } from '@customafk/lunas-ui/data-display/phone-number'
import { RoleBadge } from '@customafk/lunas-ui/data-display/role-badge'
import { Statistic } from '@customafk/lunas-ui/data-display/statistic'
```

### Dialog Components

```jsx
import { ConfirmDialog } from '@customafk/lunas-ui/dialogs/confirm-dialog'
import { DetailDialog } from '@customafk/lunas-ui/dialogs/detail-dialog'
import { ErrorDialog } from '@customafk/lunas-ui/dialogs/error-dialog'
import { FormDialog } from '@customafk/lunas-ui/dialogs/form-dialog'
import { LoadingDialog } from '@customafk/lunas-ui/dialogs/loading-dialog'
```

### Table Components

```jsx
import { DataTable } from '@customafk/lunas-ui/table'
```

### Typography Components

```jsx
import { Title } from '@customafk/lunas-ui/typography/title'
import { Paragraph } from '@customafk/lunas-ui/typography/paragraph'
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
