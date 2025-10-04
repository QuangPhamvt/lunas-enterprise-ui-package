import { Flex } from '@/components/layouts/flex';
import { AddNewBtn } from '@/components/ui/buttons/add-new';
import { RefreshBtn } from '@/components/ui/buttons/refresh';
import { SearchInput } from '@/components/ui/inputs/search-input';

type Props = {
  onAdd?: () => void;
  onRefresh?: () => void;
};

export const DataTableHeader: React.FC<Props> = ({ onAdd, onRefresh }) => {
  return (
    <Flex justify="between" padding="none" width="full" className="flex-0">
      <div className="max-sm:flex-1">
        <SearchInput placeholder="Search..." />
      </div>
      <Flex wrap={false} className="flex-0 px-0">
        {!!onAdd && <AddNewBtn onClick={onAdd} />}
        <RefreshBtn onClick={onRefresh} />
      </Flex>
    </Flex>
  );
};
