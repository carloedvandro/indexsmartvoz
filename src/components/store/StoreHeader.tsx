
import { useProfile } from "@/hooks/useProfile";

interface StoreHeaderProps {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  selectedProduct: any;
  isManager: boolean;
}

export function StoreHeader({ isLoading, onSubmit, selectedProduct, isManager }: StoreHeaderProps) {
  const { data: profile } = useProfile();

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-start pl-2">
        <h2 className="text-2xl font-bold text-left">Plano Smartvoz</h2>
      </div>
    </div>
  );
}
