
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNetworkPlans } from "@/hooks/useNetworkPlans";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  plan_id?: string | null;
};

interface ProductFormProps {
  selectedProduct: Product | null;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function ProductForm({ selectedProduct, isLoading, onSubmit }: ProductFormProps) {
  const { data: plans, isLoading: isLoadingPlans } = useNetworkPlans();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Input
            name="name"
            placeholder="Product Name"
            defaultValue={selectedProduct?.name}
            required
          />
        </div>
        <div>
          <Textarea
            name="description"
            placeholder="Product Description"
            defaultValue={selectedProduct?.description || ""}
          />
        </div>
        <div>
          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            defaultValue={selectedProduct?.price}
            required
          />
        </div>
        <div>
          <Select name="plan_id" defaultValue={selectedProduct?.plan_id || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Select a plan (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No plan</SelectItem>
              {plans?.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            name="image"
            type="file"
            accept="image/*"
          />
        </div>
        <Button type="submit" disabled={isLoading || isLoadingPlans}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </DialogContent>
  );
}
