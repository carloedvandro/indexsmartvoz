
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, UserCheck, UserPlus, Download, Eye, Edit, Info, Key, Trash, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Flag icon component
const BrazilFlag = () => (
  <div className="flex justify-center">
    <img src="/br-flag.svg" alt="Brazil" className="h-6 w-6" />
  </div>
);

export function AdminUsersList({ users = [], onEdit }) {
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  // Helper function to display user ID properly - use user's actual ID instead of default
  const displayCustomId = (user) => {
    // Only return Gesia89 if both custom_id and external_id are null or undefined
    if (user?.custom_id) return user.custom_id;
    if (user?.external_id) return user.external_id;
    return ""; // Return empty string if no ID exists
  };

  // This will refresh the UI when a user is updated
  const handleEditClick = (user) => {
    if (onEdit) {
      console.log("Editing user:", user);
      onEdit(user);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
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
      
      <div className="px-4 py-2">
        <div className="bg-indigo-500 text-white py-1 px-3 rounded inline-block">
          Mostrar usuários ({users.length || 417})
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>Detalhes do Usuário</TableHead>
              <TableHead className="whitespace-nowrap">Status do Usuário</TableHead>
              <TableHead>Indicação</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} className="border-b">
                <TableCell>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 mr-2" />
                    <span className="font-medium">{index + 465}</span>
                    <button className="ml-1 text-indigo-600">+</button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.full_name}</span>
                    {displayCustomId(user) && (
                      <span className="text-sm text-gray-500">Meu ID: {displayCustomId(user)}</span>
                    )}
                    <span className="text-sm text-blue-500">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {user.status === "pending" ? (
                    <span className="text-red-500 font-medium">Pendente</span>
                  ) : (
                    <span className="text-green-500 font-medium">Ativo</span>
                  )}
                </TableCell>
                <TableCell>
                  <span>{user.role === "admin" ? "Administrador" : "Smartvoz"}</span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="default" className="bg-cyan-500 hover:bg-cyan-600 h-8 w-8 p-0">
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
                      onClick={() => handleEditClick(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="default" className="bg-red-500 hover:bg-red-600 h-8 w-8 p-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="default" className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
