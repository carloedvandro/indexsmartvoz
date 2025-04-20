
type ValidationMessageProps = {
  show: boolean;
  isValidating: boolean;
};

export function ValidationMessage({ show, isValidating }: ValidationMessageProps) {
  if (!show || isValidating) return null;
  
  return (
    <div className="text-center p-4 bg-red-50 rounded-lg">
      <p className="text-sm text-red-600">
        Este IMEI não corresponde a um dispositivo com suporte a eSIM
      </p>
    </div>
  );
}
