import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'gray' | 'red' | 'transparent';
  size?: 'lg' | 'sm';
  children?: React.ReactNode;
}

const Button = ({ className, color = 'green', size = 'lg', ...props }: ButtonProps) => {
  const bgColor = 'bg-primary-' + color;

  return (
    <button
      className={`${className ?? ''} ${props.disabled && 'opacity-40'} w-full self-center whitespace-nowrap rounded-[200px] ${bgColor} ${size === 'lg' ? 'p-5 text-3xl' : 'w-[125px] px-5 py-3 text-xs'}  text-center
       font-extrabold tracking-tight ${color === 'transparent' ? 'text-primary-white' :'text-primary-black'} max-md:ml-px`}
      {...props}
    />
  );
}

export default Button