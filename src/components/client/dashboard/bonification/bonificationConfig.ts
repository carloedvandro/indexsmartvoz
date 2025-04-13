
// Commission tiers data
export const commissionTiers = [
  { level: 1, value: 20.00, label: "1° Nível" },
  { level: 2, value: 5.00, label: "2° Nível" },
  { level: 3, value: 5.00, label: "3° Nível" },
  { level: 4, value: 5.00, label: "4° Nível" },
];

// Updated data for the area chart with the new purchase value
export const chartData = [
  { name: 'Adesão', total: 40.00, commissions: commissionTiers.map(tier => tier.value) },
  { name: 'Compras', total: 119.99, commissions: commissionTiers.map(tier => tier.value * 1.3) },
];

// Calculate monthly commissions based on the data
export const calculateMonthlyCommission = (tier: number) => {
  // Assume we have 10 adhesions per month
  const adhesionsPerMonth = 10;
  // New purchase value of R$119.99
  const purchaseValue = 119.99;
  
  if (tier === 0) {
    // Total of all tiers
    return commissionTiers.reduce((acc, t) => acc + (t.value * adhesionsPerMonth), 0);
  }
  
  // Individual tier calculation
  const tierData = commissionTiers.find(t => t.level === tier);
  return tierData ? tierData.value * adhesionsPerMonth : 0;
};
