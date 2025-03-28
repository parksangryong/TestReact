import React, { forwardRef } from "react";

interface FullInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const FullInput = forwardRef<HTMLInputElement, FullInputProps>(
  ({ placeholder, disabled, ...props }, ref) => {
    return (
      <input
        style={{
          border: "solid 2px var(--color-primary)",
          borderRadius: "10px",
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
          color: disabled ? "var(--color-gray)" : "var(--color-primary)",
          backgroundColor: disabled ? "lightGray" : "white",
          pointerEvents: disabled ? "none" : "auto",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.7 : 1,
        }}
        className="full-input"
        ref={ref}
        {...props}
        placeholder={placeholder}
      />
    );
  }
);

export default FullInput;
