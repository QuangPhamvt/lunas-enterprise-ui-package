import { Activity, useState } from 'react';

import { Columns4Icon, ListFilterIcon, ListFilterPlus } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { useUITableContext } from '../hooks/use-table-context';

const ColumnVisibility: React.FC<{
  checked: boolean;
  title: string;
  onCheckedChange?: (checked: boolean) => void;
}> = ({ checked, title, onCheckedChange }) => {
  return (
    <div className="flex h-fit items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <p className="text-sm">{title}</p>
    </div>
  );
};

export const UITableFilter = () => {
  const { table } = useUITableContext();
  const [tab, setTab] = useState<'columns' | 'filters' | null>(null);

  return (
    <ResizablePanel defaultSize={25} className={cn('bg-card', tab === null ? 'max-w-8!' : 'min-w-64')}>
      <div className="relative z-20 flex size-full bg-muted-bg-subtle">
        <div className="flex-1">
          <Activity mode={tab === 'columns' ? 'visible' : 'hidden'}>
            <div className="flex size-full flex-col gap-2 p-4">
              <p className="px-2 font-medium">Columns Visibility</p>
              <Separator />
              <div className="flex flex-col gap-4 pt-4">
                {table.getAllColumns().map(column => {
                  if (['select', 'actions'].includes(column.id)) return null;
                  return (
                    <ColumnVisibility
                      key={column.id}
                      checked={column.getIsVisible()}
                      title={String(column.columnDef.header)}
                      onCheckedChange={value => column.toggleVisibility(!!value)}
                    />
                  );
                })}
              </div>
            </div>
          </Activity>
          <Activity mode={tab === 'filters' ? 'visible' : 'hidden'}>
            <div className="flex size-full flex-col p-2">
              <Button variant="outline" color="muted">
                <ListFilterPlus />
                Add Filter
              </Button>
            </div>
          </Activity>
        </div>
        <div className="flex h-full flex-col border-border border-l bg-muted-bg-subtle text-sm">
          <button
            className={cn('flex h-32 cursor-pointer flex-col items-center gap-y-2 p-2 py-4', tab === 'columns' && 'bg-card')}
            onClick={() => setTab(tab === 'columns' ? null : 'columns')}
          >
            <Columns4Icon size={18} />
            <span className="text-nowrap [writing-mode:vertical-lr]">Columns</span>
          </button>
          <Separator />
          <button
            className={cn('flex h-32 cursor-pointer flex-col items-center gap-y-2 p-2 py-4', tab === 'filters' && 'bg-card')}
            onClick={() => setTab(tab === 'filters' ? null : 'filters')}
          >
            <ListFilterIcon size={18} />
            <span className="text-nowrap [writing-mode:vertical-lr]">Filters</span>
          </button>
          <Separator />
        </div>
      </div>
    </ResizablePanel>
  );
};
