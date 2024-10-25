import CoachDashboardHeader from "@/components/Headers/CoachDashboardHeader";
import { CoachSidebar } from "@/components/Sidebars/CoachSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CoachSidebar />

      <main className="flex flex-col w-full pr-2 mt-2 bg-[#F8F9FA] dark:bg-[#1A1D1E]">
        <CoachDashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
