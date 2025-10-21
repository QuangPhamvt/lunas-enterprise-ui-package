import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SearchCommand } from './components/command';

export const SearchModal = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} className="sm:max-w-3xl">
        <SearchCommand />
      </DialogContent>
    </Dialog>
  );
};
