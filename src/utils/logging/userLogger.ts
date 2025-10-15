
type LogLevel = "info" | "error" | "debug" | "warn";

export const log = (level: LogLevel, message: string, data?: any) => {
  const sanitizedData = data ? JSON.parse(JSON.stringify(data, (key, value) => {
    if (key === 'password') return '[PROTECTED]';
    return value;
  })) : '';
  
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}][UserFormUtils] ${message}`, sanitizedData);
};

export const logDocumentData = (documentType: string, documentData: any) => {
  log("info", `Retrieved ${documentType} data:`, documentData);
};

export const logFormAction = (action: string, formData: any) => {
  log("info", `Form action: ${action}`, formData);
};

export const logAPIRequest = (endpoint: string, method: string) => {
  log("debug", `API ${method} request to ${endpoint}`);
};

export const logAPIResponse = (endpoint: string, status: number, data?: any) => {
  log("debug", `API response from ${endpoint} (${status})`, data);
};

export const logError = (message: string, error: any) => {
  log("error", message, { error: error?.message || String(error) });
};
