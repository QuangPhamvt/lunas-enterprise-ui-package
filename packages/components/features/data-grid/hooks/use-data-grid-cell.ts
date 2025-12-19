import { useEffect, useRef, useState } from 'react';

const KEYS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Tab'];

export const useDataGridCell = () => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLElement>(null);

  const _allowRunEscapeKeyWrapper = useRef<boolean>(false);

  const [editing, setIsEditing] = useState<boolean>(false);

  // Wrapper Key Down Handler
  useEffect(() => {
    if (editing) return;
    const handleClick = () => {
      wrapperRef.current?.setAttribute('data-state', 'focus');
      wrapperRef.current?.setAttribute('tabindex', '0');
      wrapperRef.current?.focus();
    };

    const handleDoubleClick = () => {
      wrapperRef.current?.setAttribute('data-state', 'focus');
      wrapperRef.current?.setAttribute('tabindex', '-1');
      wrapperRef.current?.blur();
      setIsEditing(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (_allowRunEscapeKeyWrapper.current) {
          wrapperRef.current?.setAttribute('data-state', 'view');
          wrapperRef.current?.setAttribute('tabindex', '-1');
        } else _allowRunEscapeKeyWrapper.current = true;
      }

      if (event.key === 'Enter') {
        wrapperRef.current?.setAttribute('data-state', 'focus');
        wrapperRef.current?.setAttribute('tabindex', '-1');
        wrapperRef.current?.blur();
        setIsEditing(true);
        return;
      }

      const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Tab'];

      // Handle arrow key navigation
      if (!keys.includes(event.key) || !cellRef.current) return;

      // Set current cell to view state
      wrapperRef.current?.blur();

      const colIndex = cellRef.current.getAttribute('data-colindex');
      const rowIndex = cellRef.current.getAttribute('data-rowindex');
      if (colIndex === null || rowIndex === null) return;

      if (event.key === 'ArrowDown') {
        const nextRowIndex = parseInt(rowIndex) + 1;
        const nextCell = document.querySelector(`[data-rowindex="${nextRowIndex}"][data-colindex="${colIndex}"] div`);
        handleFocusCell(nextCell as HTMLElement | null, wrapperRef.current);
      } else if (event.key === 'ArrowUp') {
        const prevRowIndex = parseInt(rowIndex) - 1;
        const prevCell = document.querySelector(`[data-rowindex="${prevRowIndex}"][data-colindex="${colIndex}"] div`);
        handleFocusCell(prevCell as HTMLElement | null, wrapperRef.current);
      } else if (event.key === 'ArrowLeft') {
        const prevColIndex = parseInt(colIndex) - 1;
        const leftCell = document.querySelector(`[data-rowindex="${rowIndex}"][data-colindex="${prevColIndex}"] div`);
        handleFocusCell(leftCell as HTMLElement | null, wrapperRef.current);
      } else if (event.key === 'ArrowRight') {
        const nextColIndex = parseInt(colIndex) + 1;
        const rightCell = document.querySelector(`[data-rowindex="${rowIndex}"][data-colindex="${nextColIndex}"] div`);
        handleFocusCell(rightCell as HTMLElement | null, wrapperRef.current);
      } else if (event.key === 'Tab' && event.shiftKey) {
        const prevColIndex = parseInt(colIndex) - 1;
        const leftCell = document.querySelector(`[data-rowindex="${rowIndex}"][data-colindex="${prevColIndex}"] div`);
        handleFocusCell(leftCell as HTMLElement | null, wrapperRef.current);
        event.preventDefault();
      } else if (event.key === 'Tab' && !event.shiftKey) {
        const nextColIndex = parseInt(colIndex) + 1;
        const rightCell = document.querySelector(`[data-rowindex="${rowIndex}"][data-colindex="${nextColIndex}"] div`);
        handleFocusCell(rightCell as HTMLElement | null, wrapperRef.current);
        event.preventDefault();
      }
    };

    wrapperRef.current?.addEventListener('click', handleClick);
    wrapperRef.current?.addEventListener('dblclick', handleDoubleClick);
    wrapperRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      wrapperRef.current?.removeEventListener('click', handleClick);
      wrapperRef.current?.removeEventListener('dblclick', handleDoubleClick);
      wrapperRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [editing]);

  // Event listener depending on editing state
  useEffect(() => {
    if (editing) return;
    const handleBlur = () => {
      wrapperRef.current?.setAttribute('data-state', 'view');
      wrapperRef.current?.setAttribute('tabindex', '-1');
    };

    wrapperRef.current?.addEventListener('blur', handleBlur);

    return () => {
      wrapperRef.current?.removeEventListener('blur', handleBlur);
    };
  }, [editing]);

  // Input Key Down & Blur Handler
  useEffect(() => {
    if (!editing) return;

    // Focus the input when editing starts
    wrapperRef.current?.setAttribute('data-state', 'focus');
    wrapperRef.current?.setAttribute('tabindex', '-1');
    inputRef.current?.focus();

    const handleBlur = (event: MouseEvent) => {
      if (!event?.target) return;
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        wrapperRef.current?.setAttribute('data-state', 'view');
        setIsEditing(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
        wrapperRef.current?.setAttribute('data-state', 'focus');
        wrapperRef.current?.setAttribute('tabindex', '0');
        wrapperRef.current?.focus();
        inputRef.current?.blur();

        _allowRunEscapeKeyWrapper.current = false;
      }
      if (event.key === 'Enter') {
        setIsEditing(false);
        wrapperRef.current?.setAttribute('data-state', 'view');
        wrapperRef.current?.setAttribute('tabindex', '-1');
      }
      if (event.key === 'Tab') {
        setIsEditing(false);
        wrapperRef.current?.setAttribute('data-state', 'view');
        wrapperRef.current?.setAttribute('tabindex', '-1');
      }
      if (KEYS.includes(event.key)) {
        if (!cellRef.current) return;
        const colIndex = cellRef.current?.getAttribute('data-colindex');
        const rowIndex = cellRef.current?.getAttribute('data-rowindex');
        if (colIndex === null || rowIndex === null) return;

        wrapperRef.current?.setAttribute('data-state', 'view');
        wrapperRef.current?.setAttribute('tabindex', '-1');
        wrapperRef.current?.blur();
        setIsEditing(false);

        switch (event.key) {
          case 'ArrowDown': {
            const nextRowIndex = parseInt(rowIndex) + 1;
            const nextCell = document.querySelector(`[data-rowindex="${nextRowIndex}"][data-colindex="${colIndex}"] div`);
            handleFocusCell(nextCell as HTMLElement | null, wrapperRef.current);
            break;
          }
          case 'ArrowUp': {
            const prevRowIndex = parseInt(rowIndex) - 1;
            const prevCell = document.querySelector(`[data-rowindex="${prevRowIndex}"][data-colindex="${colIndex}"] div`);
            handleFocusCell(prevCell as HTMLElement | null, wrapperRef.current);
            break;
          }
          case 'ArrowLeft': {
            const prevColIndex = parseInt(colIndex) - 1;
            const leftCell = document.querySelector(`[data-rowindex="${rowIndex}"][data-colindex="${prevColIndex}"] div`);
            handleFocusCell(leftCell as HTMLElement | null, wrapperRef.current);
            break;
          }
          case 'ArrowRight': {
            const nextColIndex = parseInt(colIndex) + 1;
            const rightCell = document.querySelector(`[data-rowindex="${rowIndex}"][data-colindex="${nextColIndex}"] div`);
            handleFocusCell(rightCell as HTMLElement | null, wrapperRef.current);
            break;
          }
          default:
            break;
        }
        event.preventDefault();
      }
    };

    document.addEventListener('click', handleBlur);
    inputRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleBlur);
      inputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [editing]);

  return { cellRef, wrapperRef, inputRef, editing };
};

const handleFocusCell = (el: HTMLElement | null, curEl: HTMLElement | null) => {
  if (!el) {
    curEl?.setAttribute('data-state', 'focus');
    curEl?.setAttribute('tabindex', '0');
    curEl?.focus();
    return;
  }

  el.setAttribute('data-state', 'focus');
  el.setAttribute('tabindex', '0');
  el.focus();
};
