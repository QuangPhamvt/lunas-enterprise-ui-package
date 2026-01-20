import { DescriptionEmpty } from './empty';

export const DescriptionBadge: React.FC<{
  label: string | number | null | undefined;
}> = ({ label }) => {
  if (!label) return <DescriptionEmpty />;
  return (
    <div className="w-fit rounded-full border border-border-weak px-3 py-1 font-medium text-text-positive-weak text-xs tabular-nums shadow-xs">{label}</div>
  );
};
