import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4">
      <AlertCircle className="text-red-600" size={48} />
      <p className="text-red-800 text-center font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
