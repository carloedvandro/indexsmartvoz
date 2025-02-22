
interface UsageInfoProps {
  used: number;
  total: number;
  bonusUsed: number;
  bonusTotal: number;
  bonusExpiration: Date | null;
}

export const UsageInfo = ({ used, total, bonusUsed, bonusTotal, bonusExpiration }: UsageInfoProps) => {
  if (bonusTotal > 0) {
    return (
      <>
        <div className="text-2xl font-semibold text-[#8425af]">
          {used} GB
          <span className="text-sm text-gray-500"> + {bonusUsed} GB bônus</span>
        </div>
        <div className="text-sm text-gray-500">
          de {total} GB
          {bonusTotal > 0 && ` + ${bonusTotal} GB bônus`}
        </div>
        {bonusExpiration && (
          <div className="text-xs text-orange-600">
            Bônus expira em {new Date(bonusExpiration).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="text-2xl font-semibold text-[#8425af]">{used} GB</div>
      <div className="text-sm text-gray-500">de {total} GB</div>
    </>
  );
};
