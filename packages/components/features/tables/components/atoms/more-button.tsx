import { memo, useCallback } from 'react';

import { MoreVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const DropdownMenuItemComponent: React.FC<
  React.ComponentProps<typeof DropdownMenuItem> & {
    itemId: string;
    onSelectItem?: (itemId: string) => void;
  }
> = ({ onSelectItem, itemId, ...props }) => {
  const handleSelect = useCallback(
    (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      if (onSelectItem) onSelectItem(itemId);
    },
    [onSelectItem, itemId]
  );

  return <DropdownMenuItem {...props} onSelect={handleSelect} />;
};

/**
 * A vertical-ellipsis icon button that opens a dropdown menu populated from the
 * `items` array; intended for use in table row action columns.
 *
 * @example
 * import { UITableMoreButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableMoreButton
 *   items={[
 *     { id: 'edit', label: 'Edit', onClick: (id) => console.log(id) },
 *     { id: 'delete', label: 'Delete', onClick: (id) => console.log(id) },
 *   ]}
 * />
 */
export const UITableMoreButton: React.FC<{
  /**
   * List of menu items to render inside the dropdown.
   * Each item must have a unique `id`, a display `label`, and an `onClick`
   * handler that receives the item's `id`.
   */
  items?: { id: string; label: string; onClick: (id: string) => void }[];
}> = memo(({ items = [] }) => {
  const hasItems = items.length > 0;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!hasItems) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" color="muted" className="rounded-full" onClick={handleClick}>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {items.map(item => (
            <DropdownMenuItemComponent key={item.id} className="px-3" itemId={item.id} onSelectItem={item.onClick}>
              {item.label}
            </DropdownMenuItemComponent>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
UITableMoreButton.displayName = 'UITableMoreButton';
