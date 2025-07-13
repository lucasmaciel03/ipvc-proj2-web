import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "gradient";
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "gradient",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: {
      icon: "w-6 h-6",
      text: "text-lg",
      imageSrc: "/assets/logos/web/favicon-32x32.png",
    },
    md: {
      icon: "w-8 h-8",
      text: "text-xl",
      imageSrc: "/assets/logos/web/favicon-32x32.png",
    },
    lg: {
      icon: "w-12 h-12",
      text: "text-2xl",
      imageSrc: "/assets/logos/web/icon-192.png",
    },
    xl: {
      icon: "w-16 h-16",
      text: "text-3xl",
      imageSrc: "/assets/logos/web/icon-192.png",
    },
  };

  const textClasses = {
    light: "text-white",
    dark: "text-gray-900",
    gradient: "gooddoctor-gradient-text",
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size].icon} flex-shrink-0 relative`}>
        <Image
          src={sizeClasses[size].imageSrc}
          alt="GoodDoctor Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 32px, 64px"
          priority
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold ${sizeClasses[size].text} ${textClasses[variant]} leading-tight`}
          >
            GoodDoctor
          </span>
          {size === "lg" || size === "xl" ? (
            <span
              className={`text-xs ${
                variant === "light" ? "text-gray-200" : "text-gray-500"
              } font-medium`}
            >
              Sistema Médico
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};
