import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Calculator className={cn("text-gray-950-600", className)} {...props} />
  );
} 