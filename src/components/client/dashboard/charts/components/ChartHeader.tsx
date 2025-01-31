interface ChartHeaderProps {
  title: string;
}

export const ChartHeader = ({ title }: ChartHeaderProps) => {
  return (
    <h3 className="text-2xl font-bold text-left mt-8">
      {title}
    </h3>
  );
};