"use client";

import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface LableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
    iconPosition?: 'start' | 'end';
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    required?: boolean;
}

export const LableInput = React.forwardRef<HTMLInputElement, LableInputProps>(
    (
        {
            label,
            error,
            icon: Icon,
            iconPosition = 'start',
            containerClassName,
            labelClassName,
            inputClassName,
            required,
            type = 'text',
            id,
            className,
            ...props
        },
        ref
    ) => {
        // Generate automatic premium id if not provided for proper label association
        const inputId = id || `input-${label ? label.replace(/\s+/g, '-').toLowerCase() : Math.random().toString(36).substring(2, 9)}`;

        return (
            <div className={cn("w-full flex flex-col gap-1.5 text-right", containerClassName)} dir="rtl">
                {label && (
                    <label 
                        htmlFor={inputId}
                        className={cn(
                            "text-[10px] font-black text-gray-400 uppercase tracking-wider select-none flex items-center gap-1 pr-1",
                            labelClassName
                        )}
                    >
                        {label}
                        {required && <span className="text-red-500 font-bold">*</span>}
                    </label>
                )}
                
                <div className="relative w-full">
                    {/* Start Icon (Right side in RTL) */}
                    {Icon && iconPosition === 'start' && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors">
                            <Icon size={15} />
                        </div>
                    )}
                    
                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        className={cn(
                            "w-full bg-white border rounded-xl py-3 px-4 text-xs font-bold outline-none transition-all text-right",
                            "placeholder:text-gray-300 placeholder:font-medium",
                            "border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5",
                            Icon && iconPosition === 'start' ? "pr-11 pl-4" : "",
                            Icon && iconPosition === 'end' ? "pl-11 pr-4" : "",
                            error 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/5 text-red-900 bg-red-50/10" 
                                : "text-gray-900",
                            inputClassName,
                            className
                        )}
                        {...props}
                    />

                    {/* End Icon (Left side in RTL) */}
                    {Icon && iconPosition === 'end' && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors">
                            <Icon size={15} />
                        </div>
                    )}
                </div>

                {/* Animated Error message using framer-motion */}
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] font-black text-red-500 mt-0.5 flex items-center gap-1 pr-1"
                    >
                        <span className="w-1 h-1 rounded-full bg-red-500 shrink-0 animate-pulse" />
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

LableInput.displayName = 'LableInput';
