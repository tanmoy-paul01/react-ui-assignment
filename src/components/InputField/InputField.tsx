import React, { useState } from "react";
import classNames from "classnames";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg"
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:border-blue-500",
  outlined: "bg-transparent border border-gray-400 focus:border-blue-500",
  ghost: "bg-transparent border-none border-b border-gray-300 focus:border-blue-500"
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text"
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(
            "rounded-md w-full focus:outline-none transition",
            sizeClasses[size],
            variantClasses[variant],
            {
              "border-red-500": invalid,
              "bg-gray-200 cursor-not-allowed": disabled
            }
          )}
        />

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Helper or error text */}
      {invalid && errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
