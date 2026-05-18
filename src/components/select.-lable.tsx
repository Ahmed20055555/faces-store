"use client";

import React, { SelectHTMLAttributes } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectLableProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
    options: SelectOption[];
    containerClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
    required?: boolean;
    placeholder?: string;
}

export const SelectLable = React.forwardRef<HTMLSelectElement, SelectLableProps>(
    (
        {
            label,
            error,
            icon: Icon,
            options,
            containerClassName,
            labelClassName,
            selectClassName,
            required,
            placeholder,
            id,
            className,
            children,
            ...props
        },
        ref
    ) => {
        // Generate automatic premium id if not provided for proper label association
        const selectId = id || `select-${label ? label.replace(/\s+/g, '-').toLowerCase() : Math.random().toString(36).substring(2, 9)}`;

        return (
            <div className={cn("w-full flex flex-col gap-1.5 text-right", containerClassName)} dir="rtl">
                {label && (
                    <label 
                        htmlFor={selectId}
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
                    {Icon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors">
                            <Icon size={15} />
                        </div>
                    )}
                    
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            "w-full bg-white border rounded-xl py-3 px-4 text-xs font-bold outline-none transition-all text-right appearance-none cursor-pointer",
                            "border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5",
                            Icon ? "pr-11 pl-10" : "pr-4 pl-10",
                            error 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/5 text-red-900 bg-red-50/10" 
                                : "text-gray-900",
                            selectClassName,
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled className="text-gray-300 font-medium">
                                {placeholder}
                            </option>
                        )}
                        {options.map((opt, idx) => (
                            <option key={idx} value={opt.value} className="text-gray-900 font-bold">
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    {/* Premium Sleek Chevron Arrow (Left side in RTL) */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors">
                        <ChevronDown size={16} />
                    </div>
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

SelectLable.displayName = 'SelectLable';
