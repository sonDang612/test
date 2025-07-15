import React from "react";
import { ClipLoader } from "react-spinners";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center text-base text-black border border-black border-solid hover:opacity-75 cursor-pointer transition disabled:opacity-50 ${className}`}
    >
      {loading ? <ClipLoader size={20} /> : children}
    </button>
  );
};

export default Button;
