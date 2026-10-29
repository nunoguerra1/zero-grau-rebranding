import Image from "next/image";
import { BRAND } from "@/config/media";
import { cn } from "@/lib/utils";

type Props = {
  tone?: "white" | "blue";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function Logo({
  tone = "white",
  className,
  priority = false,
  sizes = "240px",
}: Props) {
  const logo = tone === "white" ? BRAND.zeroGrauWhite : BRAND.zeroGrauBlue;

  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt="Zero Grau"
      priority={priority}
      sizes={sizes}
      className={cn("h-auto", className)}
    />
  );
}
