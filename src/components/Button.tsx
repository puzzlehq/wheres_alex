import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary disabled:opacity-40 font-header text-black',
        secondary: 'bg-bg1 border-bg2 border-[5px] disabled:opacity-40',
        green: 'bg-primary-green disabled:opacity-40',
        red: 'bg-primary-red disabled:opacity-40',
        gray: 'bg-bg2 disabled:opacity-40',
        transparent: 'bg-transparent disabled:opacity-40',
      },
      size: {
        md: 'h-10 rounded-full px-3 py-2 text-[24px]',
        lg: 'h-22 rounded-full px-8 py-3 text-[36px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={`${className === undefined ? '' : className} ${buttonVariants({
        variant,
        size,
      })}`}
      {...props}
    />
  );
};

export default Button;
