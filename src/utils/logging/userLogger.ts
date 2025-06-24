
type LogLevel = 'info' | 'error' | 'warn' | 'debug';

export const log = (level: LogLevel, message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logData = data ? { ...data } : {};
  
  console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, logData);
};

export const logError = (message: string, error?: any) => {
  log('error', message, error);
};

export const logDocumentData = (message: string, data?: any) => {
  log('info', message, data);
};
