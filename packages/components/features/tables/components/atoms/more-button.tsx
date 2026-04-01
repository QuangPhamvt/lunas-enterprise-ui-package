import { MoreVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const UITableMoreButton: React.FC<{
  items?: { id: string; label: string; onClick: (id: string) => void }[];
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
