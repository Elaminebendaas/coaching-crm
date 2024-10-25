import { auth, signOut } from "@/auth";
import CoachDashboardCard from "@/components/CoachDashboard/CoachDashboardCard";

export default async function Coach() {
  const session = await auth();

  return (
    <div className="flex flex-wrap bg-white dark:bg-[#151718] h-full border p-[16px] gap-[16px] justify-center">
      <CoachDashboardCard title="Total Students" value="10" />
      <CoachDashboardCard
        title="Sessions this week"
        value="10"
        percentage="+10%"
      />
      <CoachDashboardCard title="Average Student iRating" value="1673" />
      <CoachDashboardCard
        title="Average Sessions per Student"
        value="10"
        percentage="10%"
      />
      <CoachDashboardCard
        title="Avg iRating increase"
        value="10"
        percentage="10%"
      />
      <CoachDashboardCard
        title="Total iRating increase"
        value="10"
        percentage="10%"
      />
    </div>
  );
}
