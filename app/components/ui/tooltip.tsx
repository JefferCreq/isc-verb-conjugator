import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const TooltipContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement>;
} | null>(null);

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const Tooltip: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean;
}> = ({ children, asChild = false }) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within a Tooltip");

  const { setOpen, triggerRef } = context;

  const child = asChild ? (
    React.Children.only(children)
  ) : (
    <button type="button">{children}</button>
  );

  return React.cloneElement(child as React.ReactElement, {
    ref: triggerRef,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  });
};

export const TooltipContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}> = ({ children, className = "", sideOffset = 10 }) => { // Changed sideOffset to 10
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within a Tooltip");

  const { open, triggerRef } = context;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      contentRef.current.style.left = `${
        triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
      }px`;
      contentRef.current.style.top = `${
        window.scrollY + triggerRect.bottom + sideOffset
      }px`; // Adjusted top position calculation
    }
  }, [open, sideOffset, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={`absolute z-50 px-3 py-2 text-sm bg-white border border-gray-200 rounded shadow-lg transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};
