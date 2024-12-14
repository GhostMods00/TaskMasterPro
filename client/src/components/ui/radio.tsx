// src/components/ui/radio.tsx
import * as React from "react";
import { cn } from "../../lib/utils";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    options, 
    value, 
    onChange, 
    name, 
    error, 
    helperText, 
    label, 
    orientation = 'vertical',
    disabled,
    className,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className={cn(
          "flex gap-4",
          orientation === 'vertical' && "flex-col",
          orientation === 'horizontal' && "flex-row flex-wrap"
        )}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled || option.disabled}
                className="sr-only"
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  "flex items-center cursor-pointer",
                  (disabled || option.disabled) && "cursor-not-allowed opacity-50"
                )}
              >
                <span className={cn(
                  "h-4 w-4 rounded-full border border-primary ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mr-2",
                  value === option.value && "border-[5px]",
                  error && "border-red-500",
                )} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            </div>
          ))}
        </div>
        {helperText && (
          <p className={cn(
            "mt-1 text-xs",
            error ? "text-red-500" : "text-gray-500"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };