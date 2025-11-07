import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: string };

export function Button({ children, className = '', variant, ...rest }: Props) {
  // Accept a `variant` prop used across the app (e.g. variant="outline") but keep
  // the component minimal: it forwards className and other button attributes.
  return (
    <button {...rest} data-variant={variant} className={className}>
      {children}
    </button>
  );
}

export default Button;
