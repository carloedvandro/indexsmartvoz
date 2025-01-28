export const useChartData = () => {
  const generateInitialBarData = () => {
    const data = [
      { name: '01/Jan', value: 1000 },
      { name: '03/Jan', value: 1500 },
      { name: '05/Jan', value: 3000 },
      { name: '07/Jan', value: 1000 },
      { name: '09/Jan', value: 2500 },
      { name: '11/Jan', value: 1000 },
      { name: '13/Jan', value: 10000 },
      { name: '15/Jan', value: 500 },
      { name: '17/Jan', value: 1500 },
      { name: '19/Jan', value: 1000 },
      { name: '21/Jan', value: 800 },
      { name: '23/Jan', value: 1200 },
      { name: '25/Jan', value: 1800 },
      { name: '27/Jan', value: 900 },
      { name: '29/Jan', value: 1000 },
      { name: '31/Jan', value: 700 }
    ];

    return data.map(item => ({
      ...item,
      previousValue: Math.floor(item.value * 0.8)
    }));
  };

  return {
    barData: generateInitialBarData()
  };
};