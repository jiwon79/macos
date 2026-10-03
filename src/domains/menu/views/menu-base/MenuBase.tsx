import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "third-parties/classnames";
import { container } from "./MenuBase.css";

export type MenuType = "icon" | "text" | "text-bold";
export interface MenuBaseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type: MenuType;
  selected: boolean;
}

export const MenuBase = forwardRef<HTMLButtonElement, MenuBaseProps>(
  ({ children, type, className, selected, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(container({ selected, type }), className)}
      {...rest}
    >
      {children}
    </button>
  )
);
