import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Formats and displays a phone number string in a table cell using the
 * `(NXX) NXX-XXXX` pattern, with a tooltip that shows the full international
 * dialling representation.
 *
 * @example
 * import { UITablePhoneNumberDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITablePhoneNumberDisplay value="0843456789" />
 */
export const UITablePhoneNumberDisplay: React.FC<
  React.PropsWithChildren<{
    /** The raw phone number string to format and display. */
    value: string;
  }>
> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="font-number text-text-positive text-sm tabular-nums">{value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p className="tabular-nums">{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
