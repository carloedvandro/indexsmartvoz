
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface OrderFilters {
  status: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  clienteName: string;
  planName: string;
}

interface OrderFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function OrderFiltersDialog({
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange,
  onApplyFilters,
  onClearFilters
}: OrderFiltersDialogProps) {
  const [localFilters, setLocalFilters] = useState<OrderFilters>(filters);

  const updateFilter = (key: keyof OrderFilters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onOpenChange(false);
  };

  const handleClear = () => {
    const clearedFilters: OrderFilters = {
      status: "all",
      startDate: undefined,
      endDate: undefined,
      clienteName: "",
      planName: ""
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtros de Contratações</DialogTitle>
          <DialogDescription>
            Configure os filtros para refinar sua busca
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={localFilters.status} 
              onValueChange={(value) => updateFilter('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="chip_activation">Ativação de Chip</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date Filter */}
          <div className="space-y-2">
            <Label>Data Inicial</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !localFilters.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {localFilters.startDate ? format(localFilters.startDate, "dd/MM/yyyy") : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={localFilters.startDate}
                  onSelect={(date) => updateFilter('startDate', date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date Filter */}
          <div className="space-y-2">
            <Label>Data Final</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !localFilters.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {localFilters.endDate ? format(localFilters.endDate, "dd/MM/yyyy") : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={localFilters.endDate}
                  onSelect={(date) => updateFilter('endDate', date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Client Name Filter */}
          <div className="space-y-2">
            <Label>Nome do Cliente</Label>
            <Input
              placeholder="Digite o nome do cliente..."
              value={localFilters.clienteName}
              onChange={(e) => updateFilter('clienteName', e.target.value)}
            />
          </div>

          {/* Plan Name Filter */}
          <div className="space-y-2">
            <Label>Plano</Label>
            <Input
              placeholder="Digite o nome do plano..."
              value={localFilters.planName}
              onChange={(e) => updateFilter('planName', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClear}>
            Limpar Filtros
          </Button>
          <Button onClick={handleApply}>
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
