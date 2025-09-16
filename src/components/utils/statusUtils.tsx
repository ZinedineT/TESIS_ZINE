import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid':
      return <CheckCircle className="h-4 w-4 text-success-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-warning-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-error-500" />;
    default:
      return <Clock className="h-4 w-4 text-secondary-500" />;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300';
    case 'pending':
      return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300';
    case 'failed':
      return 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300';
    default:
      return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300';
  }
};