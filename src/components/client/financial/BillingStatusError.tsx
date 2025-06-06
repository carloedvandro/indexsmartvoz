
interface BillingStatusErrorProps {
  error: string;
  onRetry: () => void;
}

export function BillingStatusError({ error, onRetry }: BillingStatusErrorProps) {
  return (
    <div className="container">
      <div className="flex items-center justify-center py-8">
        <div className="text-red-600">
          {error}
          <button
            onClick={onRetry}
            className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
