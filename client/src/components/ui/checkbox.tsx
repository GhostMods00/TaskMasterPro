import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, indeterminate, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return (
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={(e) => {
              (inputRef.current as HTMLInputElement | null) = e;
              if (typeof ref === 'function') ref(e);
              else if (ref) ref.current = e;
            }}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-4 w-4 rounded border border-primary ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              props.checked || indeterminate
                ? "bg-primary text-primary-foreground"
                : "bg-white dark:bg-gray-800",
              error && "border-red-500",
              props.disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            {props.checked && (
              <Check className="h-3 w-3 text-white" />
            )}
            {indeterminate && !props.checked && (
              <Minus className="h-3 w-3 text-white" />
            )}
          </div>
        </div>
        {label && (
          <div className="ml-2">
            <label
              htmlFor={props.id}
              className={cn(
                "text-sm font-medium text-gray-700 dark:text-gray-300",
                props.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
            {helperText && (
              <p className={cn(
                "text-xs",
                error ? "text-red-500" : "text-gray-500"
              )}>
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };