import { useCallback } from 'react';

import { Button } from '../ui/button';
import { useFormContext } from './config';

type Props = {
  label?: string;
};
export const SubscribeButton: React.FC<Props> = ({ label = 'Submit' }) => {
  const { Subscribe, handleSubmit } = useFormContext();
  const onSubmit = useCallback(async () => {
    await handleSubmit();
  }, [handleSubmit]);
  return (
    <Subscribe
      selector={state => ({
        isSubmitting: state.isSubmitting,
        isDisabled: !state.isValid,
      })}
    >
      {({ isDisabled, isSubmitting }) => {
        return (
          <Button type="submit" disabled={isDisabled} isLoading={isSubmitting} className="w-32" onClick={onSubmit}>
            {isSubmitting ? 'Submitting...' : label}
          </Button>
        );
      }}
    </Subscribe>
  );
};
