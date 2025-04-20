
import { type FormEvent } from "react";
import { useIMEIValidation } from "./hooks/useIMEIValidation";
import { IMEIInput } from "./shared/IMEIInput";
import { NavigationButtons } from "./shared/NavigationButtons";
import { ValidationMessage } from "./shared/ValidationMessage";

type IMEIFormProps = {
  onSubmit: (imei: string) => void;
  onBack: () => void;
  deviceType: 'android' | 'ios';
};

export function IMEIForm({ onSubmit, onBack, deviceType }: IMEIFormProps) {
  const {
    imei,
    setIMEI,
    isValidIMEI,
    isValidating,
    deviceInfo,
    validateIMEI
  } = useIMEIValidation(deviceType);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidIMEI && !isValidating && imei.length === 15) {
      onSubmit(imei);
    }
  };

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6 pt-44">
      <div className="text-center space-y-2">
        <img 
          src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
          alt="Smartvoz Logo" 
          className="h-[140px] object-contain mx-auto mix-blend-multiply opacity-90 contrast-125"
        />
        <p className="text-black text-[15.7px] text-center mx-auto max-w-[320px]">
          O número precisa ser idêntico ao que aparece nas configurações do seu celular
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <IMEIInput 
          imei={imei}
          onChange={async (value) => {
            setIMEI(value);
            if (value.length === 15) {
              await validateIMEI(value);
            }
          }}
          isValid={isValidIMEI}
        />

        <ValidationMessage 
          show={!deviceInfo && imei.length === 15}
          isValidating={isValidating}
        />

        <p className="text-black text-sm">
          É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
        </p>

        <NavigationButtons 
          onBack={onBack}
          isSubmitDisabled={!isValidIMEI || isValidating || imei.length !== 15}
        />
      </form>
    </div>
  );
}

export default IMEIForm;
