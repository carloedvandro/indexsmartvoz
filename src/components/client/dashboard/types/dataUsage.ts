
export interface DataUsageState {
  used: number;
  total: number;
  percentage: number;
  bonusUsed: number;
  bonusTotal: number;
  bonusPercentage: number;
  bonusExpiration: Date | null;
  planRenewalDate: Date | null;
  activePlanName: string;
  activePlanCode: string;
}

export interface PlanData {
  type: string;
  code: string;
  number: string;
  internetUsage: {
    used: number;
    total: number;
    bonusUsed: number;
    bonusTotal: number;
    renewalDate: string;
    bonusExpiration: string | null;
  };
  billing: {
    amount: number;
    dueDate: string;
    status: string;
  };
}
