import { auth, signOut } from "@/auth";
import CoachDashboardCard from "@/components/CoachDashboard/CoachDashboardCard";
import { DataTable } from "@/components/ExampleTable/data-table";
import { Payment, columns } from "@/components/ExampleTable/columns";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "sickguy@gmail.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "anotherdude@gmail.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "iwillnevergetbetteratracing@usuck.com",
  },
];

export default async function Coach() {
  const session = await auth();

  return (
    <div className="flex flex-col bg-white dark:bg-[#151718] h-full border p-[16px] gap-[16px] mb-2  rounded-b-2xl">
      <div className="flex flex-wrap gap-[16px] justify-center">
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

      <DataTable columns={columns} data={data} />
    </div>
  );
}
