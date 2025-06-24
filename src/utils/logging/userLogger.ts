
type LogLevel = 'info' | 'error' | 'warn' | 'debug';

export const log = (level: LogLevel, message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logData = data ? { ...data } : {};
  
  console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, logData);
};
