import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
  children: React.ReactNode;
  className?: string;
  color?: 'primary' |'success'| 'secondary' | 'accent' | 'muted' | 'default' | 'success' | 'error'|'warning';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className = '',
  color = 'default',
}) => {
  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500 dark:text-secondary-300',
    accent: 'text-accent-500',
    muted: 'text-gray-600 dark:text-gray-400',
    default: 'text-gray-900 dark:text-gray-100',
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
  };

  const variantClasses = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    h3: 'text-2xl md:text-3xl font-semibold leading-tight',
    h4: 'text-xl md:text-2xl font-semibold leading-tight',
    h5: 'text-lg md:text-xl font-medium leading-tight',
    h6: 'text-base md:text-lg font-medium leading-tight',
    body: 'text-base leading-relaxed',
    caption: 'text-sm leading-relaxed',
    overline: 'text-xs uppercase tracking-wider font-medium',
  };

  const Component = variant.startsWith('h') ? (variant as keyof JSX.IntrinsicElements) : 'p';

  return (
    <Component className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}>
      {children}
    </Component>
  );
};