
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { UserFormFields } from "./dialogs/UserFormFields";
import { UserFormActions } from "./dialogs/UserFormActions";
import { useUserForm } from "@/hooks/useUserForm";

interface UserEditDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
}

export function UserEditDialog({ 
  user, 
  open, 
  onOpenChange, 
  onUserUpdated 
}: UserEditDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    isLoading,
    isDeleting,
    initialPassword,
    setInitialPassword,
    handleDelete,
    handleSave,
  } = useUserForm({ user, onUserUpdated, onOpenChange });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>{user?.id ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <UserFormFields
            register={register}
            setValue={setValue}
            watch={watch}
            user={user}
            initialPassword={initialPassword}
            setInitialPassword={setInitialPassword}
          />
          <DialogFooter>
            <UserFormActions
              userId={user?.id}
              user={user}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              onCancel={() => onOpenChange(false)}
              onSuccess={onUserUpdated}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
