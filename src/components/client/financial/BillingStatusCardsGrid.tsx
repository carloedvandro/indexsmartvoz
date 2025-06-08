
import { BillingStatusCard } from "./BillingStatusCard";
import { billingCardConfigs } from "./constants/billingCardConfigs";

interface BillingStatusCardsGridProps {
  billingStatus: any;
  onClientsClick: (type: string) => void;
  onProgressBarHover: (event: React.MouseEvent, amount: number, paymentMethod: string, enter: boolean) => void;
}

export function BillingStatusCardsGrid({ 
  billingStatus, 
  onClientsClick, 
  onProgressBarHover 
}: BillingStatusCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[13px]">
      {Object.entries(billingCardConfigs).map(([key, config]) => {
        const statusData = billingStatus[key as keyof typeof billingStatus];
        return (
          <BillingStatusCard
            key={key}
            title={config.title}
            amountA={statusData.amount + 10}
            amountB={statusData.amount + 5}
            liquid={statusData.liquid}
            clients={statusData.clients}
            bills={statusData.bills}
            color={statusData.color}
            tooltip={statusData.tooltip}
            clientsData={statusData.clientsData}
            onClientsClick={() => onClientsClick(key)}
            onProgressBarHover={onProgressBarHover}
            barColors={config.barColors}
            cardType={key as 'received' | 'confirmed' | 'awaiting' | 'overdue'}
          />
        );
      })}
    </div>
  );
}
