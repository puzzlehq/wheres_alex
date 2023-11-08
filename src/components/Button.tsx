import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  asChild?: boolean;
  fullWidth?: boolean;
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'transparent'
}

const Button = ({...props}: ButtonProps) => {
  
}

export default Button