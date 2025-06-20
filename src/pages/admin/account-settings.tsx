
import { EmailUpdateForm } from "@/components/admin/account-settings/EmailUpdateForm";
import { PasswordUpdateForm } from "@/components/admin/account-settings/PasswordUpdateForm";
import { AccountSettingsHeader } from "@/components/admin/account-settings/AccountSettingsHeader";

export default function AdminAccountSettings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <AccountSettingsHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmailUpdateForm />
          <PasswordUpdateForm />
        </div>
      </div>
    </div>
  );
}
