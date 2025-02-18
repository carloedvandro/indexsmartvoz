
export const validateImeiChecksum = (imei: string): boolean => {
  let sum = 0;
  const length = imei.length;
  const checkDigit = parseInt(imei.charAt(length - 1));
  
  for (let i = length - 2; i >= 0; i--) {
    let digit = parseInt(imei.charAt(i));
    if ((length - 1 - i) % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }
    sum += digit;
  }

  const expectedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === expectedCheckDigit;
};

export const parseImei = (imei: string) => {
  const tac = imei.substring(0, 8);
  const serialNumber = imei.substring(8, 14);
  const checkDigit = imei.substring(14);
  
  return { tac, serialNumber, checkDigit };
};
