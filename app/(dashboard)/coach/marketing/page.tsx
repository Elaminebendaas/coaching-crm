import { auth } from "@/auth";
import EmailCampaign from "@/components/CoachMarketing/EmailCampaigns";
import { fetchStudentsForCoach } from "@/util/coach";
export default async function Marketing() {
  
  const session = await auth()
  
  if (!session) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Please sign in to access this page</p>
      </div>
    );
  }
const userId = session?.user?.id;
if(!userId) {
  return
}

const students = await fetchStudentsForCoach(userId);
  
  return (
    <div className="flex flex-wrap bg-white dark:bg-[#151718] h-full border-[1px] border-[#DFE3E6] dark:border-[#313538] border-t-[0px] p-[16px] gap-[16px] mb-2 rounded-b-2xl">
      <EmailCampaign students={students}/>
    </div>
  );
}
