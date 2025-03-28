import { ButtonHTMLAttributes } from "react";

type SmallButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "tertiary" | "dark";
};

const SmallButton = ({
  children,
  theme = "primary",
  ...props
}: SmallButtonProps) => {
  return (
    <button style={{ ...styles.button, ...styles[theme] }} {...props}>
      {children}
    </button>
  );
};

const styles = {
  button: {
    width: "60px",
    height: "30px",
    borderRadius: "5px",
    backgroundColor: "#dd0000",
    color: "#fff",
    fontSize: "10px",
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

export default SmallButton;
