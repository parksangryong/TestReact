import React, { forwardRef } from "react";

interface FullInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const FullInput = forwardRef<HTMLInputElement, FullInputProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <input
        style={{
          border: "solid 2px var(--color-primary)",
          borderRadius: "10px",
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
          color: "var(--color-primary)",
        }}
        ref={ref}
        {...props}
        placeholder={placeholder}
      />
    );
  }
);

export default FullInput;
