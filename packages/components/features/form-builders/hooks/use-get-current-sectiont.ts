import { useMemo } from 'react';
import { useFormBuilderValueContext } from '../components/providers';

export const useGetCurrentSection = (sectionIndex: number) => {
  const { formBuilder } = useFormBuilderValueContext();

  const currentSection = useMemo(() => {
    return formBuilder.sections[sectionIndex] || null;
  }, [formBuilder]);

  return { currentSection };
};
