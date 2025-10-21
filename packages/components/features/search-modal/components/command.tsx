import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ForwardIcon, Package2Icon } from 'lucide-react';

const Item: React.FC<{
  value: string;
}> = ({ value }) => {
  return (
    <CommandItem value={value}>
      <div className="size-full flex space-x-2 items-center">
        <div className="size-12 border border-border rounded-lg bg-card" />
        <div className="flex flex-col grow text-sm">
          <p className="font-semibold">Content Item for {value}</p>
          <p className="font-medium text-text-positive-weak">100.000VND</p>
        </div>
        <button className="size-8 flex items-center justify-center grow-0">
          <ForwardIcon size={20} className="text-text-positive-weak" />
        </button>
      </div>
    </CommandItem>
  );
};

export const SearchCommand = () => {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty className="h-80 flex flex-col items-center justify-center space-y-2">
          <Package2Icon strokeWidth={1} size={64} className="text-text-positive-weak" />
          <span className="ml-2">No results found.</span>
        </CommandEmpty>
        <CommandGroup heading="Search Results">
          <Item value="example-item-1" />
          <Item value="example-item-2" />
          <Item value="example-item-3" />
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
