interface ChartHeaderProps {
  title: string;
}

export const ChartHeader = ({ title }: ChartHeaderProps) => {
  return (
    <div className="text-left w-full mt-4 px-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};