'use client'
import HomeworkCard from "@/components/CoachHomework/homework-card";
import { useHomework } from "@/app/contexts/CoachContexts/homework-context";

export default function Presets() {
  const { homeworks, loading, error } = useHomework(); // Access homework state and loading/error status

  // Show a loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading homeworks...</p>
      </div>
    );
  }

  // Show an error message if fetching failed
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render the list of homework cards
  return (
    <div className="flex flex-wrap bg-white dark:bg-[#151718] h-full border-[1px] border-[#DFE3E6] dark:border-[#313538] border-t-[0px] p-[16px] gap-[16px] mb-2 rounded-b-2xl">
      {homeworks.length > 0 ? (
        homeworks.map((homework) => (
          <HomeworkCard
            key={homework.id}
            id={homework.id}
            title={homework.title}
            description={homework.description}
          />
        ))
      ) : (
        <div className="w-full text-center">
          <p>No homeworks available. Create your first homework!</p>
        </div>
      )}
    </div>
  );
}
