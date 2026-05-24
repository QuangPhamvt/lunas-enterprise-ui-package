# @customafk/lunas-ui — AI Reference Documentation

> Optimized for AI agents (Claude, GitHub Copilot, Cursor, etc.).
> Add a reference to this file in your project's CLAUDE.md or AI context config
> so the assistant always has accurate import paths, prop types, and usage patterns.

## Package Identity

- **Package name:** `@customafk/lunas-ui`
- **Framework:** React 19+ · TypeScript 5+
- **Styling:** TailwindCSS v4 (CSS custom properties — stylesheet import is required)
- **Radix UI:** primitives are wrapped — always import from `@customafk/lunas-ui/*`, never from `@radix-ui/*`

---

## CRITICAL: Required Stylesheet Imports

Import these in your root layout **before** any component renders.
Without them all color tokens and base styles will be absent.

```tsx
import '@customafk/lunas-ui/styles/base';
import '@customafk/lunas-ui/styles/theme';
// Optional: enhanced typographic defaults
import '@customafk/lunas-ui/styles/typography';
```

---

## Import Rules (STRICT)

### Rule 1 — Named imports only; never default imports

```tsx
// ✅ CORRECT
import { Button } from '@customafk/lunas-ui/ui/button';
import type { ButtonProps } from '@customafk/lunas-ui/ui/button';

// ❌ WRONG — no default export exists
import Button from '@customafk/lunas-ui/ui/button';
```

### Rule 2 — Use the exact published export paths

Each component has its own path that matches the `package.json` exports map exactly.

```tsx
// ✅ CORRECT
import { Button } from '@customafk/lunas-ui/ui/button';
import { ConfirmDialog } from '@customafk/lunas-ui/dialogs/confirm-dialog';
import { Flex } from '@customafk/lunas-ui/layouts/flex';
import { UserDataDisplay } from '@customafk/lunas-ui/data-display/user';
import { Description } from '@customafk/lunas-ui/features/descriptions';

// ❌ WRONG — internal source path, not shipped
import { Button } from '@customafk/lunas-ui/packages/components/ui/button';

// ❌ WRONG — missing category prefix
import { Button } from '@customafk/lunas-ui/button';
```

### Rule 3 — Never import Radix UI primitives directly

```tsx
// ❌ WRONG
import { AlertDialog } from '@radix-ui/react-alert-dialog';

// ✅ CORRECT — use the lunas-ui wrapper
import { AlertDialog } from '@customafk/lunas-ui/ui/alert-dialog';
```

### Rule 4 — Separate type and value imports

```tsx
import { Statistic } from '@customafk/lunas-ui/data-display/statistic';
import type { StatisticProps } from '@customafk/lunas-ui/data-display/statistic';
```

---

## Component Catalog

### UI Primitives — `@customafk/lunas-ui/ui/*`

