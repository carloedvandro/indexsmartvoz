
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProfileWithSponsor } from "@/types/profile";
import { UserGroupsManager } from "./UserGroupsManager";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserFormFieldsProps {
  register: any;
  setValue: any;
  watch: any;
  errors: any;
  passwordMatch: boolean;
  user: ProfileWithSponsor | null;
  availableSponsors: ProfileWithSponsor[];
}

export function UserFormFields({ 
  register, 
  setValue, 
  watch, 
  errors, 
  passwordMatch, 
  user, 
  availableSponsors 
}: UserFormFieldsProps) {
  const [showGroupsDialog, setShowGroupsDialog] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome Completo</Label>
          <Input 
            {...register("full_name")}
            placeholder="Nome completo"
            className={errors.full_name ? "border-red-500" : ""}
          />
        </div>
        <div className="space-y-2">
          <Label>Sobrenome</Label>
          <Input 
            {...register("last_name")}
            placeholder="Sobrenome"
            className={errors.last_name ? "border-red-500" : ""}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Email</Label>
        <Input 
          {...register("email")} 
          type="email" 
          placeholder="email@exemplo.com" 
          readOnly={!!user?.id}
          className={errors.email ? "border-red-500" : ""}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Status do fornecedor</Label>
        <select 
          {...register("status")} 
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="active">Habilitar</option>
          <option value="blocked">Desabilitar</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Telefone</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
              <img src="/br-flag.svg" alt="Brasil" className="w-5 h-3 mr-1" /> +55
            </span>
            <Input 
              {...register("phone")} 
              className="rounded-l-none" 
              placeholder="Telefone"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Nome de usuário</Label>
          <Input 
            {...register("custom_id")} 
            placeholder="Nome de usuário"
            className={errors.custom_id ? "border-red-500" : ""}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Senha</Label>
          <Input 
            type="password" 
            {...register("password")} 
            placeholder="Senha"
            className={!passwordMatch ? "border-red-500" : ""}
          />
        </div>
        <div className="space-y-2">
          <Label>Repetir a Senha</Label>
          <Input 
            type="password" 
            {...register("repeat_password")} 
            placeholder="Repetir a senha"
            className={!passwordMatch ? "border-red-500" : ""}
          />
          {!passwordMatch && (
            <p className="text-xs text-red-500">As senhas não coincidem</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Em Afiliado</Label>
        <select 
          {...register("sponsor_id")} 
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="">-- Nenhum --</option>
          {availableSponsors.map(sponsor => (
            <option key={sponsor.id} value={sponsor.id}>
              {sponsor.full_name || sponsor.email || sponsor.custom_id || sponsor.id}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <Label>País</Label>
        <select 
          {...register("country")} 
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="Brasil">Brasil</option>
          <option value="Portugal">Portugal</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="Canadá">Canadá</option>
          <option value="Espanha">Espanha</option>
          <option value="Itália">Itália</option>
          <option value="França">França</option>
          <option value="Alemanha">Alemanha</option>
          <option value="Reino Unido">Reino Unido</option>
          <option value="Japão">Japão</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label>Grupos</Label>
        <div className="relative">
          <Input 
            {...register("user_groups")}
            placeholder="Atribuir grupos de usuários" 
            onFocus={() => setShowGroupsDialog(true)}
            readOnly
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-0 h-full text-[#5438a0]"
            onClick={() => setShowGroupsDialog(true)}
          >
            <Users size={18} />
          </Button>
        </div>
        
        {showGroupsDialog && (
          <UserGroupsManager
            userId={user?.id || null}
            value={watch("user_groups") || ""}
            onChange={(value) => setValue("user_groups", value)}
            onClose={() => setShowGroupsDialog(false)}
          />
        )}
      </div>
    </div>
  );
}
