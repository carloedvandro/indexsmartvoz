
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
      name: `${date.toLocaleString('pt-BR', { month: 'short' })} ${date.getDate()}`,
      value: value,
      previousValue: value - Math.floor(Math.random() * 8)
    });
  }

  // Commission data calculation based on network size
  const calculateCommissions = () => {
    // Fictional network data
    const networkSize = {
      level1: 12, // members in level 1
      level2: 35, // members in level 2
      level3: 87, // members in level 3
      level4: 124, // members in level 4
    };
    
    // Commission rates per level
    const commissionRates = {
      level1: 20, // R$20.00 per member
      level2: 5,  // R$5.00 per member
      level3: 5,  // R$5.00 per member
      level4: 5,  // R$5.00 per member
    };
    
    // Purchase commission rates per level (based on the image)
    const purchaseCommissionRates = {
      level1: 26.00, // R$26.00 per purchase
      level2: 6.50,  // R$6.50 per purchase
      level3: 6.50,  // R$6.50 per purchase
      level4: 6.50,  // R$6.50 per purchase
    };
    
    // Calculate commission totals
    const commissions = {
      level1: networkSize.level1 * commissionRates.level1,
      level2: networkSize.level2 * commissionRates.level2,
      level3: networkSize.level3 * commissionRates.level3,
      level4: networkSize.level4 * commissionRates.level4,
    };
    
    const totalCommission = 
      commissions.level1 + 
      commissions.level2 + 
      commissions.level3 + 
      commissions.level4;
    
    return {
      networkSize,
      commissionRates,
      purchaseCommissionRates,
      commissions,
      totalCommission
    };
  };

  return { 
    barData,
    commissionData: calculateCommissions()
  };
};
