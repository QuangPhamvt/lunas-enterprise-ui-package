'use client';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

type Props = {
  /** The card's heading text displayed in the header. */
  title: string;
  /** Optional subtitle or description shown below the title. */
  description?: string;
  /** Optional node rendered as a card action (e.g. a button) in the header. */
  action?: React.ReactNode;
  /** Optional node rendered inside the card footer. */
  footer?: React.ReactNode;
};

/**
 * A general-purpose card with a header, optional description, action slot, content area, and footer.
 *
 * @example
 * ```tsx
 * import { SimpleCard } from '@customafk/lunas-ui/cards/simple-card';
 *
 * <SimpleCard title="Summary" description="Overview of results">
 *   <p>Card body content goes here.</p>
 * </SimpleCard>
 * ```
 */
export const SimpleCard = ({ title, description, action, footer, children }: React.PropsWithChildren<Props>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
