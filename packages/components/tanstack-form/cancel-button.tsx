import { useCallback } from 'react';

import { Button } from '../ui/button';
import { useFormContext } from './config';

type Props = {
  label?: string;
};
export const CancelButton: React.FC<Props> = ({ label = 'Cancel' }) => {
  const { Subscribe, reset } = useFormContext();

  const onCancel = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <Subscribe
      selector={state => ({
        isSubmitting: state.isSubmitting,
      })}
    >
      {({ isSubmitting }) => {
        return (
          <Button type="button" disabled={isSubmitting} variant="outline" color="muted" className="w-32" onClick={onCancel}>
            {label}
          </Button>
        );
      }}
    </Subscribe>
  );
};
