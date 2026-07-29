import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmpty } from './empty';

/**
 * Formats and displays a phone number string in a table cell using the
 * `(NXX) NXX-XXXX` pattern, with a tooltip that shows the full international
 * dialling representation. Renders {@link UITableEmpty} when `value` is absent.
 *
 * @example
 * import { UITablePhoneNumberDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITablePhoneNumberDisplay value="0843456789" />
 */
export const UITablePhoneNumberDisplay: React.FC<{
  /** The raw phone number string to format and display; `null`/`undefined`/empty renders an empty state. */
  value: string | null | undefined;
}> = ({ value }) => {
  if (!value) return <UITableEmpty />;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="font-number text-text-positive text-sm tabular-nums">{value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p className="tabular-nums">{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '+84 $1 $2 $3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
