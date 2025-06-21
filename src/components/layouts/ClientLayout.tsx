
import { Outlet } from "react-router-dom";
import { BalanceBar } from "@/components/client/dashboard/BalanceBar";

export const ClientLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden relative">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <BalanceBar />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
