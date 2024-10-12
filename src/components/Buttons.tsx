// components/Buttons.tsx
"use client";
import { cn } from "@/lib/helper";
import React, { ReactNode } from "react";

export const AnimatedButton = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: any;
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden transition-colors duration-300 ease-in-out",
        className
      )}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export const CustomButton = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: any;
}) => {
  const baseStyle =
    "px-4 py-2 font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 focus:outline-none";

  return (
    <button
      className={cn(
        baseStyle,
        "text-black dark:text-white bg-gray-200 dark:bg-gray-800 border border-transparent",
        className
      )}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export const SolidButton = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: any;
}) => {
  return (
    <button
      className={cn(
        "w-40 h-10 rounded-xl bg-black text-white border border-transparent text-sm transition-colors duration-300 ease-in-out",
        className,
        "hover:bg-gray-800 dark:hover:bg-gray-700"
      )}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: any;
}) => {
  return (
    <button
      className={cn(
        "w-40 h-10 rounded-xl border text-sm transition-colors duration-300 ease-in-out",
        "bg-white text-black border-black dark:bg-gray-800 dark:text-white dark:border-white",
        className
      )}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
