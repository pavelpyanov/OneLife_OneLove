import { ButtonHTMLAttributes, HTMLProps, PropsWithChildren } from "react";

const Button: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-[225px] mx-auto py-2 bg-mainPurple border-2 border-black rounded-lg flex items-center justify-center"
    >
      {children}
    </button>
  );
};

export default Button;
