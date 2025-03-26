
import { useUserForm } from "@/hooks/admin/useUserForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { UserFormTabs } from "./UserFormTabs";
import { UserFormActions } from "./dialogs/UserFormActions";
import { PasswordManagement } from "./user-dialog/PasswordManagement";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const {
    form,
    isLoading,
    isDeleting,
    isResettingPassword,
    isSettingPassword,
    showPasswordInput,
    newPassword,
    setNewPassword,
    setShowPasswordInput,
    handleResetPassword,
    handleSetPassword,
    handleDelete,
    handleSave
  } = useUserForm(user, onUserUpdated, onOpenChange);

  const { register, handleSubmit, setValue, watch } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>{user?.id ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <UserFormTabs 
            register={register} 
            setValue={setValue} 
            watch={watch} 
            readOnly={!!user?.id}
          />
          
          {user?.id && (
            <PasswordManagement
              userId={user.id}
              showPasswordInput={showPasswordInput}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              setShowPasswordInput={setShowPasswordInput}
              handleResetPassword={handleResetPassword}
              handleSetPassword={handleSetPassword}
              isResettingPassword={isResettingPassword}
              isSettingPassword={isSettingPassword}
            />
          )}
          
          <DialogFooter>
            <UserFormActions
              userId={user?.id}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              onCancel={() => onOpenChange(false)}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
