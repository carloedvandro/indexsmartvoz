
import React from "react";
import { BillingStatusCards } from "@/components/client/financial/BillingStatusCards";

export function FinancialCardsContainer() {
  return (
    <div className="w-full max-w-[1800px] px-4 md:px-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Situação Financeira</h2>
      <BillingStatusCards />
    </div>
  );
}
