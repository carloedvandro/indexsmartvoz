
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, UserPlus } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  emailFilter: string;
  setEmailFilter: (value: string) => void;
  groupFilter: string;
  setGroupFilter: (value: string) => void;
}

export const SearchFilters = ({
  nameFilter,
  setNameFilter,
  emailFilter,
  setEmailFilter,
  groupFilter,
  setGroupFilter
}: SearchFiltersProps) => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
            <Input 
              id="name" 
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Filtrar por nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
            <Input 
              id="email" 
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              placeholder="Filtrar por e-mail"
            />
          </div>
          <div>
            <label htmlFor="groups" className="block text-sm font-medium mb-1">Grupos</label>
            <Input 
              id="groups" 
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              placeholder="Filtrar por grupos"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar Afiliado
          </Button>
          <Button variant="outline" className="border-gray-300">
            <Download className="mr-2 h-4 w-4" />
            Vender
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600">
            <Download className="mr-2 h-4 w-4" />
            Importar
          </Button>
        </div>
      </div>
    </div>
  );
};