| Component(s) | Full import path | Key props |
|---|---|---|
| `Button` | `.../ui/button` | `variant`, `color`, `size`, `isLoading`, `asChild` |
| `Input` | `.../ui/input` | All native `<input>` props |
| `Textarea` | `.../ui/textarea` | All native `<textarea>` props |
| `Label` | `.../ui/label` | `htmlFor` |
| `Checkbox` | `.../ui/checkbox` | `checked`, `onCheckedChange` |
| `Switch` | `.../ui/switch` | `checked`, `onCheckedChange` |
| `RadioGroup` + `RadioGroupItem` | `.../ui/radio-group` | `value`, `onValueChange` |
| `Select` + `SelectTrigger` + `SelectContent` + `SelectItem` + `SelectValue` | `.../ui/select` | Radix composition |
| `MultiSelect` | `.../ui/multi-select` | Multi-value select |
| `Dialog` + sub-components | `.../ui/dialog` | `open`, `onOpenChange` |
| `AlertDialog` + sub-components | `.../ui/alert-dialog` | `open`, `onOpenChange` |
| `Sheet` + `SheetContent` | `.../ui/sheet` | `side`: `left`\|`right`\|`top`\|`bottom` |
| `Drawer` + `DrawerContent` | `.../ui/drawer` | Mobile-first sheet |
| `Popover` + `PopoverContent` + `PopoverTrigger` | `.../ui/popover` | `open`, `onOpenChange` |
| `Tooltip` + `TooltipContent` + `TooltipTrigger` + `TooltipProvider` | `.../ui/tooltip` | Wrap app with `TooltipProvider` |
| `Badge` | `.../ui/badge` | `variant`, `color` |
| `Card` + `CardHeader` + `CardContent` + `CardFooter` + `CardTitle` + `CardDescription` + `CardAction` | `.../ui/card` | Composition |
| `Avatar` + `AvatarImage` + `AvatarFallback` | `.../ui/avatar` | — |
| `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` | `.../ui/tabs` | `defaultValue`, `value`, `onValueChange` |
| `Table` + `TableHeader` + `TableBody` + `TableRow` + `TableHead` + `TableCell` | `.../ui/table` | Semantic HTML table |
| `Calendar` | `.../ui/calendar` | `mode`, `selected`, `onSelect` |
| `Command` + sub-components | `.../ui/command` | Command palette |
| `Separator` | `.../ui/separator` | `orientation`: `horizontal`\|`vertical` |
| `ScrollArea` | `.../ui/scroll-area` | `className` for fixed height |
| `Skeleton` | `.../ui/skeleton` | `className` for shape |
| `Spinner` | `.../ui/spinner` | `size`, `className` |
| `Progress` | `.../ui/progress` | `value` (0–100) |
| `Slider` | `.../ui/slider` | `value`, `min`, `max`, `step` |
| `Sonner` | `.../ui/sonner` | Toast — use `toast()` from `sonner` package |
| `Pagination` | `.../ui/pagination` | Page navigation |
| `FileUploader` | `.../ui/file-uploader` | `onUpload`, `accept`, `maxSize` |
| `ButtonGroup` | `.../ui/button-group` | Groups buttons |
| `DropdownMenu` + sub-components | `.../ui/dropdown-menu` | — |
| `ContextMenu` | `.../ui/context-menu` | Right-click menu |
| `HoverCard` + sub-components | `.../ui/hover-card` | — |
| `Collapsible` + sub-components | `.../ui/collapsible` | — |
| `Breadcrumb` | `.../ui/breadcrumb` | — |
| `Carousel` + sub-components | `.../ui/carousel` | — |
| `Toggle` | `.../ui/toggle` | — |
| `ToggleGroup` + `ToggleGroupItem` | `.../ui/toggle-group` | — |
| `Resizable` + sub-components | `.../ui/resizable` | — |
| `InputOTP` | `.../ui/input-otp` | OTP / PIN input |
| `Sidebar` | `.../ui/sidebar` | App sidebar shell |

#### Button — Complete Prop Reference

```tsx
interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'color'> {
  variant?:        'default' | 'outline' | 'ghost' | 'link' | 'icon' | 'destructive'; // default: 'default'
  color?:          'primary' | 'success' | 'danger' | 'warning' | 'muted';            // default: 'primary'
  size?:           'sm' | 'default' | 'lg' | 'icon';                                  // default: 'default'
  isLoading?:      boolean;    // Shows spinner + auto-disables. default: false
  asChild?:        boolean;    // Renders child via Radix Slot.  default: false
  innerClassName?: string;     // Classes on inner flex wrapper
}
```

---

### Specialized UI Buttons — `@customafk/lunas-ui/ui/buttons/*`

| Component | Full import path | Purpose |
|---|---|---|
| `AddNewButton` | `.../ui/buttons/add-new` | Standard "+ Add new" CTA |
| `EditButton` | `.../ui/buttons/edit` | Edit / pencil icon |
| `RefreshButton` | `.../ui/buttons/refresh` | Reload action |
| `TrashButton` | `.../ui/buttons/trash` | Delete action |
| `UploadImageButton` | `.../ui/buttons/upload-image` | Image upload trigger |
| `SearchInput` | `.../ui/inputs/search-input` | Search field with icon |

---

### Layout Components

| Component | Full import path | Key Props |
|---|---|---|
| `Flex` | `.../layouts/flex` | `vertical`, `wrap`, `gap`, `justify`, `align`, `padding`, `margin`, `width` |
| `Grid` | `.../layouts/grid` | Children grid container |
| `CmsLayout` | `.../layouts/cms-layout` | App shell with sidebar + header |
| `PaymentLayout` | `.../layouts/payment-layout` | Checkout page layout |

#### Flex — Complete Prop Reference

