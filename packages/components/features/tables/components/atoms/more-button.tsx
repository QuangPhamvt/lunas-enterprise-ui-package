import { MoreVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
  /** Reserved for future use; currently unused by the component. */
  onClick?: () => void;
}> = ({ items = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" color="secondary" className="size-9 rounded-full">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {items.map(item => (
            <DropdownMenuItem
              key={item.id}
              className="px-3"
              onSelect={e => {
                item.onClick(item.id);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
