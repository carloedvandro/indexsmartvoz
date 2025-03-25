
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
import { Search } from "lucide-react";

export function UserSearchForm({ filters, setFilters, onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="externalId">ID Externo</Label>
          <Input
            id="externalId"
            value={filters.externalId}
            onChange={(e) =>
              setFilters({ ...filters, externalId: e.target.value.trim() })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            value={filters.fullName}
            onChange={(e) =>
              setFilters({ ...filters, fullName: e.target.value.trim() })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={filters.email}
            onChange={(e) =>
              setFilters({ ...filters, email: e.target.value.trim() })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters({ ...filters, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="blocked">Bloqueado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="documentId">CPF</Label>
          <Input
            id="documentId"
            value={filters.documentId}
            onChange={(e) =>
              setFilters({ ...filters, documentId: e.target.value.trim() })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={filters.cnpj}
            onChange={(e) =>
              setFilters({ ...filters, cnpj: e.target.value.trim() })
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
    </form>
  );
}
