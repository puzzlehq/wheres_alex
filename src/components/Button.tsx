import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'gray' | 'red' | 'transparent';
  children?: React.ReactNode;
}

const Button = ({ className, color = 'green', ...props }: ButtonProps) => {
  const bgColor = 'bg-primary-' + color;

  return (
    <button
      className={`${className ?? ''} ${props.disabled && 'opacity-40'} w-full self-center whitespace-nowrap rounded-[200px] ${bgColor} p-5 text-center
      text-3xl font-extrabold tracking-tight text-primary-black max-md:ml-px`}
      {...props}
    />
  );
}

export default Button