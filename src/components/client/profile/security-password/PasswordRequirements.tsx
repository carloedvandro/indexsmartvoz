
interface PasswordRequirement {
  text: string;
  valid: boolean;
}

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const passwordRequirements: PasswordRequirement[] = [
    { text: "Mínimo de 8 caracteres", valid: password.length >= 8 },
    { text: "Ao menos 1 letra maiúscula", valid: /[A-Z]/.test(password) },
    { text: "Ao menos 1 letra minúscula", valid: /[a-z]/.test(password) },
    { text: "Ao menos 1 número", valid: /\d/.test(password) },
    { text: "Ao menos 1 caractere especial", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {passwordRequirements.map((req, index) => (
        <div key={index} className={`text-sm flex items-center gap-2 ${req.valid ? 'text-green-600' : 'text-red-500'}`}>
          <span>{req.valid ? '✓' : '✗'}</span>
          {req.text}
        </div>
      ))}
    </div>
  );
}
