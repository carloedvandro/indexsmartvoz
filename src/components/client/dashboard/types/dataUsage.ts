
export interface PlanData {
  planName: string;
  price: number;
  renewalDate: Date;
  dataLimit: number;
  dataUsed: number;
  voiceMinutes: string | number;
  sms: string | number;
}
