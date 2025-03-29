
import { Button } from "@/components/ui/button";

interface UserFormButtonsProps {
  onDelete?: () => void;
  isDeleting?: boolean;
  isLoading?: boolean;
}

export function UserFormButtons({ onDelete, isDeleting, isLoading }: UserFormButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button
        type="submit"
        className="flex-1 bg-[#18cb9f] hover:bg-[#16bb92] text-white h-12 text-lg font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar"}
      </Button>
      
      {onDelete && (
        <Button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Excluindo..." : "Excluir Usuário"}
        </Button>
      )}
    </div>
  );
}
