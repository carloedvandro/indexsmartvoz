
// Função para converter data DD/MM/YYYY para YYYY-MM-DD
export const convertDateFormat = (dateString: string): string => {
  if (!dateString) return "";
  
  // Se já está no formato YYYY-MM-DD, retorna como está
  if (dateString.includes("-") && dateString.length === 10) {
    return dateString;
  }
  
  // Se está no formato DD/MM/YYYY, converte
  if (dateString.includes("/")) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
  }
  
  return "";
};
