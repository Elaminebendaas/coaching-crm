

export default function CoachDashboardCard({
  title,
  value,
  percentage,
  className,
  expandable,
  modal,
}: {
  title: string;
  value: string;
  percentage?: string;
  className?: string;
  expandable?: boolean;
  modal?: JSX.Element;
}) {
  return (
    <div
      className={`flex justify-between items-center dark:bg-[#151718] rounded-[12px] p-[12px] border-[1px] border-[#DFE3E6] dark:border-[#313538] w-[275px] h-[78px] shadow-sm ${className}`}
    >
      <div className="flex flex-col justify-between items-start m-[0px]">
        <h3 className="text-[14px] font-normal text-[#687076]">{title}</h3>
        <div className=" flex items-baseline">
          <p className="text-[20px] font-semibold">{value}</p>
          {percentage && (
            <span className="ml-2 text-sm font-medium text-gray-500">
              {percentage}
            </span>
          )}
        </div>
      </div>
      <div>{expandable && modal}</div>
    </div>
  );
}
