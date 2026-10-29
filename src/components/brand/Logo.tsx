import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <span className={cn("font-display leading-none tracking-wide uppercase", className)}>
            Zero<span className="text-sun-400">°</span> Grau
        </span>
    );
}