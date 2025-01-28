export const useChartData = () => {
  const generateInitialBarData = () => {
    const data = [];
    const today = new Date();
    
    // Generate smoother, more visually appealing data
    const baseValues = [42, 48, 45, 52, 48, 55, 58, 52, 55, 62, 58, 65, 68, 72, 75];
    const previousValues = [38, 42, 40, 45, 43, 48, 50, 47, 50, 55, 52, 58, 60, 65, 68];
    
    for (let i = 14; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Add small random variations to make the data look more natural
      const randomVariation = Math.floor(Math.random() * 3);
      const value = baseValues[14 - i] + randomVariation;
      const previousValue = previousValues[14 - i] + Math.floor(Math.random() * 2);
      
      data.push({
        name: `Nov ${date.getDate()}`,
        value: value,
        previousValue: previousValue
      });
    }
    
    return data;
  };

  return {
    barData: generateInitialBarData()
  };
};