```tsx
type FlexProps = {
  vertical?: boolean;          // flex-col when true | flex-row when false (default: false)
  wrap?:     boolean;          // flex-wrap vs flex-nowrap (default: true)
  gap?:      'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';                          // default: 'xs'
  justify?:  'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch'; // default: 'start'
  align?:    'start' | 'center' | 'end' | 'baseline' | 'stretch';                 // default: 'center'
  padding?:  'none' | 'sm' | 'md' | 'lg' | 'xl';                                 // default: 'sm'
  margin?:   'none' | 'sm' | 'md' | 'lg' | 'xl';                                 // default: 'none'
  width?:    'full' | 'auto' | 'fit' | 'screen' | 'min' | 'max' | null;          // default: 'fit'
  className?: string;
};
```

---

### Typography

| Component | Full import path | Key Props |
|---|---|---|
| `Title` | `.../typography/title` | `level` (1–6) → `<h1>`–`<h6>` |
| `Paragraph` | `.../typography/paragraph` | `variant`, all `<p>` attrs |

---

### Data Display — `@customafk/lunas-ui/data-display/*`

Read-only components for formatted entity fields.

| Component | Full import path | Key Props |
|---|---|---|
| `UserDataDisplay` | `.../data-display/user` | `uuid`, `username`, `email` |
| `DateDisplay` | `.../data-display/date` | `date` (ISO string or `Date`), `format?`, `showTime?` |
| `DateTooltip` | `.../data-display/date-tooltip` | `date` — relative label + full date on hover |
| `NameDisplay` | `.../data-display/name` | `name` |
| `PhoneNumberDisplay` | `.../data-display/phone-number` | `value` |
| `CountryDisplay` | `.../data-display/country` | `country` (ISO 3166-1 alpha-2) |
| `RoleBadge` | `.../data-display/role-badge` | `status` (role / status string) |
| `Statistic` | `.../data-display/statistic` | `label`, `value`, `trend?` |
| `EmptyDisplay` | `.../data-display/empty` | `label?` |
| `DataList` + `DataListItem` | `.../data-display/data-list` | `DataListItem`: `label` + `value` |

---

### Dialogs — `@customafk/lunas-ui/dialogs/*`

All dialogs are **controlled** — manage `open` state in the parent.

| Component | Full import path | Key Props |
|---|---|---|
| `ConfirmDialog` | `.../dialogs/confirm-dialog` | `open`, `title`, `description`, `onConfirm`, `isLoading`, `submitText`, `cancelText` |
| `LoadingDialog` | `.../dialogs/loading-dialog` | `open`, `onOpenChange` |
| `ErrorDialog` | `.../dialogs/error-dialog` | `open`, `title`, `onOpenChange`, `children` |
| `DetailDialog` | `.../dialogs/detail-dialog` | `open`, `title`, `isLoading?`, `createdAt?`, `sidebar?`, `onOpenChange` |

#### ConfirmDialog — Complete Prop Reference

```tsx
type ConfirmDialogProps = {
  open?:                 boolean;
  isLoading?:            boolean;                    // default: false
  title:                 string;                     // required
  description:           string;                     // required
  cancelText?:           string;                     // default: 'Cancel'
  submitText?:           string;                     // default: 'Confirm'
  descriptionClassName?: string;
  onOpenChange?:         (open: boolean) => void;
  onConfirm?:            () => Promise<void> | void; // async-safe
};
```

---

### Feature Components

#### Descriptions — `@customafk/lunas-ui/features/descriptions`

```tsx
import {
  Description,        // Outer container (border, shadow, rounded)
  DescriptionHeader,  // title, description?, extra?, className?
  DescriptionSection, // title? — labeled horizontal divider
  DescriptionItem,    // label, labelColSpan? (default 3/12),
                      // orientation? ('horizontal'|'vertical'), action?
} from '@customafk/lunas-ui/features/descriptions';
```

Also exports typed value cells:
`DescriptionBadge`, `DescriptionDate`, `DescriptionName`, `DescriptionEmpty`,
`DescriptionStatistic`, `DescriptionNumberPhone`, `DescriptionImages`, `DescriptionLongtext`.

#### Tables — `@customafk/lunas-ui/features/tables`

TanStack React Table v8 wrapper with column helpers, filter components, and table context provider.

#### TanStack Form — `@customafk/lunas-ui/features/tanstack-form`

```tsx
import {
  useTanStackForm,        // Form factory hook — call once per form definition
  withTanStackForm,       // HOC: connect a component to the form context
  withTanStackFieldGroup, // HOC: wrap a group of related fields
} from '@customafk/lunas-ui/features/tanstack-form';
// Field components (TextField, ComboboxField, etc.) are registered in the
// factory — use them via the form's .AppField slot, not as direct imports.
```

#### Search Modal — `@customafk/lunas-ui/features/search-modal`

