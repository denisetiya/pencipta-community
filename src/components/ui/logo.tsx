import React from "react";
import Image from "next/image";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

export function Logo({ size = "md", className = "", priority = true }: LogoProps) {
  const sizeMap = {
    sm: { width: 34, height: 42, className: "w-[34px] h-[42px]" },
    md: { width: 48, height: 59, className: "w-[48px] h-[59px]" },
    lg: { width: 62, height: 76, className: "w-[62px] h-[76px]" },
    xl: { width: 80, height: 98, className: "w-[80px] h-[98px]" },
  };

  const { width, height, className: sizeClass } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="relative transition-transform duration-300 hover:scale-105">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={width}
          height={height}
          priority={priority}
          className={`${sizeClass} object-contain`}
        />
      </div>
    </div>
  );
}
