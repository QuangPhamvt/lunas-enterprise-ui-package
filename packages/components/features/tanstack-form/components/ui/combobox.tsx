import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './popover';

const Combobox: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>trigeer</PopoverTrigger>
      <PopoverContent>content</PopoverContent>
    </Popover>
  );
};
