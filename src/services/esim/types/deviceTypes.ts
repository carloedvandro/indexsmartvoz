
export type DeviceValidationResult = {
  isValid: boolean;
  error?: string;  // Adicionando a propriedade error como opcional
  deviceInfo?: {
    brand: string;
    model: string;
    specs?: {
      tac: string;
      serialNumber: string;
      checkDigit: string;
      marketName?: string;
      modelNumber?: string;
      manufacturer?: string;
    };
  };
};

export type DeviceValidationResponse = {
  is_valid: boolean;
  brand: string;
  model: string;
  device_info: {
    tac: string;
    serialNumber: string;
    checkDigit: string;
    marketName: string;
    modelNumber: string;
    manufacturer: string;
  };
};

export type DeviceInfo = {
  brand: string;
  model: string;
  modelNumber: string;
};
