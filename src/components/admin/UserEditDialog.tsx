
import { 
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useUserForm } from "./hooks/useUserForm";
import { UserFormHeader } from "./dialogs/UserFormHeader";
import { UserInfoDisplay } from "./dialogs/UserInfoDisplay";
import { UserFormFields } from "./dialogs/UserFormFields";
import { UserPasswordActions } from "./dialogs/UserPasswordActions";
import { UserFormButtons } from "./dialogs/UserFormButtons";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isLoading,
    isDeleting,
    passwordMatch,
    availableSponsors,
    handleDelete,
    handleSave
  } = useUserForm(user, open, onOpenChange, onUserUpdated);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background p-0">
        <UserFormHeader user={user} />
        
        <form onSubmit={handleSubmit(handleSave)} className="px-6 py-4">
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-[#5438a0] hover:bg-[#4a3195] text-white rounded"
            >
              Usuário
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-[#5438a0] text-[#5438a0] rounded"
            >
              Adicionar Transação
            </button>
          </div>
          
          <UserInfoDisplay user={user} />
          
          <UserFormFields 
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            passwordMatch={passwordMatch}
            user={user}
            availableSponsors={availableSponsors}
          />
          
          {user?.id && (
            <UserPasswordActions 
              userId={user.id}
              userEmail={user.email}
            />
          )}
          
          <div className="mt-8">
            <UserFormButtons 
              onDelete={user?.id ? handleDelete : undefined}
              isDeleting={isDeleting}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
