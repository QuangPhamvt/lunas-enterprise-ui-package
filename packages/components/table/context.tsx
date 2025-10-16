import { createContext, useContext, useMemo } from 'react';

type TableProviderProps = {
  measureElement: (element?: HTMLTableRowElement | null | undefined) => void;
  onClickRow?: (id: string) => void;
};

const TableContext = createContext<TableProviderProps | null>(null);

export const TableProvider = ({ measureElement, onClickRow, children }: React.PropsWithChildren<TableProviderProps>) => {
  const value = useMemo(() => ({ measureElement, onClickRow }), [measureElement, onClickRow]);
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export const useTableContext = (): TableProviderProps => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};
