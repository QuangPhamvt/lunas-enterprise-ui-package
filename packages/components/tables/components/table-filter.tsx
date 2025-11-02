import { Activity, useState } from 'react';

import { Columns4Icon, ListFilterIcon, ListFilterPlus } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';

export const TableFilter = () => {
  const [tab, setTab] = useState<'columns' | 'filters' | null>(null);
  return (
    <ResizablePanel defaultSize={25} className="bg-card">
      <div className="relative z-20 flex size-full bg-muted-bg-subtle">
        <div className="flex-1">
          <Activity mode={tab === 'columns' ? 'visible' : 'hidden'}>adsdad</Activity>
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
