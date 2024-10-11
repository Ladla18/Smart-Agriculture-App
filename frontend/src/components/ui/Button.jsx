// src/components/ui/Button.jsx
import React from "react";
import classNames from "classnames";

export const Button = ({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={classNames(
        "font-medium rounded focus:outline-none focus:ring-2 focus:ring-green-500",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
