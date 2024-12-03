import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { useNavigate } from "react-router-dom";

interface StoreHeaderProps {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  selectedProduct: any;
}

export function StoreHeader({ isLoading, onSubmit, selectedProduct }: StoreHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">My Store</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
        <ProductForm
          selectedProduct={selectedProduct}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </Dialog>
    </div>
  );
}