import { SidebarInset } from "@/components/ui/sidebar";

export const MainLayoutContent = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarInset>
      <section className="relative size-full">
        <div className="absolute inset-0">{children}</div>
      </section>
    </SidebarInset>
  );
};
