'use client';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { AlertTriangle, ChevronDown } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Spinner } from '@/components/ui/spinner';

import { useUITableInnerWrapperContext } from '../../hooks/use-context';
import type { TUITableLoadMore } from '../../types';
import { tableLoadMoreButtonVariants } from '../table.variants';

export const UITableLoadMore = memo<TUITableLoadMore>(({ virtualRowIndex, virtualRowStart, fetchMoreData }) => {
  const { innerWrapperId } = useUITableInnerWrapperContext();

  const tableWrapperRef = useRef<Element | null>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);

  const [fetchingState, setFetchingState] = useState<'idle' | 'fetching' | 'error'>('idle');
  const [width, setWidth] = useState<number>(0);

  const handleFetchMoreData = useCallback(async () => {
    try {
      setFetchingState('fetching');
      await fetchMoreData?.();
      setFetchingState('idle');
    } catch (error) {
      console.error('Error fetching more data:', error);
      setFetchingState('error');
    }
  }, [fetchMoreData]);

  useEffect(() => {
    tableWrapperRef.current = document.querySelector(`div[id="${innerWrapperId}"]`);
    if (!tableWrapperRef.current) return;

    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(tableWrapperRef.current);
    return () => observer.disconnect();
  }, [innerWrapperId]);

  if (!fetchMoreData) return null;

  return (
    <tr ref={rowRef} data-index={virtualRowIndex} style={{ transform: `translateY(${virtualRowStart}px)`, width }} className="sticky! left-0 h-10">
      <td className="absolute left-0 flex w-full items-center justify-center text-xs">
        <button
          type="button"
          disabled={fetchingState === 'fetching'}
          className={tableLoadMoreButtonVariants({ state: fetchingState })}
          onClick={handleFetchMoreData}
        >
          {fetchingState === 'idle' && <ChevronDown className="size-4" />}
          {fetchingState === 'fetching' && <Spinner className="size-4 animate-spin" />}
          {fetchingState === 'error' && <AlertTriangle className="size-4 text-danger" />}
          {fetchingState === 'idle' && 'Tải thêm'}
          {fetchingState === 'fetching' && 'Đang tải...'}
          {fetchingState === 'error' && 'Lỗi! Thử lại?'}
        </button>
      </td>
    </tr>
  );
});
UITableLoadMore.displayName = 'UITableLoadMore';
