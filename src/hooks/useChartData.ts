export const useChartData = () => {
  const barData = [];
  const today = new Date();
  
  const baseValues = [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62];
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomVariation = Math.floor(Math.random() * 5);
    const value = baseValues[14 - i] + randomVariation;
    
    barData.push({
      name: `Nov ${date.getDate()}`,
      value: value,
      previousValue: value - Math.floor(Math.random() * 8)
    });
  }

  return { barData };
};