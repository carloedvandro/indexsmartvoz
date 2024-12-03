type LogLevel = "info" | "error";

export const log = (level: LogLevel, message: string, data?: any) => {
  const sanitizedData = data ? JSON.parse(JSON.stringify(data, (key, value) => {
    if (key === 'password') return '[PROTECTED]';
    return value;
  })) : '';
  
  console[level](`[UserFormUtils] ${message}`, sanitizedData);
};