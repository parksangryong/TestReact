import { ButtonHTMLAttributes } from "react";

type MediumButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "tertiary" | "dark";
};

const MediumButton = ({
  children,
  theme = "primary",
  ...props
}: MediumButtonProps) => {
  return (
    <button style={{ ...styles.button, ...styles[theme] }} {...props}>
      {children}
    </button>
  );
};

const styles = {
  button: {
    width: "100%",
    height: "40px",
    borderRadius: "5px",
    backgroundColor: "#dd0000",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Bungee Inline",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#dd0000",
  },
  secondary: {
    backgroundColor: "#aa0000",
  },
  tertiary: {
    backgroundColor: "#770000",
  },
  dark: {
    backgroundColor: "#000000",
  },
};

export default MediumButton;
