import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

interface ProductFormProps {
  selectedProduct: Product | null;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function ProductForm({ selectedProduct, isLoading, onSubmit }: ProductFormProps) {
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
          <Input
            name="image"
            type="file"
            accept="image/*"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </DialogContent>
  );
}