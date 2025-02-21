import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BaseButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className={`px-6 py-2 rounded-full font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return <BaseButton {...props} className="bg-white text-black hover:bg-gray-100" >{children}</BaseButton>;
};

export const SecondaryButton = ({ children, ...props }: ButtonProps) => {
  return <BaseButton {...props} className="border border-white text-white hover:bg-white/10" >{children}</BaseButton>;
};
