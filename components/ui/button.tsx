import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-apple-blue hover:bg-apple-hover text-white shadow-sm",
    outline: "border border-apple-blue text-apple-blue hover:bg-apple-blue hover:text-white bg-transparent",
    ghost: "text-apple-blue hover:bg-gray-100 dark:hover:bg-white/10"
  };

  const content = (
    <span className="flex items-center gap-2">
      {children}
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
};

export default Button;