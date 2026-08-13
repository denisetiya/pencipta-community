import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={cn(
        "flex items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700",
        sizes[size],
        className
      )}
    >
      {initials(name)}
    </div>
  );
}
