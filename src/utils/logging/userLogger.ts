
type LogLevel = "info" | "error" | "warning";

export const log = (level: LogLevel, message: string, data?: any) => {
  const sanitizedData = data ? JSON.parse(JSON.stringify(data, (key, value) => {
    if (key === 'password') return '[PROTECTED]';
    return value;
  })) : '';
  
  const logFunction = level === 'warning' ? 'warn' : level;
  console[logFunction](`[UserFormUtils] ${message}`, sanitizedData);
};
