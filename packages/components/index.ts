// ─── Cards ───────────────────────────────────────────────────────────────────
export { GridProductCard } from './cards/grid-product-card';
export { ProductCard } from './cards/product-card';
export { SimpleCard } from './cards/simple-card';

// ─── Data Display ─────────────────────────────────────────────────────────────
export { CountryDisplay } from './data-display/country';
export { DataList, DataListItem } from './data-display/data-list';
export { DateDisplay } from './data-display/date';
export { DateTooltip } from './data-display/date-tooltip';
export { EmptyDisplay } from './data-display/empty';
export { NameDisplay } from './data-display/name';
export { PhoneNumberDisplay } from './data-display/phone-number';
export { RoleBadge } from './data-display/role-badge';
export { Statistic } from './data-display/statistic';
export type { StatisticProps } from './data-display/statistic';
export { UserDataDisplay } from './data-display/user';

// ─── Dialogs ──────────────────────────────────────────────────────────────────
export { ConfirmDialog } from './dialogs/confirm-dialog';
export type { ConfirmDialogProps } from './dialogs/confirm-dialog';
export { DetailDialog } from './dialogs/detail-dialog/index';
export type { DetailDialogProps } from './dialogs/detail-dialog/index';
export { ErrorDialog } from './dialogs/error-dialog';
export type { ErrorDialogProps } from './dialogs/error-dialog';
export { LoadingDialog } from './dialogs/loading-dialog';
export type { LoadingDialogProps } from './dialogs/loading-dialog';

// ─── Features ─────────────────────────────────────────────────────────────────
export {
  Description,
  DescriptionHeader,
  DescriptionItem,
  DescriptionSection,
} from './features/descriptions/index';
export * from './features/descriptions/components';
export { SearchModal } from './features/search-modal/index';
export * from './features/tables/index';
export * from './features/tanstack-form/index';

// ─── Layouts ──────────────────────────────────────────────────────────────────
export * from './layouts/cms-layout/index';
export * from './layouts/payment-layout/index';
export { Flex } from './layouts/flex';
export { Grid } from './layouts/grid';

// ─── Pages ────────────────────────────────────────────────────────────────────
export { FeatureDeveloping } from './pages/FeatureDeveloping';
export { FeatureFixing } from './pages/FeatureFixing';
export { NotAuthorized } from './pages/NotAuthorized';
export { NotFound } from './pages/NotFound';
export type { NotFoundProps } from './pages/NotFound';

// ─── Systems ──────────────────────────────────────────────────────────────────
export * from './systems/google';

// ─── Typography ───────────────────────────────────────────────────────────────
export { Paragraph, paragraphVariants } from './typography/paragraph';
export type { ParagraphProps } from './typography/paragraph';
export { Title } from './typography/title';
export type { TitleProps } from './typography/title';

// ─── UI — Specialized Buttons ─────────────────────────────────────────────────
export { AddNewBtn } from './ui/buttons/add-new';
export { EditBtn } from './ui/buttons/edit';
export { RefreshBtn } from './ui/buttons/refresh';
export { TrashBtn } from './ui/buttons/trash';
export { UploadImageBtn } from './ui/buttons/upload-image';

// ─── UI — Specialized Inputs ──────────────────────────────────────────────────
export { SearchInput } from './ui/inputs/search-input';

// ─── UI — Primitives ──────────────────────────────────────────────────────────
export * from './ui/alert';
export * from './ui/alert-dialog';
export * from './ui/aspect-ratio';
export * from './ui/avatar';
export { Badge, badgeVariants } from './ui/badge';
export type { BadgeProps } from './ui/badge';
export * from './ui/breadcrumb';
export { Button } from './ui/button';
export type { ButtonProps } from './ui/button';
export * from './ui/button-group';
export * from './ui/calendar';
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
export * from './ui/carousel';
export * from './ui/checkbox';
export * from './ui/collapsible';
export * from './ui/command';
export * from './ui/context-menu';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
export * from './ui/drawer';
export * from './ui/dropdown-menu';
export * from './ui/empty';
export * from './ui/file-uploader';
export * from './ui/form';
export * from './ui/hover-card';
export * from './ui/image';
export { Input } from './ui/input';
export type { InputVariantProps } from './ui/input';
export * from './ui/input-otp';
export * from './ui/item';
export * from './ui/label';
export * from './ui/menubar';
export * from './ui/multi-select';
export * from './ui/navigation-menu';
export * from './ui/pagination';
export * from './ui/popover';
export * from './ui/progress';
export * from './ui/radio-group';
export * from './ui/resizable';
export * from './ui/scroll-area';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select';
export * from './ui/separator';
export * from './ui/sheet';
export * from './ui/sidebar';
export * from './ui/skeleton';
export * from './ui/slider';
export * from './ui/sonner';
export * from './ui/spinner';
export * from './ui/switch';
export * from './ui/table';
export * from './ui/tabs';
export * from './ui/textarea';
export * from './ui/toggle';
export * from './ui/toggle-group';
export * from './ui/tooltip';
