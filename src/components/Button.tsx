import * as React from 'react';
import { theme } from '../theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'gray' | 'white' | 'red' | 'transparent';
  size?: 'lg' | 'sm';
  children?: React.ReactNode;
}

const Button = ({ className, color = 'green', size = 'lg', ...props }: ButtonProps) => {
  const bgColor = 'primary-' + color;

  return (
    <button
      className={`${className === undefined ? '' : className} ${props.disabled ? 'opacity-40' : ''} ${color === 'transparent' ? 'text-primary-white' :'text-primary-black'} self-center whitespace-nowrap rounded-[200px] ${size === 'lg' ? 'p-5 text-3xl w-full' : 'w-[125px] px-5 py-3 text-xs'} text-center font-extrabold tracking-tight max-md:ml-px`}
      {...props}
      style={{
        /* @ts-expect-error-next-line */
        backgroundColor: theme[bgColor]
      }}
    />
  );
}

export default Button