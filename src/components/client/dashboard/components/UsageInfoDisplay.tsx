
import React from 'react';
import { PlanData } from '../types/dataUsage';

interface UsageInfoDisplayProps {
  planData: PlanData;
  dataUsage: {
    bonusTotal: number;
    bonusUsed: number;
    bonusExpiration: Date | null;
  };
}

export const UsageInfoDisplay: React.FC<UsageInfoDisplayProps> = ({ planData, dataUsage }) => {
  if (dataUsage.bonusTotal > 0) {
    return (
      <>
        <div className="text-2xl font-semibold text-[#8425af]">
          {planData.internetUsage.used} GB
          <span className="text-sm text-gray-500"> + {dataUsage.bonusUsed} GB bônus</span>
        </div>
        <div className="text-sm text-gray-500">
          de {planData.internetUsage.total} GB
          {dataUsage.bonusTotal > 0 && ` + ${dataUsage.bonusTotal} GB bônus`}
        </div>
        {dataUsage.bonusExpiration && (
          <div className="text-xs text-orange-600">
            Bônus expira em {planData.internetUsage.bonusExpiration}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="text-2xl font-semibold text-[#8425af]">{planData.internetUsage.used} GB</div>
      <div className="text-sm text-gray-500">de {planData.internetUsage.total} GB</div>
    </>
  );
};
