import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SearchCommand } from './components/command';

/**
 * A full-screen command-palette modal that wraps the internal `SearchCommand` component inside an always-open dialog.
 *
 * @example
 * import { SearchModal } from '@customafk/lunas-ui/features/search-modal';
 *
 * // Render conditionally based on application state
 * {isSearchOpen && <SearchModal />}
 */
export const SearchModal = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} className="sm:max-w-3xl">
        <SearchCommand />
      </DialogContent>
    </Dialog>
  );
};
