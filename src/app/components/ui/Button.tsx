import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  href?: string;
}

export default function Button({
  children = "View collection",
  className = "",
  href = "/products",
  ...props
}: ButtonProps) {
  return (
    <Link href={href}>
      <button
        {...props}
        type={props.type || "button"}
        className={`cursor-pointer mt-6 bg-[#F9F9F9] hover:bg-[#EDEDED] transition px-6 py-3 text-[#2A254B] font-medium ${className}`}
      >
        {children}
      </button>
    </Link>
  );
}
