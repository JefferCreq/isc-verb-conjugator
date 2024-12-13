import { Link } from "@remix-run/react";

const buttonStyle =
  "flex bg-[#402A2B] w-fit h-fit min-h-12 min-w-40 rounded-md items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed";

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  to: string;
};

export function LinkButton({
  children,
  variant = "primary",
  to,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`${props.className} ${
        variant == "primary" ? "text-[#ECECEC]" : "bg-opacity-15 text-[#402A2B]"
      }
      ${buttonStyle}`}
      {...props}
    >
      {children}
    </Link>
  );
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ children, variant = "primary", ...props }: Props) {
  return (
    <button
      className={`${props.className} ${
        variant == "primary" ? "text-[#ECECEC]" : "bg-opacity-15 text-[#402A2B]"
      }
      ${buttonStyle}`}
      {...props}
    >
      {children}
    </button>
  );
}
