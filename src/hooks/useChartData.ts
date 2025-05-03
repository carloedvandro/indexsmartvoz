
export const useChartData = () => {
  const barData = [];
  const today = new Date();
  
  const baseValues = [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62];
  
  const monthAbbreviations = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomVariation = Math.floor(Math.random() * 5);
    const value = baseValues[14 - i] + randomVariation;
    
    barData.push({
      name: `${monthAbbreviations[date.getMonth()]} ${date.getDate()}`,
      value: value,
      previousValue: value - Math.floor(Math.random() * 8)
    });
  }

  // Sales data calculation
  const calculateSalesData = () => {
    // Monthly sales totals
    const monthlySales = 68494.50;
    
    // Sales breakdown - simplified for the two-color donut chart
    const salesData = {
      totalSales: monthlySales,
      distribution: {
        primarySegment: 55, // Percentage for the primary color segment (blue)
        secondarySegment: 45, // Percentage for the secondary color segment (purple)
      }
    };
    
    return salesData;
  };

  return { 
    barData,
    salesData: calculateSalesData()
  };
};
