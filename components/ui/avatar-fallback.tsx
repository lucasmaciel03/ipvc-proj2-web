"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface AvatarFallbackProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
}

export function AvatarFallback({
  src,
  alt,
  width = 40,
  height = 40,
  className = "",
  fallbackText,
  fallbackIcon = <User className="h-1/2 w-1/2 text-muted-foreground" />
}: AvatarFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const baseClasses = `rounded-full flex items-center justify-center bg-gradient-to-br from-[#00C9A7]/20 to-[#A065E1]/20 border-2 border-[#00C9A7]/30 ${className}`;

  if (!src || imageError) {
    return (
      <div 
        className={baseClasses}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {fallbackText ? (
          <span className="text-sm font-medium text-[#00C9A7] uppercase">
            {fallbackText.split(' ').map(name => name[0]).join('').slice(0, 2)}
          </span>
        ) : (
          fallbackIcon
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      {isLoading && (
        <div 
          className={`${baseClasses} absolute inset-0 animate-pulse`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="w-1/2 h-1/2 bg-muted rounded-full"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
