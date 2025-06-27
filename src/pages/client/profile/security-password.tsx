
import { useNavigate } from "react-router-dom";
import { SecurityPasswordHeader } from "@/components/client/profile/security-password/SecurityPasswordHeader";
import { SecurityPasswordTabs } from "@/components/client/profile/security-password/SecurityPasswordTabs";
import { SecurityPasswordForm } from "@/components/client/profile/security-password/SecurityPasswordForm";

export default function ClientSecurityPassword() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <SecurityPasswordHeader onBack={handleBack} />
        <SecurityPasswordTabs />
        <SecurityPasswordForm />
      </div>
    </div>
  );
}
