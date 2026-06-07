import { useSidebar } from './sidebar';

// On mobile, the header is taller to accommodate the sidebar trigger, so we add an empty spacer div in the content area to prevent layout shift when the sidebar is toggled.
export const ContentEmpty: React.FC = () => {
  const { isMobile } = useSidebar();
  if (!isMobile) return;
  return <div className="h-16 w-full bg-transparent" />;
};