```tsx
import { SearchModal } from '@customafk/lunas-ui/features/search-modal';
// Self-contained command-palette dialog — no props required.
```

---

### Cards

| Component | Full import path | Key Props |
|---|---|---|
| `SimpleCard` | `.../cards/simple-card` | `title`, `description?`, `action?`, `footer?` |
| `ProductCard` | `.../cards/product-card` | `id`, `name`, `thumbnail`, `price` |
| `GridProductCard` | `.../cards/grid-product-card` | `id`, `name`, `thumbnail`, `price` |

### Page Components

| Component | Full import path | Purpose |
|---|---|---|
| `NotFound` | `.../pages/NotFound` | 404 page |
| `NotAuthorized` | `.../pages/NotAuthorized` | 403 / access denied |
| `FeatureDeveloping` | `.../pages/FeatureDeveloping` | Coming-soon placeholder |
| `FeatureFixing` | `.../pages/FeatureFixing` | Maintenance-mode page |

---

## Usage Patterns (RAG Examples)

### Pattern 1 — Confirm dialog before a destructive mutation

```tsx
import { useState } from 'react';
import { Button } from '@customafk/lunas-ui/ui/button';
import { ConfirmDialog } from '@customafk/lunas-ui/dialogs/confirm-dialog';

export function DeleteUserButton({ userId, onDeleted }: {
  userId: string;
  onDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    setIsPending(true);
    try {
      await deleteUser(userId);
      setOpen(false);
      onDeleted();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Button variant="outline" color="danger" onClick={() => setOpen(true)}>
        Delete user
      </Button>
      <ConfirmDialog
        open={open}
        title="Delete user?"
        description="This action is permanent and cannot be undone."
        submitText="Yes, delete"
        isLoading={isPending}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
}
```

### Pattern 2 — Entity detail panel with Description + Data Display

```tsx
import {
  Description,
  DescriptionHeader,
  DescriptionItem,
  DescriptionSection,
} from '@customafk/lunas-ui/features/descriptions';
import { UserDataDisplay } from '@customafk/lunas-ui/data-display/user';
import { DateDisplay } from '@customafk/lunas-ui/data-display/date';
import { RoleBadge } from '@customafk/lunas-ui/data-display/role-badge';
import { Statistic } from '@customafk/lunas-ui/data-display/statistic';

export function OrderDetailPanel({ order }: { order: Order }) {
  return (
    <Description>
      <DescriptionHeader title="Order Details" description={`#${order.id}`} />
      <DescriptionSection title="Customer" />
      <DescriptionItem label="Account">
        <UserDataDisplay uuid={order.customer.id} username={order.customer.name} email={order.customer.email} />
      </DescriptionItem>
      <DescriptionItem label="Created at">
        <DateDisplay date={order.createdAt} showTime />
      </DescriptionItem>
      <DescriptionSection title="Order" />
      <DescriptionItem label="Status">
        <RoleBadge status={order.status} />
      </DescriptionItem>
      <DescriptionItem label="Total">
        <Statistic label="VND" value={order.total} />
      </DescriptionItem>
    </Description>
  );
}
```

---

## Semantic Color Tokens (TailwindCSS)

| Token | Usage |
|---|---|
| `text-text-positive` | Primary body text |
| `text-text-positive-weak` | Secondary / muted text |
| `text-text-positive-strong` | Emphasis / heading text |
| `text-text-positive-muted` | Placeholder / disabled text |
| `bg-primary` | Primary brand fill |
| `bg-secondary-muted` | Light gray surface (table headers, label columns) |
| `bg-card` | Card / panel background |
| `border-border` | Default border |
| `border-border-weak` | Subtle border / divider |
| `text-success` | Positive / success value |
| `text-danger` | Error / destructive value |
| `text-warning` | Cautionary value |

---

## Anti-patterns to Avoid

| ❌ Don't | ✅ Do instead |
|---|---|
| `import Button from '…/ui/button'` | `import { Button } from '…/ui/button'` |
| `import { Button } from '…/button'` | Include category: `'…/ui/button'` |
| Import from `@radix-ui/*` directly | Use the lunas-ui wrapper |
| Skip stylesheet imports | Always import `styles/base` + `styles/theme` |
| `window.confirm()` for destructive actions | Use `<ConfirmDialog>` |
| `<div className="flex gap-2">` | Use `<Flex gap="sm">` |
| Add `disabled` manually during loading | Use `isLoading` on `<Button>` |
