"use client";

import { JSX, ReactElement, ReactNode } from "react";

export interface ButtonProps {
  className?: string;
  label: ReactNode | ReactElement | JSX.Element;
}

export const Button = ({ className, label }: ButtonProps) => {
  return <button className={className}>{label}</button>;
};
