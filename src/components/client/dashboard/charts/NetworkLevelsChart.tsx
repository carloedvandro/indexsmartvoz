import { PieChartStats } from "./PieChartStats";

export const NetworkLevelsChart = () => {
  const statsData = [
    {
      title: "Nível 1",
      value: 75,
      data: [
        { name: "Complete", value: 75, color: "#6E59A5" },
        { name: "Remaining", value: 25, color: "#E2E8F0" }
      ]
    },
    {
      title: "Nível 2",
      value: 82,
      data: [
        { name: "Complete", value: 82, color: "#38BDF8" },
        { name: "Remaining", value: 18, color: "#E2E8F0" }
      ]
    },
    {
      title: "Nível 3",
      value: 65,
      data: [
        { name: "Complete", value: 65, color: "#818CF8" },
        { name: "Remaining", value: 35, color: "#E2E8F0" }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Níveis da Rede</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="h-[200px]">
            <PieChartStats
              data={stat.data}
              title={stat.title}
              value={stat.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};