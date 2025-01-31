interface ChartHeaderProps {
  title: string;
}

export const ChartHeader = ({ title }: ChartHeaderProps) => {
  return (
    <h3 className="text-2xl font-bold text-left w-full px-4 mt-12">
      {title}
    </h3>
  );
};