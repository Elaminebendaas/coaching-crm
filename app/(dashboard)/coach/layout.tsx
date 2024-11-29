import CoachDashboardHeader from "@/components/Headers/CoachDashboardHeader";
import { CoachSidebar } from "@/components/Sidebars/CoachSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { HomeworkProvider } from "@/app/contexts/CoachContexts/homework-context";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const coachId = session?.user?.id; // Replace with how you retrieve the coach ID

  if (!coachId) {
    //make this sign them out
    return;
  }

  return (
    <SidebarProvider>
      <CoachSidebar />

      <main className="flex flex-col w-full pr-2 mt-2 bg-[#F8F9FA] dark:bg-[#1A1D1E]">
        <HomeworkProvider coachId={coachId}>
          <CoachDashboardHeader />
          {children}
        </HomeworkProvider>
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
