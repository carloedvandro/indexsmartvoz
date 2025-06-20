
import { ReactNode } from "react";
import { BalanceBar } from "@/components/client/layout/BalanceBar";

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden relative">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <BalanceBar />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </main>
    </div>
  );
};
