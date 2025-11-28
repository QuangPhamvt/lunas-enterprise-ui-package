export const TanStackContainerForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="section-form" className="flex flex-col space-y-4">
      {children}
    </div>
  );
};
